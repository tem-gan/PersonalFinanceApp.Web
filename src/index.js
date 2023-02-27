import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { TransactionsContextProvider } from './context/TransactionsContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TransactionsContextProvider>  
          <App />
      </TransactionsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

