"""Turn captured web-search results into an auditable evidence queue.

This script does not create recommendations. It records candidate community and
local sources, labels the review method, excludes generic reference pages from
the local-evidence count, and reports where another search is required.
"""

from __future__ import annotations

import argparse
import csv
import json
import re
from collections import defaultdict
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_RAW = ROOT / "research" / "batches" / "batch-001-community-search.ndjson"
DEFAULT_BATCH = ROOT / "research" / "batches" / "batch-001.csv"
DEFAULT_EVIDENCE = ROOT / "research" / "batches" / "batch-001-community-evidence.csv"
DEFAULT_SHORTLIST = ROOT / "research" / "batches" / "batch-001-community-shortlist.csv"
DEFAULT_STATUS = ROOT / "research" / "batches" / "batch-001-community-status.csv"
DEFAULT_CITIES = ROOT / "research" / "cities.csv"

RESULT_RE = re.compile(
    r"(?ms)^(.+?) \((https?://[^\n)]+)\)\n【[^\n]+】[^\n]*\n?(.*?)(?=\n-{20,}\n|\Z)"
)

REFERENCE_DOMAINS = {
    "wikipedia.org",
    "wikivoyage.org",
    "britannica.com",
    "mapcarta.com",
    "geonames.org",
}

LOW_SIGNAL_DOMAINS = {
    "pinterest.com",
    "facebook.com",
    "instagram.com",
    "x.com",
    "quora.com",
    "asklocals.com",
    "holidify.com",
    "tripoto.com",
    "thrillophilia.com",
}

REVIEW_DOMAINS = {
    "tripadvisor.com",
    "tripadvisor.in",
    "zomato.com",
    "restaurant-guru.in",
    "mouthshut.com",
    "justdial.com",
    "wanderlog.com",
}

LOCAL_PUBLICATION_DOMAINS = {
    "indianexpress.com",
    "thehindu.com",
    "deccanherald.com",
    "deccanchronicle.com",
    "telegraphindia.com",
    "timesofindia.indiatimes.com",
    "hindustantimes.com",
    "newindianexpress.com",
    "mid-day.com",
    "scroll.in",
    "thebetterindia.com",
}

PARENT_CITY_MERGES = {
    "gundupalaiyam": ("puducherry", "Puducherry", "Locality record covered by the Puducherry city guide."),
    "dinapur-nizamat": ("dinapore", "Danapur", "Duplicate urban record covered by the Danapur guide."),
    "raurkela-industrial-township": ("rourkela", "Rourkela", "Industrial township record covered by the Rourkela guide."),
    "hashtsal": ("delhi", "Delhi", "Delhi locality covered by the Delhi guide."),
    "dalupura": ("delhi", "Delhi", "Delhi locality covered by the Delhi guide."),
    "lal-bahadur-nagar": ("hyderabad", "Hyderabad", "Hyderabad locality covered by the Hyderabad guide."),
    "quthbullapur": ("hyderabad", "Hyderabad", "Hyderabad urban locality covered by the Hyderabad guide."),
    "malkajgiri": ("hyderabad", "Hyderabad", "Hyderabad metropolitan locality covered by the Hyderabad guide."),
    "tiruvottiyur": ("chennai", "Chennai", "Chennai locality covered by the Chennai guide."),
    "rasapudipalem": ("visakhapatnam", "Visakhapatnam", "GeoNames record uses Visakhapatnam as an alias; covered by the Visakhapatnam guide."),
    "kanayannur": ("kochi", "Kochi", "Kanayannur urban area is covered by the Kochi guide."),
}


def host_for(url: str) -> str:
    host = urlparse(url).netloc.lower().split(":")[0]
    return host.removeprefix("www.").removeprefix("m.").removeprefix("en.")


def domain_matches(host: str, domains: set[str]) -> bool:
    return any(host == domain or host.endswith("." + domain) for domain in domains)


def classify(url: str) -> tuple[str, str, bool, str]:
    host = host_for(url)
    if domain_matches(host, REFERENCE_DOMAINS):
        return "reference", "reference-only", False, "Reference pages do not count as local evidence."
    if host.endswith("reddit.com"):
        return "community", "local-evidence", True, "Indexed community discussion excerpt."
    if host == "mapswemade.com":
        return "community-aggregation", "local-evidence", True, "Reddit-derived aggregation; counts as one source."
    if domain_matches(host, REVIEW_DOMAINS):
        return "review-platform", "local-evidence", True, "Review-platform result; verify the exact venue before publishing."
    if domain_matches(host, LOCAL_PUBLICATION_DOMAINS):
        return "local-publication", "local-evidence", True, "Publication result; assess first-hand reporting and recency."
    if domain_matches(host, LOW_SIGNAL_DOMAINS):
        return "discovery", "discovery-only", False, "Useful for discovery only; not counted as local evidence."
    if host.endswith(".gov.in") or host.endswith("tourism.gov.in"):
        return "official", "verification-only", False, "Official context can verify existence or rules, not local preference."
    return "travel-editorial", "discovery-only", False, "Unclassified editorial result; inspect before promoting it to local evidence."


def normalise(value: str) -> str:
    value = value.casefold().replace("\u2013", "-").replace("\u2014", "-")
    return re.sub(r"[^a-z0-9]+", " ", value).strip()


def appears_city_relevant(city: str, state: str, aliases: list[str], title: str, url: str, body: str) -> bool:
    haystack = normalise(" ".join((title, url, body)))
    names = [city, *aliases]
    state_norm = normalise(state)
    for name in names:
        city_norm = normalise(name)
        city_tokens = [token for token in city_norm.split() if len(token) > 2]
        if city_norm and city_norm in haystack:
            return True
        if city_tokens and all(token in haystack for token in city_tokens):
            return True
        if state_norm and state_norm in haystack and city_tokens and city_tokens[0] in haystack:
            return True
    return False


def clean_excerpt(value: str, limit: int = 900) -> str:
    text = re.sub(r"【[^】]+】", "", value)
    text = re.sub(r"\s+", " ", text).strip()
    text = text.replace("\u2013", "-").replace("\u2014", "-")
    return text[:limit].rstrip()


def clean_title(value: str) -> str:
    text = re.sub(r"\s+", " ", value).strip()
    text = text.replace("\u2013", "-").replace("\u2014", "-")
    text = re.sub(r"^-{5,}\s*", "", text)
    return text.strip(" -")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--raw", type=Path, default=DEFAULT_RAW)
    parser.add_argument("--batch", type=Path, default=DEFAULT_BATCH)
    parser.add_argument("--evidence", type=Path, default=DEFAULT_EVIDENCE)
    parser.add_argument("--shortlist", type=Path, default=DEFAULT_SHORTLIST)
    parser.add_argument("--status", type=Path, default=DEFAULT_STATUS)
    parser.add_argument("--cities", type=Path, default=DEFAULT_CITIES)
    args = parser.parse_args()

    with args.batch.open(encoding="utf-8-sig", newline="") as handle:
        batch_rows = list(csv.DictReader(handle))
    city_by_slug = {row["city_slug"]: row for row in batch_rows}
    with args.cities.open(encoding="utf-8-sig", newline="") as handle:
        city_rows = list(csv.DictReader(handle))[:500]
    aliases_by_slug = {
        row["slug"]: [alias.strip() for alias in row.get("aliases", "").split(" | ") if alias.strip()]
        for row in city_rows
    }

    evidence: list[dict[str, str]] = []
    seen_urls: dict[str, set[str]] = defaultdict(set)
    search_passes: dict[str, int] = defaultdict(int)

    with args.raw.open(encoding="utf-8") as handle:
        for raw_line in handle:
            record = json.loads(raw_line)
            slug = record["city_slug"]
            search_passes[slug] += 1
            content = record.get("result", {}).get("content", [])
            text = "\n".join(block.get("text", "") for block in content if block.get("type") == "text")
            for title, url, body in RESULT_RE.findall(text):
                canonical_url = url.strip().rstrip("/)")
                if canonical_url in seen_urls[slug]:
                    continue
                seen_urls[slug].add(canonical_url)
                source_type, tier, usable, classifier_note = classify(canonical_url)
                relevant = appears_city_relevant(
                    record["city"], record["state"], aliases_by_slug.get(slug, []), title, canonical_url, body
                )
                if not relevant:
                    usable = False
                    tier = "excluded"
                    classifier_note = "Search result does not clearly identify the intended city and state."
                evidence.append(
                    {
                        "batch": "1",
                        "city_slug": slug,
                        "city": record["city"],
                        "state": record["state"],
                        "source_id": f"{slug}-search-{len(seen_urls[slug]):02d}",
                        "title": clean_title(title),
                        "url": canonical_url,
                        "domain": host_for(canonical_url),
                        "source_type": source_type,
                        "evidence_tier": tier,
                        "checked": record["checked"],
                        "review_method": "search-index excerpt",
                        "query": record["query"],
                        "excerpt": clean_excerpt(body),
                        "usable_local_evidence": "yes" if usable else "no",
                        "note": classifier_note,
                    }
                )

    fieldnames = [
        "batch", "city_slug", "city", "state", "source_id", "title", "url", "domain",
        "source_type", "evidence_tier", "checked", "review_method", "query", "excerpt",
        "usable_local_evidence", "note",
    ]
    args.evidence.parent.mkdir(parents=True, exist_ok=True)
    with args.evidence.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(evidence)

    by_city: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in evidence:
        by_city[row["city_slug"]].append(row)

    type_rank = {
        "community": 5,
        "community-aggregation": 4,
        "review-platform": 3,
        "local-publication": 2,
    }
    shortlist: list[dict[str, str]] = []
    for slug, rows in by_city.items():
        usable_rows = [item for item in rows if item["usable_local_evidence"] == "yes"]
        usable_rows.sort(
            key=lambda item: (
                type_rank.get(item["source_type"], 0),
                1 if "votes]" in item["excerpt"] or "recommend" in item["excerpt"].casefold() else 0,
                len(item["excerpt"]),
            ),
            reverse=True,
        )
        chosen: list[dict[str, str]] = []
        chosen_urls: set[str] = set()
        for item in usable_rows:
            if item["url"] in chosen_urls:
                continue
            chosen.append(item)
            chosen_urls.add(item["url"])
            if len(chosen) == 8:
                break
        for rank, item in enumerate(chosen, start=1):
            row = dict(item)
            row["shortlist_rank"] = str(rank)
            shortlist.append(row)

    shortlist_fields = [*fieldnames, "shortlist_rank"]
    with args.shortlist.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=shortlist_fields)
        writer.writeheader()
        writer.writerows(shortlist)

    statuses: list[dict[str, str]] = []
    for row in batch_rows:
        slug = row["city_slug"]
        rows = by_city.get(slug, [])
        usable_rows = [item for item in rows if item["usable_local_evidence"] == "yes"]
        community_rows = [item for item in usable_rows if item["source_type"] in {"community", "community-aggregation"}]
        distinct_domains = sorted({item["domain"] for item in usable_rows})
        source_count = len(usable_rows)
        parent = PARENT_CITY_MERGES.get(slug)
        if parent:
            status = "covered_by_parent_city"
            next_action = parent[2]
        elif slug == "jaipur":
            status = "reviewed_guide_exists"
            next_action = "Strengthen single-source places and recheck current venue status."
        elif source_count >= 6:
            status = "evidence_queue_complete"
            next_action = "Open and review at least six sources, extract repeated places, then verify current venue details."
        elif search_passes.get(slug, 0) >= 4:
            status = "evidence_gap"
            next_action = "Do not publish local picks. Revisit when stronger community or local reporting becomes available."
        else:
            status = "needs_targeted_search"
            next_action = "Run a second city-specific search across local forums, review platforms and local publications."
        statuses.append(
            {
                "batch": "1",
                "city_slug": slug,
                "city": row.get("city", ""),
                "state": row.get("state", ""),
                "raw_result_count": str(len(rows)),
                "usable_local_source_count": str(source_count),
                "community_source_count": str(len(community_rows)),
                "shortlisted_source_count": str(min(source_count, 8)),
                "search_pass_count": str(search_passes.get(slug, 0)),
                "distinct_local_domains": " | ".join(distinct_domains),
                "local_evidence_status": status,
                "full_guide_status": row.get("full_guide_status", "not_started"),
                "parent_city_slug": parent[0] if parent else "",
                "parent_city": parent[1] if parent else "",
                "checked": "2026-10-17",
                "next_action": next_action,
            }
        )

    status_fields = list(statuses[0].keys())
    with args.status.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=status_fields)
        writer.writeheader()
        writer.writerows(statuses)

    complete_statuses = {"evidence_queue_complete", "reviewed_guide_exists", "covered_by_parent_city", "evidence_gap"}
    ready = sum(row["local_evidence_status"] in complete_statuses for row in statuses)
    gaps = len(statuses) - ready
    print(f"Parsed {len(evidence)} unique results for {len(statuses)} cities.")
    print(f"First pass ready for review: {ready}; targeted search required: {gaps}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
