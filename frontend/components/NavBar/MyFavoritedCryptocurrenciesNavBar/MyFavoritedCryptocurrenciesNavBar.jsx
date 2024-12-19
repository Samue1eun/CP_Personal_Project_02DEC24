import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './MyFavoritedCryptocurrenciesNavBar.css';

const MyFavoritedCryptocurrenciesNavBar = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
    };    

    return (
        <>
        {location.pathname === '/crypto-favorites' && (
        <div className="crypto-nav-bar-container">
            <nav>
                <button class="crypto-nav-bar-button button-clear" onClick={() => navigate('/home')}>
                    Home
                </button> |
                <button class="crypto-nav-bar-button button-clear" onClick={() => navigate('/user-profile')}>
                    My Profile
                </button> |
                <button class="crypto-nav-bar-button button-clear" onClick={() => navigate('/yoga-favorites')}>
                    Yoga Pose of the Day
                </button> |
                <button class="crypto-nav-bar-button button-clear" onClick={handleLogout}>
                    Logout
                </button>
            </nav>
        </div>
        )}

        </>
    )
}

export default MyFavoritedCryptocurrenciesNavBar;