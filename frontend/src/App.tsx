import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProblemListPage from '@/pages/ProblemListPage';
import AttemptPage from '@/pages/AttemptPage';
import ResultPage from '@/pages/ResultPage';
import HistoryPage from '@/pages/HistoryPage';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-dracula-bg" data-app-ready>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<ProblemListPage />} />
            <Route path="/problems/:id/attempt" element={<AttemptPage />} />
            <Route path="/attempts/:id/result" element={<ResultPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
