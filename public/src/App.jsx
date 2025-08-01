// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import URLShortenerForm from './components/URLShortenerForm';
import RedirectPage from './components/RedirectPage'; 
import StatsPage from './components/StatsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<URLShortenerForm />} />
        <Route path="/redirect/:code" element={<RedirectPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
