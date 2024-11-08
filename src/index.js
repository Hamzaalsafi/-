import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StudentProvider } from './StudentContext'; 
import { Analytics } from "@vercel/analytics/react"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StudentProvider>
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
  </StudentProvider>
);

reportWebVitals();