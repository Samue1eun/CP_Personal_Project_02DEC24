import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './TopTenCryptoCard.css';

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
        <div className="top-ten-crypto-card-container">
            <h2 className="top-ten-crypto-card-title"><strong>Top 10 Cryptocurrencies</strong></h2>
            <table>
                <thead>
                    <tr>
                        <th className="top-ten-crypto-header-title">Rank</th>
                        <th className="top-ten-crypto-header-title">Name</th>
                        <th className="top-ten-crypto-header-title">Symbol</th>
                        <th className="top-ten-crypto-header-title">Price</th>
                        <th className="top-ten-crypto-header-title">Change (24h)</th>
                    </tr>
                </thead>
                <tbody>
                    {cryptos.map((crypto) => (
                        <tr key={crypto.id} className="top-ten-crypto-rows">
                        <td className="top-ten-crypto-row-description">{crypto.rank}</td>
                        <td className="top-ten-crypto-row-description">{crypto.name}</td>
                        <td className="top-ten-crypto-row-description">{crypto.symbol}</td>
                        <td className="top-ten-crypto-row-description">${crypto.price}</td>
                        <td className="top-ten-crypto-row-description">{crypto.percent_change_24h}%</td>
                            <button class='button button-clear' onClick={() => handleAddToFavorites(crypto.id)}>
                                Add to Favorites
                            </button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default TopTenCryptoCard;