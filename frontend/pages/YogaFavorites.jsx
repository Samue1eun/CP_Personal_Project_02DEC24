import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FullYogaDescriptionCard from '../components/Code Pen/Cards/FavoriteYogaPosesCards/FullYogaDescriptionCard/FullYogaDescriptionCard.jsx';

const YogaFavorites = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
    };

    return (
        <>
            <nav>
                <ul>
                    <li><button onClick={() => navigate('/home')}>Home</button></li>
                    <li><button onClick={() => navigate('/user-profile')}>My Profile</button></li>
                    <li><button onClick={() => navigate('/crypto-favorites')}>My Crypto Watchlist</button></li>
                    <li><button onClick={handleLogout}>Log Out</button></li>
                </ul>
            </nav>

            <h1>Your Favorite Yoga Poses</h1>
            <FullYogaDescriptionCard />
        </>
    );
};

export default YogaFavorites;