"""Publish a completed community-source discovery batch to the site data.

The output deliberately distinguishes source discovery from a reviewed guide.
No place recommendation is created by this script.
"""

from __future__ import annotations

import argparse
import csv
import json
from collections import defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CHECKED = "2026-10-17"


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))


def write_csv(path: Path, rows: list[dict[str, str]], fieldnames: list[str]) -> None:
    with path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("batch", nargs="?", type=int, default=1)
    args = parser.parse_args()
    if args.batch != 1:
        raise SystemExit("Only Batch 1 has a completed community-source discovery file.")

    number = f"{args.batch:03d}"
    status_path = ROOT / "research" / "batches" / f"batch-{number}-community-status.csv"
    shortlist_path = ROOT / "research" / "batches" / f"batch-{number}-community-shortlist.csv"
    batch_csv_path = ROOT / "research" / "batches" / f"batch-{number}.csv"
    profile_path = ROOT / "public" / "city-profiles" / f"batch-{number}.json"
    manifest_path = ROOT / "public" / "city-profiles" / "manifest.json"
    site_status_path = ROOT / "src" / "data" / f"batch-{number}-research-status.json"

    statuses = read_csv(status_path)
    shortlist = read_csv(shortlist_path)
    if len(statuses) != 500:
        raise SystemExit(f"Expected 500 status rows, found {len(statuses)}.")

    by_slug = {row["city_slug"]: row for row in statuses}
    sources_by_slug: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in shortlist:
        sources_by_slug[row["city_slug"]].append(row)

    payload = json.loads(profile_path.read_text(encoding="utf-8"))
    profiles = payload.get("cities", {})
    for slug, status in by_slug.items():
        profile = profiles.get(slug)
        if not profile:
            raise SystemExit(f"Profile missing for {slug}.")
        sources = sorted(sources_by_slug.get(slug, []), key=lambda item: int(item["shortlist_rank"]))
        profile["localEvidenceStatus"] = status["local_evidence_status"]
        profile["fullGuideStatus"] = "published" if status["local_evidence_status"] == "reviewed_guide_exists" else "not_started"
        profile["evidenceSummary"] = {
            "checked": CHECKED,
            "searchPasses": int(status["search_pass_count"]),
            "candidateSourceCount": int(status["usable_local_source_count"]),
            "shortlistedSourceCount": int(status["shortlisted_source_count"]),
            "communitySourceCount": int(status["community_source_count"]),
            "status": status["local_evidence_status"],
            "note": status["next_action"],
            "parentCitySlug": status.get("parent_city_slug") or None,
            "parentCity": status.get("parent_city") or None,
            "sources": [
                {
                    "title": item["title"],
                    "url": item["url"],
                    "type": item["source_type"],
                    "reviewMethod": item["review_method"],
                    "excerpt": item["excerpt"],
                    "note": item["note"],
                }
                for item in sources
            ],
        }

    payload["communityResearch"] = {
        "checked": CHECKED,
        "status": "source_discovery_complete",
        "cities": 500,
        "evidenceQueueComplete": sum(row["local_evidence_status"] == "evidence_queue_complete" for row in statuses),
        "reviewedGuides": sum(row["local_evidence_status"] == "reviewed_guide_exists" for row in statuses),
        "coveredByParentCity": sum(row["local_evidence_status"] == "covered_by_parent_city" for row in statuses),
        "evidenceGaps": sum(row["local_evidence_status"] == "evidence_gap" for row in statuses),
        "note": "Source discovery is complete. Recommendations remain unpublished until an editor reviews the sources and verifies current venue details.",
    }
    profile_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    batch_rows = read_csv(batch_csv_path)
    extra_fields = [
        "search_pass_count", "candidate_local_source_count", "shortlisted_source_count",
        "community_source_count", "parent_city_slug", "parent_city", "community_evidence_file",
        "evidence_note",
    ]
    fieldnames = list(batch_rows[0].keys())
    for field in extra_fields:
        if field not in fieldnames:
            fieldnames.append(field)
    for row in batch_rows:
        status = by_slug[row["city_slug"]]
        row["local_evidence_status"] = status["local_evidence_status"]
        row["full_guide_status"] = "published" if status["local_evidence_status"] == "reviewed_guide_exists" else "not_started"
        row["search_pass_count"] = status["search_pass_count"]
        row["candidate_local_source_count"] = status["usable_local_source_count"]
        row["shortlisted_source_count"] = status["shortlisted_source_count"]
        row["community_source_count"] = status["community_source_count"]
        row["parent_city_slug"] = status.get("parent_city_slug", "")
        row["parent_city"] = status.get("parent_city", "")
        row["community_evidence_file"] = f"batch-{number}-community-shortlist.csv"
        row["evidence_note"] = status["next_action"]
    write_csv(batch_csv_path, batch_rows, fieldnames)

    site_status = {
        "batch": args.batch,
        "checked": CHECKED,
        "status": "source_discovery_complete",
        "cities": {
            slug: {
                "status": row["local_evidence_status"],
                "sourceCount": int(row["shortlisted_source_count"]),
                "parentCitySlug": row.get("parent_city_slug") or None,
                "parentCity": row.get("parent_city") or None,
            }
            for slug, row in by_slug.items()
        },
    }
    site_status_path.write_text(json.dumps(site_status, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")

    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    for item in manifest.get("batches", []):
        if item.get("batch") == args.batch:
            item["communityResearch"] = payload["communityResearch"]
    manifest["note"] = "Batch 1 source discovery is complete. Reference profiles and source queues do not become recommendations until editorial review and current venue verification are complete."
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(json.dumps(payload["communityResearch"], indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
