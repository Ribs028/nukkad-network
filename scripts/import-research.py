"""Publish reviewed CSV research as static city guides. No network or paid API.
Usage: python scripts/import-research.py [research-folder] [--dry-run]
"""
import csv, json, re, sys
from pathlib import Path
from urllib.parse import urlparse

ROOT=Path(__file__).resolve().parents[1]
CATEGORIES={'breakfast','lunch','dinner','nightlife','shopping','unique','must-visit','known-for','activities','hidden-gems'}
SOURCE_TYPES={'community','review-platform','local-publication','travel-editorial','official'}
LOCAL_EVIDENCE_TYPES={'community','review-platform','local-publication'}
def read(folder,name):
    with (folder/name).open(encoding='utf-8-sig',newline='') as f: return list(csv.DictReader(f))
def https(value):
    return urlparse(value).scheme=='https' and bool(urlparse(value).hostname)
def compile_city(slug,rows,sources,base):
    if not re.fullmatch(r'[a-z0-9-]+',slug): raise ValueError('Unsafe city slug')
    source_ids={s['id'] for s in sources}
    if len(source_ids)!=len(sources): raise ValueError(f'{slug}: duplicate source id')
    for s in sources:
        if not https(s['url']) or s['type'] not in SOURCE_TYPES or not s['checked']:
            raise ValueError(f'{slug}: invalid source {s["id"]}')
    used={id for r in rows for id in r['source_ids'].split('|')}
    local_sources=[s for s in sources if s['type'] in LOCAL_EVIDENCE_TYPES and s['id'] in used]
    independent_sources={re.search(r'/comments/([^/]+)',s['url']).group(1) if '/comments/' in s['url'] else s['url'].rstrip('/') for s in local_sources}
    if len(independent_sources)<6: raise ValueError(f'{slug}: at least six distinct used local-evidence sources required')
    if len({r['id'] for r in rows})!=len(rows): raise ValueError(f'{slug}: duplicate place id')
    places=[]
    for r in rows:
        required=['id','name','category','area','why','try','tip','source_ids','evidence','checked']
        if any(not r.get(k,'').strip() for k in required): raise ValueError(f'{slug}: incomplete place {r.get("id")}')
        ids=r['source_ids'].split('|')
        if r['category'] not in CATEGORIES or not set(ids)<=source_ids: raise ValueError(f'{slug}: invalid category/source for {r["id"]}')
        if not any(s['id'] in ids and s['type'] in LOCAL_EVIDENCE_TYPES for s in sources): raise ValueError(f'{slug}: no local evidence for {r["id"]}')
        p={k:r[k] for k in ['id','name','category','area','why','try','tip','evidence']}
        p.update(sourceIds=ids,mapsQuery=r.get('maps_query',''))
        if r.get('history'):
            if not https(r.get('history_source','')): raise ValueError(f'{slug}: history needs a source')
            p.update(history=r['history'],historySource=r['history_source'])
        places.append(p)
    for cat in CATEGORIES:
        if sum(p['category']==cat for p in places)>5: raise ValueError(f'{slug}: shortlist exceeds five for {cat}')
    result={**base,'citySlug':slug,'places':places,'sources':[{k:s[k] for k in ['id','title','url','type','checked','note']} for s in sources if s['id'] in used]}
    if not all(k in result for k in ['title','intro','checked','status','media','editorialNote','itinerary']):
        raise ValueError(f'{slug}: create research/city-notes/{slug}.json with guide intro, media and itinerary first')
    if any(s['placeId'] not in {p['id'] for p in places} for s in result['itinerary']): raise ValueError(f'{slug}: itinerary references a removed place')
    for m in result['media']:
        if not https(m['src']) or not https(m['href']) or not m['credit']: raise ValueError(f'{slug}: photo must have a public source and credit')
    return result

def run(folder,dry=False):
    rows=[r for r in read(folder,'places.csv') if r['publish'].strip().lower()=='yes']
    sources=read(folder,'sources.csv')
    catalogue={c['slug'] for c in json.loads((ROOT/'src/data/cities.json').read_text(encoding='utf-8'))}
    results={}
    for slug in sorted({r['city_slug'] for r in rows}):
        if slug not in catalogue: raise ValueError(f'Unknown city: {slug}')
        notes=folder/'city-notes'/f'{slug}.json'
        existing=ROOT/'public/guides'/f'{slug}.json'
        base=json.loads((notes if notes.exists() else existing).read_text(encoding='utf-8')) if notes.exists() or existing.exists() else {}
        results[slug]=compile_city(slug,[r for r in rows if r['city_slug']==slug],[s for s in sources if s['city_slug']==slug],base)
    if not dry:
        # Validate the entire import before writing any guide. Old unpublished files
        # can remain on disk, but the generated manifest makes them unreachable in UI.
        for slug,g in results.items():
            (ROOT/'public/guides'/f'{slug}.json').write_text(json.dumps(g,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
        (ROOT/'src/data/guides.json').write_text(json.dumps(list(results))+'\n',encoding='utf-8')
    print(('Validated' if dry else 'Published')+f' {len(results)} guide(s), {sum(len(g["places"]) for g in results.values())} places.')
if __name__=='__main__':
    args=[a for a in sys.argv[1:] if a!='--dry-run']
    run(Path(args[0]).resolve() if args else ROOT/'research','--dry-run' in sys.argv)
