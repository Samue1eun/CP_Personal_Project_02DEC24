import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyProfileNavBar from "../components/NavBar/MyProfileNavBar/MyProfileNavBar.jsx";
import UserPostList from '../components/Cards/SpecificPageCard/UserPostList/UserPostList.jsx';
import FavoriteCryptoCard from '../components/Cards/HomePageCards/FavoriteCryptoCard/FavoriteCryptoCard';
import './CSS/UserProfile.css';

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
            <h1 className="user-profile-page-title">User Profile</h1>
            <div className="user-profile-page-content">
                <UserPostList />
            </div>


            


        </>
    ) 
}

export default UserProfile;