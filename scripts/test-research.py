"""Test the publication gate against incomplete or misleading evidence."""
import copy, importlib.util, json, unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('publisher',ROOT/'scripts/import-research.py')
publisher=importlib.util.module_from_spec(spec)
spec.loader.exec_module(publisher)

class ResearchGate(unittest.TestCase):
    def setUp(self):
        self.rows=publisher.read(ROOT/'research','places.csv')
        self.sources=publisher.read(ROOT/'research','sources.csv')
        self.base=json.loads((ROOT/'public/guides/jaipur.json').read_text(encoding='utf-8'))
    def compile(self): return publisher.compile_city('jaipur',self.rows,self.sources,self.base)
    def test_seed_is_complete_and_traceable(self):
        result=self.compile()
        self.assertEqual(len(result['places']),33)
        self.assertEqual(sum(s['type']=='community' for s in result['sources']),14)
        self.assertFalse(any('rating' in p for p in result['places']))
    def test_repeated_links_do_not_pass_six_thread_gate(self):
        for s in self.sources:
            if s['type']=='community': s['url']=self.sources[0]['url']
        with self.assertRaisesRegex(ValueError,'six distinct'): self.compile()
    def test_broken_reference_is_rejected(self):
        self.rows[0]['source_ids']='missing'
        with self.assertRaisesRegex(ValueError,'invalid category/source'): self.compile()
    def test_unsafe_link_is_rejected(self):
        self.sources[0]['url']='javascript:alert(1)'
        with self.assertRaisesRegex(ValueError,'invalid source'): self.compile()
    def test_unsourced_history_is_rejected(self):
        self.rows[0]['history']='An unsupported story'
        self.rows[0]['history_source']=''
        with self.assertRaisesRegex(ValueError,'history needs a source'): self.compile()
    def test_removed_itinerary_stop_is_rejected(self):
        self.base['itinerary'][0]['placeId']='deleted'
        with self.assertRaisesRegex(ValueError,'itinerary references'): self.compile()
    def test_duplicate_places_rejected(self):
        self.rows.append(copy.deepcopy(self.rows[0]))
        with self.assertRaisesRegex(ValueError,'duplicate place'): self.compile()

if __name__=='__main__': unittest.main()
