"""Validate the published Batch 1 research and site data."""

from __future__ import annotations

import csv
import json
from collections import Counter, defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BATCHES = ROOT / "research" / "batches"


def read_csv(name: str) -> list[dict[str, str]]:
    with (BATCHES / name).open(encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))


def fail(errors: list[str], message: str) -> None:
    errors.append(message)


def main() -> int:
    errors: list[str] = []
    statuses = read_csv("batch-001-community-status.csv")
    shortlist = read_csv("batch-001-community-shortlist.csv")
    city_rows = read_csv("../cities.csv")
    public_payload = json.loads((ROOT / "public" / "city-profiles" / "batch-001.json").read_text(encoding="utf-8"))
    ui_status = json.loads((ROOT / "src" / "data" / "batch-001-research-status.json").read_text(encoding="utf-8"))

    if len(statuses) != 500:
        fail(errors, f"Expected 500 status rows, found {len(statuses)}")
    slugs = [row["city_slug"] for row in statuses]
    if len(slugs) != len(set(slugs)):
        fail(errors, "Status file contains duplicate city slugs")

    status_counts = Counter(row["local_evidence_status"] for row in statuses)
    expected_counts = {
        "evidence_queue_complete": 472,
        "reviewed_guide_exists": 1,
        "covered_by_parent_city": 11,
        "evidence_gap": 16,
    }
    if status_counts != expected_counts:
        fail(errors, f"Unexpected status counts: {dict(status_counts)}")

    shortlist_by_slug: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in shortlist:
        shortlist_by_slug[row["city_slug"]].append(row)
        if not row["url"].startswith("https://"):
            fail(errors, f"Non-HTTPS source URL for {row['city_slug']}: {row['url']}")

    all_city_slugs = {row["slug"] for row in city_rows}
    for row in statuses:
        slug = row["city_slug"]
        sources = shortlist_by_slug.get(slug, [])
        urls = [source["url"] for source in sources]
        if len(urls) != len(set(urls)):
            fail(errors, f"Duplicate source URL in {slug}")
        if int(row["shortlisted_source_count"]) != len(sources):
            fail(errors, f"Shortlist count mismatch for {slug}")
        status = row["local_evidence_status"]
        if status == "evidence_queue_complete" and len(sources) < 6:
            fail(errors, f"Completed queue has fewer than six sources: {slug}")
        if status == "evidence_gap":
            if int(row["search_pass_count"]) < 4:
                fail(errors, f"Evidence gap has fewer than four search passes: {slug}")
            if len(sources) >= 6:
                fail(errors, f"Evidence gap unexpectedly has six or more sources: {slug}")
        if status == "covered_by_parent_city":
            parent = row["parent_city_slug"]
            if not parent or parent not in all_city_slugs:
                fail(errors, f"Invalid parent city for {slug}: {parent}")

    profiles = public_payload.get("cities", {})
    if len(profiles) != 500:
        fail(errors, f"Expected 500 public profiles, found {len(profiles)}")
    for row in statuses:
        slug = row["city_slug"]
        profile = profiles.get(slug)
        if not profile:
            fail(errors, f"Missing public profile for {slug}")
            continue
        summary = profile.get("evidenceSummary")
        if not summary:
            fail(errors, f"Missing evidence summary for {slug}")
            continue
        if summary.get("status") != row["local_evidence_status"]:
            fail(errors, f"Public status mismatch for {slug}")
        if len(summary.get("sources", [])) != len(shortlist_by_slug.get(slug, [])):
            fail(errors, f"Public source count mismatch for {slug}")

    if len(ui_status.get("cities", {})) != 500:
        fail(errors, "UI status file does not contain 500 cities")

    dash_files = [
        ROOT / "README.md",
        ROOT / "src" / "pages" / "Explore.tsx",
        ROOT / "src" / "lib" / "explore.ts",
        ROOT / "src" / "explore.css",
        ROOT / "scripts" / "capture-search-results.py",
        ROOT / "scripts" / "process-community-search.py",
        ROOT / "scripts" / "publish-community-batch.py",
        ROOT / "scripts" / "validate-batch-one.py",
        ROOT / "public" / "city-profiles" / "batch-001.json",
        BATCHES / "batch-001-community-evidence.csv",
        BATCHES / "batch-001-community-shortlist.csv",
        BATCHES / "batch-001-community-status.csv",
        BATCHES / "batch-001-gaps.csv",
        BATCHES / "batch-001.csv",
    ]
    for path in dash_files:
        text = path.read_text(encoding="utf-8-sig")
        if "\u2013" in text or "\u2014" in text:
            fail(errors, f"Forbidden dash character found in {path.relative_to(ROOT)}")

    if errors:
        print("Batch 1 validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Batch 1 validation passed")
    print(json.dumps({"cities": len(statuses), "sources": len(shortlist), "statuses": dict(status_counts)}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
