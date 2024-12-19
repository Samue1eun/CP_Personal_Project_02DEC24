import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import YogaPosesofDayNavBar from '../components/NavBar/YogaPoseofDayNavBar/YogaPoseofDayNavBar.jsx';
import FullYogaDescriptionCard from '../components/Cards/FavoriteYogaPosesCards/FullYogaDescriptionCard/FullYogaDescriptionCard.jsx';
// import FavoriteYogaPose from '../components/FavoriteYogaPoseComponents/FavoriteYogaPoseCard/FavoriteYogaPose.jsx';
import './CSS/YogaFavorites.css';

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
            <YogaPosesofDayNavBar />
            <h1 class="yoga-pose-of-the-day-page-title">Yoga Pose of the Day</h1>
            <div className="yoga-pose-of-the-day-page-content">
                <FullYogaDescriptionCard />
            </div>


        </>
    );
};

export default YogaFavorites;