import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

global.$baseUrl = process.env.REACT_APP_DRF_URL

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
