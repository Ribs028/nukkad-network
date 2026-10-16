# Nukkad Network

A friend at every street corner. Nukkad Network helps people experience Indian cities through everyday local rhythms, neighbourhood habits, real food and shopping choices, and places residents repeatedly recommend.

**Live: [nukkad-network.vercel.app](https://nukkad-network.vercel.app)**

Nukkad Network and 28 States, 28 Days are pre-launch concepts. Nothing here represents completed bookings, verified companions, or operating traction.

## Pages

- `/` presents the Nukkad Network concept.
- `/explore` opens the India city map and search.
- `/explore/:city` opens a city's research profile or reviewed guide.
- `/business` is the coming-soon marketplace and resource directory.
- `/charity-run` presents the 28 States, 28 Days charity run concept.

## City research

The city catalogue contains 7,135 GeoNames populated places. Research is released in batches of 500 records.

Batch 1 source discovery was completed on 17 October 2026:

- 472 cities have a community and local source queue ready for editorial review.
- Jaipur has a reviewed guide.
- 11 locality records are covered by a parent-city research page.
- 16 cities remain evidence gaps after four targeted search passes.

The source shortlist is a research queue. It is not a list of recommendations. A venue or activity appears in a guide only after repeated local signals are compared and its current practical details are checked.

Batch 1 files live in `research/batches/`. After editing the shortlist or status files, regenerate the public city profiles with:

```bash
npm run research:publish-community -- 1
```

Do not begin Batch 2 until Batch 1 has been tested and approved.

## Stack

Vite, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React, and React Router.

## Development

```bash
npm install
npm run dev
```

Validation:

```bash
npm run build
npm run lint
python scripts/test-research.py
python scripts/import-research.py --dry-run
```
