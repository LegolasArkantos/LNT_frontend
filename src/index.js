import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReduxProvider } from './provider/ReduxProvider';
    // import dotenv from 'dotenv'; // Import dotenv
    // dotenv.config({ path: process.env.NODE_ENV === 'production'? '.env' : '.env.local' }); // Load environment variables

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
