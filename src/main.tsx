
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import React from 'react'; // Add missing React import

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
