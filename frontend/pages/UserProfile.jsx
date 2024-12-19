import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyProfileNavBar from "../components/NavBar/MyProfileNavBar/MyProfileNavBar.jsx";
import UserPostList from '../components/UserPostList';
import FavoriteCryptoCard from '../components/Cards/HomePageCards/FavoriteCryptoCard/FavoriteCryptoCard';

const UserProfile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
    };


    return (
        <>
            <MyProfileNavBar />
            <nav>
                <ul>
                    <li><button onClick={() => navigate('/home')}>Home</button></li>
                    <li><button onClick={() => navigate('/yoga-favorites')}>My Favorite Yoga Poses</button></li>
                    <li><button onClick={() => navigate('/crypto-favorites')}>My Crypto Watchlist</button></li>
                    <li><button onClick={handleLogout}>Log Out</button></li>
                </ul>
            </nav>
            <h1>User Profile</h1>
            <UserPostList />
            <FavoriteCryptoCard />
            


        </>
    ) 
}

export default UserProfile;