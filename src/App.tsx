import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CharityRun from './pages/CharityRun';

const Explore = lazy(() => import('./pages/Explore'));
const Business = lazy(() => import('./pages/Business'));

function App() {
  return (
    <Suspense fallback={<div role="status" style={{padding: 40}}>Opening the map…</div>}><Routes>
      <Route path="/" element={<Home />} />
      <Route path="/charity-run" element={<CharityRun />} />
      <Route path="/business" element={<Business />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/explore/:city" element={<Explore />} />
    </Routes></Suspense>
  );
}

export default App;
