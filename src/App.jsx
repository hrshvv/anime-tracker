import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Browse } from './pages/Browse';
import { AnimeDetail } from './pages/AnimeDetail';
import { MyList } from './pages/MyList';
import { Clubs } from './pages/Clubs';
import { Dashboard } from './pages/Dashboard';

export function App() {
  return (
    <ThemeProvider>
      <WatchlistProvider>
        <Router>
          <div className="app-layout">
            <Navbar />
            <main className="app-main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/anime/:id" element={<AnimeDetail />} />
                <Route path="/my-list" element={<MyList />} />
                <Route path="/clubs" element={<Clubs />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </Router>
      </WatchlistProvider>
    </ThemeProvider>
  );
}

export default App;
