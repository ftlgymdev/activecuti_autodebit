import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios';
import TerminateRequestPage from './pages/TerminateRequestPage.jsx';
import ActivateLeavePage from './pages/ActivateLeavePage.jsx';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = false;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/terminate-request" element={<TerminateRequestPage />} />
        <Route path="/activate-request" element={<ActivateLeavePage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
