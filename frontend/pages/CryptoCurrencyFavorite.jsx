import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CryptoCurrencyFavorite = () => {
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
                <nav>
                    <ul>
                        <li><button onClick={() => navigate('/home')}>Home</button></li>
                        <li><button onClick={() => navigate('/user-profile')}>My Profile</button></li>
                        <li><button onClick={() => navigate('/yoga-favorites')}>My Favorite Yoga Poses</button></li>
                        <li><button onClick={handleLogout}>Log Out</button></li>
                    </ul>
                </nav>
         )}
        <h1>My Crypto Watchlist</h1>
        </>
    )
}

export default CryptoCurrencyFavorite;