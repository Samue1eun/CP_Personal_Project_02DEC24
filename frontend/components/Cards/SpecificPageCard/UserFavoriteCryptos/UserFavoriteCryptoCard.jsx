import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './UserFavoriteCryptoCard.css';

const UserFavoriteCryptoCard = () => {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
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
                    'Authorization': `Bearer ${token}`
                }
            });
            setFavorites(response.data);
        } catch (error) {
            console.error('There was an error fetching the favorites!', error);
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

            const response = await axios.delete('http://127.0.0.1:8000/api/v1/crypto/user_favorites/remove/', {
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
            <div className="user-favorite-crypto-card-container">
                <h2 className="user-favorite-crypto-card-title"><strong>Favorite Cryptocurriences</strong></h2>
                <table className="user-favorite-crypto-table">
                    <thead>
                        <tr>
                            <th className="user-favorite-crypto-header-title">Name</th>
                            <th className="user-favorite-crypto-header-title">Symbol</th>
                            <th className="user-favorite-crypto-header-title">Price</th>
                            <th className="user-favorite-crypto-header-title">Market Cap</th>
                            <th className="user-favorite-crypto-header-title">Supply</th>
                            <th className="user-favorite-crypto-header-title">Global Rank</th>
                            <th className="user-favorite-crypto-header-title">Change(24)</th>
                        </tr>
                    </thead>

                    <tbody>
                        {favorites.map((favorite) => (
                            <tr key={favorite.crypto.id}>
                                <td className="user-favorite-crypto-row-description">{favorite.crypto.name}</td>
                                <td className="user-favorite-crypto-row-description">{favorite.crypto.symbol}</td>
                                <td className="user-favorite-crypto-row-description">{favorite.crypto.price}</td>
                                <td className="user-favorite-crypto-row-description">{favorite.crypto.market_cap}</td>
                                <td className="user-favorite-crypto-row-description">{favorite.crypto.supply}</td>
                                <td className="user-favorite-crypto-row-description">{favorite.crypto.rank}</td>
                                <td className="user-favorite-crypto-row-description">{favorite.crypto.percent_change_24h}</td>
                                <button class="user-crypto-delete-button button-clear" onClick={() => handleDeleteFavorite(favorite.crypto.id)}>
                                    Delete from Favorites
                                </button>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UserFavoriteCryptoCard;