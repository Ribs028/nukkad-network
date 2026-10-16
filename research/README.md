# Nukkad city research

## What is included

- 7,135 GeoNames populated places for search, including towns. This is not an official list of every Indian city, nor a current census count.
- Every directory row is research-ready: coordinates, source population, population band, alternative spellings, visual texture, guide status, research status, evidence target and next action are present.
- One Jaipur pilot with 33 places in seven categories, backed by 14 community discussions and three official sources.
- Some threads were accessible only as search-index excerpts. The source notes disclose this. Restaurant opening status, live prices and numeric Google ratings have not been verified.
- Source comparison is city-wide. A place may have only one mention; the UI shows the actual source count. These are editorial leads, not a statistically ranked top five.

## Editing and publishing

The Excel workbook is a convenient research view. The CSVs are the site's import inputs. The complete directory is ready for assignment, but only cities with a published guide have researched recommendations.

1. Run `npm run research:cities` after changing the GeoNames catalogue, publishing a guide or updating a destination snapshot. This rebuilds `research/cities.csv` and `research/city-highlights.csv`, and assigns one of six stable visual textures from each city slug.
2. Filter the City directory by state, population band, status or next action. Mark a city `in_progress` when an editor claims it.
3. Edit the Places and Sources sheets. Retain the exact column headers and stable ids.
4. Export those sheets as UTF-8 CSV into `research/places.csv` and `research/sources.csv`. Remove the workbook's title/context rows so the header is the first CSV row.
5. Keep `publish` as `no` for incomplete places. Use `yes` only for reviewed entries.
6. For a new city, use its exact slug from the directory. Create `research/city-notes/SLUG.json` containing title, intro, checked (YYYY-MM-DD), status (partial or reviewed), editorialNote, media and itinerary. The existing Jaipur guide illustrates the schema. Media may be empty until properly credited photographs are sourced.
7. Run `python scripts/import-research.py --dry-run`, then `python scripts/import-research.py` and `npm run build`.
8. Preview and review before deployment. The importer updates the searchable guide manifest. A city with no published guide gets an honest empty state.

Editing Excel alone does not update the site. No research is generated automatically at runtime.

## Batches of 500

The complete directory is divided into 15 stable batches: 14 batches of 500 records and a final batch of 135. The city order comes from the GeoNames source file and can contain population anomalies, so a batch is a production unit rather than an official ranking of Indian cities.

1. Run `npm run research:batch` to create a directory baseline for all 7,135 cities. This writes `public/city-profiles/batch-001.json` through `batch-015.json`, a manifest, and matching research CSV files.
2. Run `npm run research:batch -- 1 --online` to enrich one batch with coordinate-aware Wikipedia and Wikivoyage references. Change the number for the next batch.
3. An online match is accepted only when a nearby page title exactly matches the city name or one of its stored aliases. Failed or ambiguous matches keep the GeoNames baseline.
4. These reference profiles are orientation only. They never count toward the six-source local evidence requirement and never create place recommendations.
5. Local research should answer how residents actually use the city: where they eat on an ordinary morning, which neighbourhood markets they trust, where evenings happen, what is seasonal, what is overrated, and what practical detail a first-time visitor would otherwise miss.

The product rule is simple: make the visitor feel like a local, not a tourist. Famous attractions can provide context, but they must not crowd out neighbourhood routines, everyday choices and practical local knowledge.

## Evidence standard

- Discover candidates through Reddit, local forums, review platforms, local publications and credible travel magazines. A travel article is a lead, not proof of local popularity.
- Compare at least six distinct local-evidence sources before publishing a city's first guide. Valid comparison sources are community discussions, review platforms and local publications. Search excerpts are weaker than a fully read source and must be labeled.
- Record positive and negative evidence. Repeated comments from one person are not independent endorsements.
- Every listed place needs at least one local-evidence source and a specific evidence note. Prefer multiple recent independent sources.
- Keep `known-for`, `activities` and `hidden-gems` separate. An official tourism source can establish a signature activity or season. A hidden gem needs community evidence and should not be inferred from a tourism page.
- Never fill a category just to reach five. Keep only the supported shortlist.
- Verify shortlisted places through current search results, official venue pages, Maps listings, tourism authorities and recent reporting. Confirm the branch, current existence, opening details and seasonal availability before calling a place verified.
- Disclose stale information, contradictory reviews, weak search excerpts and cases where current status could not be confirmed.
- Source roles are explicit: `community`, `review-platform` and `local-publication` support local preference; `travel-editorial` supports discovery and context; `official` supports existence, rules, history and seasonal claims.
- Do not copy Reddit posts wholesale. Summarise in original wording and link to the discussion.
- Ratings must have a provider, a review count, a check date and source URL. If unavailable, link to current Maps reviews without inventing a number.
- Keep city names searchable in English and common alternative spellings. Main UI copy is English, with optional short Romanised Hindi in italics underneath.

## Free data and licences

- Directory: https://download.geonames.org/export/dump/cities500.zip and https://download.geonames.org/export/dump/admin1CodesASCII.txt (GeoNames, CC BY 4.0). Retrieved 17 October 2026. Population values are source attributes, not current estimates.
- Map: https://github.com/datameet/maps/blob/master/Country/india-composite.geojson (DataMeet, CC0). An illustrative composite map, not a navigation or legal boundary reference.
- Photographs are hotlinked from Wikimedia, with individual creator and licence credits in the guide. Network access is required for photos. Images are visually cropped by CSS, not altered files.
- Wikipedia and Wikivoyage may supply short attributed reference profiles. Their text is reference context under Wikimedia project licences. It is not local evidence and should not be presented as a Nukkad recommendation.
- No paid mapping, geocoding, Reddit or search API is required to run the site. Hosting and external-service availability remain separate considerations.

## Companion popup

Preview only. Contact details are saved in sessionStorage in the current tab, not transmitted. There is no inbox, matching service or booking confirmation. Connect a consent-aware submission endpoint before accepting real requests.

## Next editorial work

Strengthen Jaipur's single-source leads, check current venue existence and exact branches, then research additional cities using the directory. The remaining cities have not been researched. Do not call the workbook a complete India travel guide.

## City textures

The Explore surface uses six original SVG patterns: paper fleck, jaali, block print, contour, handloom and terrazzo. Assignment is deterministic from the city slug. A city keeps the same visual identity across visits without storing personal data or introducing layout shift.
