import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const FavoriteCryptoCard = () => {

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
            <div className="favoriteCryptoCard">
                <h2>Favorite Cryptocurriences</h2>
                {favorites.map((favorite) => (
                    <li key={favorite.crypto.id}>
                        {favorite.crypto.rank} {favorite.crypto.name} ({favorite.crypto.symbol}): ${favorite.crypto.price} {favorite.crypto.percent_change_24h}%
                        <br />
                        <button onClick={() => handleDeleteFavorite(favorite.crypto.id)}>Remove from Favorites</button>
                    </li>
                ))}
            </div>
        </>
    )
}

export default FavoriteCryptoCard;