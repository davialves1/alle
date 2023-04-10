import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './App.sass';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import OfferDetail from './pages/OfferDetail';
import ContextProvider from './common/AppContext';
import UserPage from './pages/UserPage';
import AlleHeader from './common/alle-ui/AlleHeader';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <AlleHeader />
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='offer-detail/:offerId' element={<OfferDetail />} />
          <Route path='my-account' element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>
);
