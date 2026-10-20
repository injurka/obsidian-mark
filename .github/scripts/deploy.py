"""Incremental export deployment. The manifest owns only files uploaded by this script."""
import hashlib
import json
import mimetypes
import os
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path, PurePosixPath


def managed(key):
    return key == 'config/server.json' or (isinstance(key, str) and not key.startswith('/')
            and key.split('/')[0] in {'content', 'meta', 'plugins'}
            and len(key.split('/')) > 1
            and all(part not in {'', '.', '..'} for part in key.split('/')))


def prepare_server_config(config, output, url):
    vaults = [PurePosixPath(vault['exportPath'].strip('/')).name
              for vault in config['vaults']]
    if not vaults or len(set(vaults)) != len(vaults):
        raise ValueError('Expected non-empty, unique export vault names')
    for folder in vaults:
        for name in ('search.json', 'backlinks.json', 'graph.json'):
            if not (output / 'meta' / folder / name).is_file():
                raise ValueError(f'Incomplete generation: {folder}/{name}')
    target = output / 'config/server.json'
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps({'url': url, 'vaults': vaults},
                                ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def deploy(s3, bucket, prefix, output):
    prefix = prefix.strip('/')
    if not prefix or '..' in prefix.split('/'):
        raise ValueError('A non-empty, valid S3_BASE_PATH is required')
    manifest_key = f'{prefix}/.deploy-manifest.json'
    files = {}
    for file in sorted(output.rglob('*')):
        if file.is_symlink():
            raise ValueError(f'Symlinks are not supported: {file}')
        if file.is_file():
            key = file.relative_to(output).as_posix()
            if not managed(key):
                raise ValueError(f'Unexpected output file: {key}')
            if any(part != part.strip() for part in key.split('/')):
                raise ValueError(
                    f'Bunny Storage rejects path segments with leading/trailing whitespace: {key!r}. '
                    'Rename the source or set a unique Markdown sysname before exporting.')
            files[key] = hashlib.sha256(file.read_bytes()).hexdigest()
    if not files:
        raise ValueError('Refusing to deploy empty output')
    try:
        previous = json.loads(s3.get_object(Bucket=bucket, Key=manifest_key)['Body'].read())
    except Exception as error:
        if getattr(error, 'response', {}).get('Error', {}).get('Code') not in {'NoSuchKey', '404'}:
            raise
        previous = {'version': 1, 'files': {}}
    if (previous.get('version') != 1 or not isinstance(previous.get('files'), dict)
            or any(not managed(key) for key in previous['files'])):
        raise ValueError('Invalid deployment manifest')
    old = previous['files']
    changed = [key for key, digest in files.items() if old.get(key) != digest]
    removed = sorted(old.keys() - files.keys())
    print(f'Upload: {len(changed)}, delete: {len(removed)}, unchanged: {len(files) - len(changed)}', flush=True)
    if not changed and not removed:
        return

    def save_manifest(entries):
        s3.put_object(Bucket=bucket, Key=manifest_key,
                      Body=json.dumps({'version': 1, 'files': entries}, ensure_ascii=False).encode(),
                      ContentType='application/json')

    # Invalidate changed hashes BEFORE mutations. A failed/aborted run is retried
    # safely, even if the next build reverts files to their previous contents.
    pending = dict(old)
    pending.update({key: None for key in changed})
    save_manifest(pending)

    def upload(key):
        content_type = mimetypes.guess_type(key)[0] or 'application/octet-stream'
        if key.endswith('.md'):
            content_type = 'text/markdown'
        s3.put_object(Bucket=bucket, Key=f'{prefix}/{key}',
                      Body=(output / key).read_bytes(), ContentType=content_type)

    with ThreadPoolExecutor(max_workers=16) as pool:
        list(pool.map(upload, [key for key in changed if key != 'config/server.json']))
    # Advertise vaults only after their content and metadata are uploaded.
    if 'config/server.json' in changed:
        upload('config/server.json')
    # Delete only previously managed export keys, after all uploads succeed.
    for key in removed:
        s3.delete_object(Bucket=bucket, Key=f'{prefix}/{key}')
    save_manifest(files)


def main():
    import boto3
    from botocore.config import Config

    output = Path('.output')
    config = json.loads(Path('.obsidian/export/config.json').read_text())
    # CLI catches per-vault failures; validate completion before publishing config.
    prepare_server_config(config, output, os.environ['SERVER_URL'])
    s3 = boto3.client('s3', endpoint_url=os.environ['S3_ENDPOINT'],
                      region_name=os.environ['S3_REGION'],
                      aws_access_key_id=os.environ['S3_ACCESS_KEY'],
                      aws_secret_access_key=os.environ['S3_SECRET_KEY'],
                      config=Config(signature_version='s3v4', s3={'addressing_style': 'path'},
                                    retries={'mode': 'standard', 'max_attempts': 5}))
    deploy(s3, os.environ['S3_BUCKET'], os.environ['S3_BASE_PATH'], output)


if __name__ == '__main__':
    main()
