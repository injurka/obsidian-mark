import copy
import io
import json
import tempfile
import unittest
from pathlib import Path
from deploy import deploy, managed, prepare_server_config


class Missing(Exception):
    response = {'Error': {'Code': 'NoSuchKey'}}


class S3:
    def __init__(self):
        self.objects = {'export/db/user.json': b'keep'}
        self.uploads = []
        self.fail = False

    def get_object(self, Bucket, Key):
        if Key not in self.objects:
            raise Missing()
        return {'Body': io.BytesIO(self.objects[Key])}

    def put_object(self, Bucket, Key, Body, **kwargs):
        if self.fail and '/content/' in Key:
            raise RuntimeError('upload failed')
        self.objects[Key] = Body
        self.uploads.append(Key)

    def delete_object(self, Bucket, Key):
        self.objects.pop(Key, None)


class DeploymentTest(unittest.TestCase):
    def test_incremental_delete_and_failed_run_revert(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'content').mkdir()
            note = root / 'content/заметка.md'
            note.write_text('one')
            s3 = S3()
            run = lambda: deploy(s3, 'bucket', 'export', root)
            run()
            self.assertEqual(s3.objects['export/content/заметка.md'], b'one')
            s3.uploads.clear()
            run()
            self.assertEqual(s3.uploads, [])
            note.write_text('two')
            s3.fail = True
            with self.assertRaises(RuntimeError):
                run()
            # Simulate a partial upload followed by a reverted next build.
            s3.objects['export/content/заметка.md'] = b'two'
            note.write_text('one')
            s3.fail = False
            run()
            self.assertEqual(s3.objects['export/content/заметка.md'], b'one')
            note.rename(root / 'content/renamed.md')
            run()
            self.assertNotIn('export/content/заметка.md', s3.objects)
            self.assertEqual(s3.objects['export/db/user.json'], b'keep')

    def test_server_config_tracks_export_and_uploads_after_content(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            config = {'vaults': [{'exportPath': '/Chinese'}, {'exportPath': '/English'}]}
            for folder in ('Chinese', 'English'):
                meta = root / 'meta' / folder
                meta.mkdir(parents=True)
                for name in ('search.json', 'backlinks.json', 'graph.json'):
                    (meta / name).write_text('{}')
            prepare_server_config(config, root, 'https://example.test')
            s3 = S3()
            deploy(s3, 'bucket', 'export', root)
            result = json.loads(s3.objects['export/config/server.json'])
            self.assertEqual(result, {'url': 'https://example.test',
                                      'vaults': ['Chinese', 'English']})
            self.assertEqual(s3.uploads[-2], 'export/config/server.json')
            s3.uploads.clear()
            deploy(s3, 'bucket', 'export', root)
            self.assertEqual(s3.uploads, [])
            self.assertFalse(managed('config/private.json'))

    def test_incomplete_export_does_not_generate_server_config(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            with self.assertRaisesRegex(ValueError, 'Incomplete generation: English'):
                prepare_server_config({'vaults': [{'exportPath': '/English'}]},
                                      root, 'https://example.test')
            self.assertFalse((root / 'config/server.json').exists())

    def test_whitespace_path_rejected_before_remote_mutations(self):
        for key in ('content/ note.md', 'content/folder /note.md'):
            with self.subTest(key=key), tempfile.TemporaryDirectory() as directory:
                root = Path(directory)
                note = root / key
                note.parent.mkdir(parents=True)
                note.write_text('note')
                s3 = S3()
                before = copy.deepcopy(s3.objects)
                with self.assertRaisesRegex(ValueError, 'leading/trailing whitespace'):
                    deploy(s3, 'bucket', 'export', root)
                self.assertEqual(before, s3.objects)
                self.assertEqual(s3.uploads, [])

    def test_invalid_manifest_and_empty_output(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            s3 = S3()
            with self.assertRaises(ValueError):
                deploy(s3, 'bucket', 'export', root)
            (root / 'content').mkdir()
            (root / 'content/a.md').write_text('a')
            s3.objects['export/.deploy-manifest.json'] = json.dumps({
                'version': 1, 'files': {'db/user.json': 'hash'},
            }).encode()
            before = copy.deepcopy(s3.objects)
            with self.assertRaises(ValueError):
                deploy(s3, 'bucket', 'export', root)
            self.assertEqual(before, s3.objects)


if __name__ == '__main__':
    unittest.main()
