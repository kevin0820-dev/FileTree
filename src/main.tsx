import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Change from .jsx to .tsx
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);