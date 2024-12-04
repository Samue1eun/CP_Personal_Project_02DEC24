import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '../pages/Home';
import LogInPage from '../pages/LogIn';
import RegisterPage from '../pages/Register';
import NotFoundPage from '../pages/NotFound';
import UserProfile from '../pages/UserProfile';
import YogaFavorites from '../pages/YogaFavorites';
import CryptoCurrencyFavorite from '../pages/UserCryptoWatchList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/yoga-favorites" element={<YogaFavorites />} />
        <Route path="/crypto-favorites" element={<CryptoCurrencyFavorite />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;