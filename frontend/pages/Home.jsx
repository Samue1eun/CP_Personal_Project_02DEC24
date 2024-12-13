import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
// import NavBar_1 from '../components/Code Pen/Navbar/NavBar_1';
import CurrentStatusCard from '../components/Code Pen/Cards/HomePageCards/CurrentStatusCard/CurrentStatusCard';
import TopTenCryptoCard from '../components/Code Pen/Cards/HomePageCards/TopTenCryptoCard/TopTenCryptoCard';
import YogaPoseHomePageCard from '../components/Code Pen/Cards/HomePageCards/YogaCard/YogaPoseHomePageCard';
import FavoriteCryptoCard from '../components/Code Pen/Cards/HomePageCards/FavoriteCryptoCard/FavoriteCryptoCard';
import './CSS/HomePage.css';

<<<<<<< HEAD
// Test

=======
>>>>>>> 257aa01 (added in more start apps to the backend. began refactoring django.)
const HomePage = () => {
    const [cryptos, setCryptos] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        syncCryptoData();
        fetchData();
        // fetchFavorites();
    }, []);

    const syncCryptoData = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('No access token found');
                return;
            }

            const response = await axios.post('http://127.0.0.1:8000/api/sync-crypto/', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Sync response data:', response.data); // Log the response data
        } catch (error) {
            console.error('There was an error syncing the crypto data!', error);
            if (error.response) {
                console.error('Error response data:', error.response.data); // Log the error response data
            }
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/cryptos/');
            console.log('Response data:', response.data); // Log the response data
            const sortedCryptos = response.data.sort((a, b) => a.rank - b.rank);
            const top10Cryptos = sortedCryptos.slice(0, 10);
            setCryptos(top10Cryptos);
        } catch (error) {
            console.error('There was an error fetching the cryptos!', error);
        }
    };

    const fetchFavorites = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('No access token found');
                return;
            }

            const response = await axios.get('http://127.0.0.1:8000/api/user/favorites/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Favorites response data:', response.data); // Log the response data
            setFavorites(response.data);
        } catch (error) {
            console.error('There was an error fetching user favorites!', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
    };

    return (
        <>
            {/* <NavBar_1 /> */}
            {location.pathname === '/home' && (
                <nav>
                    <ul>
                        <li><button onClick={() => navigate('/home')}>Home</button></li>
                        <li><button onClick={() => navigate('/user-profile')}>My Profile</button></li>
                        <li><button onClick={() => navigate('/yoga-favorites')}>My Favorite Yoga Poses</button></li>
                        <li><button onClick={() => navigate('/crypto-favorites')}>My Crypto Watchlist</button></li>
                        <li><button onClick={handleLogout}>Log Out</button></li>
                    </ul>
                </nav>
            )}
            <h1 className='HomePageTitle'>Home Page</h1>
            <div className='grid-container'>
                <div className='grid-item CurrentStatusCardCSS'>
                    <CurrentStatusCard />
                </div>
                <div className='grid-item YogaPoseHomePageCardCSS'>
                    <YogaPoseHomePageCard />
                </div>
                <div className='grid-item TopTenCryptoCardCSS'>
                    <TopTenCryptoCard />
                </div>
                <div className='grid-item FavoriteCryptoCardCSS'>
                    <FavoriteCryptoCard />
                </div>
            </div>

        </>
    );
};

export default HomePage;