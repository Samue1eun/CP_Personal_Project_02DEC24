import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './NavBar.css';

const NavBar = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
    };    

    return (
        <>
        {location.pathname === '/home' && (
        <div className="nav-bar-container">
            <nav>
                <button onClick={() => navigate('/user-profile')} className="iobtn material-raised material-blue">
                    My Profile
                </button>
                <button onClick={() => navigate('/yoga-favorites')} className="iobtn material-raised material-blue">
                    Yoga Pose of the Day
                </button>
                <button onClick={() => navigate('/crypto-favorites')} className="iobtn material-raised material-blue">
                    My Favorited Cryptocurrencies
                </button>
                <button onClick={handleLogout} className="iobtn material-raised material-blue">
                    Logout
                </button>
            </nav>
        </div>
        )}

        </>
    )
}

export default NavBar;