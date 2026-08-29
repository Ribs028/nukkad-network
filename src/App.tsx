import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CharityRun from './pages/CharityRun';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charity-run" element={<CharityRun />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
