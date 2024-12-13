import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserFavorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user/favorites/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setFavorites(response.data);
            } catch (error) {
                console.error('There was an error fecthing user favorites!', error);
            }
        };
        fetchFavorites();
    } , []);

    return (
        <>
            <h1>Your Favorite Cryptocurrencies</h1>
            <ul>
                {favorites.map((favorite) => (
                    <li key={favorite.id}>
                        {favorite.crypto.name} ({favorite.crypto.symbol}): ${favorite.crypto.price}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default UserFavorites;