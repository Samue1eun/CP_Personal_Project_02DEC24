import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './TopTenCryptoCard.css';

const TopTenCryptoCard = () => {
    const [cryptos, setCryptos] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

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
    
    return (
        <>
        <div class="topTenCryptoCard">
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
        </div>
        </>
    )
}

export default TopTenCryptoCard;