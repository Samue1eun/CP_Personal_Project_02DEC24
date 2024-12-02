import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from '../pages/Home';
import LogInPage from '../pages/LogIn';
import RegisterPage from '../pages/Register';
import NotFoundPage from '../pages/NotFound';
import UsersFavorites from '../pages/UserFavorites';

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
        <Route path="/" element={<HomePage />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/favorites' element={<UsersFavorites />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

    </Router>

    </>
  )
}

export default App;
