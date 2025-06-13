import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import ActivatePages from './pages/ActivatePages.jsx';
import { Autodebet } from './pages/Autodebet.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/activate" element={<ActivatePages />} />
        <Route path="/autodebet" element={<Autodebet />} />
      </Routes>
    </Router>
  </StrictMode>,
)
