import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'
import App from './App.jsx'
import ActivatePages from './pages/ActivatePages.jsx';
import { AutodebetPages } from './pages/AutodebetPages.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/terminate-request" element={<ActivatePages />} />
        <Route path="/reactivate-request" element={<AutodebetPages />} />
      </Routes>
    </Router>
  </StrictMode>,
)
