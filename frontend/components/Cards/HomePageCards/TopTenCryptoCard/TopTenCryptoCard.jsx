import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'milligram/dist/milligram.min.css';

const TopTenCryptoCard = () => {
    const [cryptos, setCryptos] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchData();
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('No access token found');
                return;
            }

            const response = await axios.get('http://127.0.0.1:8000/api/v1/crypto/user_favorites/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFavorites(response.data);
        } catch (error) {
            console.error('There was an error fetching the favorites!', error);
        }
    };


    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/crypto/');
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

            const response = await axios.post('http://127.0.0.1:8000/api/v1/crypto/user_favorites/add/', {
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
        <div>
            <h2>Top 10 Cryptocurrencies</h2>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Change (24h)</th>
                    </tr>
                </thead>
                <tbody>
                    {cryptos.map((crypto) => (
                    <tr key={crypto.id}>
                        <td>{crypto.rank}</td>
                        <td>{crypto.name}</td>
                        <td>{crypto.symbol}</td>
                        <td>${crypto.price}</td>
                        <td>{crypto.percent_change_24h}%</td>
                        <td>
                                <button onClick={() => handleAddToFavorites(crypto.id)}>
                                    Add to Favorites
                                </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <button>Outlined Button</button>
        </div>
        </>
    )
}

export default TopTenCryptoCard;