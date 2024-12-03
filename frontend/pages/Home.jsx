import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import YogaPoseCard from '../components/YogaPoseCard';

const HomePage = () => {
    const [cryptos, setCryptos] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        syncCryptoData();
        fetchData();
        fetchFavorites();
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

    const handleAddToFavorites = async (cryptoId) => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('No access token found');
                return;
            }

            const response = await axios.post('http://127.0.0.1:8000/api/favorites/add/', {
                crypto: cryptoId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Added to favorites:', response.data);

            // Update the favorites state directly
            const newFavorite = cryptos.find(crypto => crypto.id === cryptoId);
            setFavorites([...favorites, { crypto: newFavorite }]);
        } catch (error) {
            console.error('There was an error adding to favorites!', error);
            if (error.response) {
                console.error('Error response data:', error.response.data); // Log the error response data
            }
        }
    };

    const handleDeleteFavorite = async (cryptoId) => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('No access token found');
                return;
            }

            const response = await axios.delete('http://127.0.0.1:8000/api/favorites/remove/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    crypto_id: cryptoId
                }
            });
            console.log('Removed from favorites:', response.data);

            // Update the favorites state directly
            setFavorites(favorites.filter(favorite => favorite.crypto.id !== cryptoId));
        } catch (error) {
            console.error('There was an error removing from favorites!', error);
            if (error.response) {
                console.error('Error response data:', error.response.data); // Log the error response data
            }
        }
    };

    return (
        <>
            <h1>Home Page</h1>
            <button onClick={handleLogout}>Log Out</button>

            <h2>Yoga Poses</h2>
            <YogaPoseCard favorites={favorites} />
            <h2>Top 10 Cryptocurrencies</h2>
            <ul>
                {cryptos.map((crypto) => (
                    <li key={crypto.id}>
                        {crypto.rank}. {crypto.name} ({crypto.symbol}): ${crypto.price} {crypto.percent_change_24h}%
                        <br />
                        <button onClick={() => handleAddToFavorites(crypto.id)}>Add to Favorites</button>
                    </li>
                ))}
            </ul>
            <h2>Your Favorite Cryptocurrencies</h2>
            <ul>
                {favorites.map((favorite) => (
                    <li key={favorite.crypto.id}>
                        {favorite.crypto.rank} {favorite.crypto.name} ({favorite.crypto.symbol}): ${favorite.crypto.price} {favorite.crypto.percent_change_24h}%
                        <br />
                        <button onClick={() => handleDeleteFavorite(favorite.crypto.id)}>Remove from Favorites</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default HomePage;