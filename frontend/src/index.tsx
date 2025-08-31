import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.scss';
import { AppRoutes } from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <AppRoutes></AppRoutes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
