import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './MyProfileNavBar.css';

const MyProfileNavBar = () => {

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
        {location.pathname === '/user-profile' && (
        <div className="my-profile-nav-bar-container">
            <nav>
                <button class="my-profile-nav-bar-button button-clear" onClick={() => navigate('/home')}>
                    Home
                </button> |
                <button class="my-profile-nav-bar-button button-clear" onClick={() => navigate('/yoga-favorites')}>
                    Yoga Pose of the Day
                </button> |
                <button class="my-profile-nav-bar-button button-clear" onClick={() => navigate('/crypto-favorites')}>
                    My Favorited Cryptocurriences
                </button> |
                <button class="my-profile-nav-bar-button button-clear" onClick={handleLogout}>
                    Logout
                </button>
            </nav>
        </div>
        )}

        </>
    )
}

export default MyProfileNavBar;