#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 || $# -gt 3 ]]; then
  echo "Usage: $0 <trip-directory> <YYYY-MM-DD> [importer-directory]" >&2
  exit 64
fi

trip_directory=$1
start_date=$2
importer_directory=${3:-/home/injurka/my/trip-scheduler/tools/obsidian-importer}

if [[ ! -d "$trip_directory" ]]; then
  echo "Trip directory does not exist: $trip_directory" >&2
  exit 66
fi

trip_directory=$(realpath "$trip_directory")
importer_directory=$(realpath "$importer_directory")

if [[ ! "$start_date" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
  echo "Start date must use YYYY-MM-DD: $start_date" >&2
  exit 64
fi

if [[ ! -f "$importer_directory/src/run.ts" ]]; then
  echo "Importer entrypoint not found: $importer_directory/src/run.ts" >&2
  exit 66
fi

command -v bun >/dev/null 2>&1 || {
  echo "bun is required" >&2
  exit 69
}

cd "$importer_directory"
exec bun run src/run.ts --validate --yes --no-llm \
  -d "$trip_directory" --start-date "$start_date"
