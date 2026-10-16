"""Capture newline-delimited search records from stdin.

Each input line is a JSON object. The script validates the minimum fields and
writes one compact JSON object per line. It is intentionally small so search
collection can be resumed without rewriting earlier results.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("output", type=Path)
    parser.add_argument("--append", action="store_true")
    args = parser.parse_args()

    args.output.parent.mkdir(parents=True, exist_ok=True)
    mode = "a" if args.append else "w"
    count = 0

    with args.output.open(mode, encoding="utf-8", newline="\n") as handle:
        for raw_line in sys.stdin:
            line = raw_line.strip()
            if not line:
                continue
            if line == "__CLOSE__":
                break
            record = json.loads(line)
            for key in ("city_slug", "city", "state", "query", "checked", "result"):
                if key not in record:
                    raise ValueError(f"Missing required field: {key}")
            handle.write(json.dumps(record, ensure_ascii=False, separators=(",", ":")) + "\n")
            handle.flush()
            count += 1

    print(f"Captured {count} search records in {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
