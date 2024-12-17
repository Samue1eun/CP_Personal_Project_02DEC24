import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './FavoriteYogaPose.css';

const FavoriteYogaPose = () => {

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

            const response = await axios.get('http://120.0.0.1:8000/api/v1/yoga/user_favorites/', {
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

    return (
        <>
            <div className="yogafavoritecard">
                <h2>Favorite Yoga</h2>
                <div className="favoriteYogaList">
                    {favorites.map((favorite) => (
                        <div key={favorite.yoga.id} className="favoriteYoga">
                            <h3>{favorite.yoga.name}</h3>
                            <p>{favorite.yoga.description}</p>
                            <button onClick={() => handleDeleteFavorite(favorite.yoga.id)}>Remove</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default FavoriteYogaPose;