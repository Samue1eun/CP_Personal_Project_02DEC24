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
            <h1>User Profile</h1>
            <UserPostList />

            


        </>
    ) 
}

export default UserProfile;