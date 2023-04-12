import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './App.sass';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import OfferDetail from './pages/OfferDetail';
import ContextProvider from './common/AppContext';
import UserPage from './pages/UserPage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './FirebaseConfig';

export const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='offer-detail/:offerId' element={<OfferDetail />} />
          <Route path='my-account' element={<UserPage />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
