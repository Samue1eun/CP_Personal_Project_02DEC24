import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './YogaPoseofDayNavBar.css';

const YogaPosesofDayNavBar = () => {

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
        {location.pathname === '/yoga-favorites' && (
        <div className="yoga-pose-nav-bar-container">
            <nav>
                <button class="yoga-pose-nav-bar-button button-clear" onClick={() => navigate('/home')}>
                    Home
                </button> |
                <button class="yoga-pose-nav-bar-button button-clear" onClick={() => navigate('/user-profile')}>
                    My Profile
                </button> |
                <button class="yoga-pose-nav-bar-button button-clear" onClick={() => navigate('/crypto-favorites')}>
                    My Favorited Cryptocurriences
                </button> |
                <button class="yoga-pose-nav-bar-button button-clear" onClick={handleLogout}>
                    Logout
                </button>
            </nav>
        </div>
        )}

        </>
    )
}

export default YogaPosesofDayNavBar;