import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CharityRun from './pages/CharityRun';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/charity-run" element={<CharityRun />} />
    </Routes>
  );
}

export default App;
