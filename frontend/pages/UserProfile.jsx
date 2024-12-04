import React from "react";
import { useNavigate } from "react-router-dom";
import UserPostList from '../components/UserPostList';

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
            <nav>
                <ul>
                    <li><button onClick={() => navigate('/home')}>Home</button></li>
                    <li><button onClick={() => navigate('/user-profile')}>My Profile</button></li>
                    <li><button onClick={() => navigate('/crypto-favorites')}>My Crypto Watchlist</button></li>
                    <li><button onClick={handleLogout}>Log Out</button></li>
                </ul>
            </nav>
            <h1>User Profile</h1>
            <UserPostList />


        </>
    ) 
}

export default UserProfile;