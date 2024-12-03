import React from 'react'
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from '../pages/Home';
import LogInPage from '../pages/LogIn';
import RegisterPage from '../pages/Register';
import NotFoundPage from '../pages/NotFound';
import UserProfile from '../pages/UserProfile';
import YogaFavorites from '../pages/YogaFavorites';
import CryptoCurrencyFavorite from '../pages/CryptoCurrencyFavorite';

function App() {


  return (
    <>
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
          </ul>
        </nav>
      </div>

      <Routes>
        # removed userFavoriteCard from here
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/favorites' element={<YogaFavorites />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

    </Router>

    </>
  )
}

export default App;
