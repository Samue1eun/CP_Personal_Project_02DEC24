import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './FullYogaDescriptionCard.module.css';

const FullYogaDescriptionCard = () => {
    const [yogaPose, setYogaPose] = useState(null);

    useEffect(() => {
        const fetchYogaPose = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/yoga/pose_of_the_day/');
                setYogaPose(response.data);
            } catch (error) {
                console.error('There was an error fetching the yoga pose!', error);
            }
        };
        fetchYogaPose();
    }, []);

    const handleAddToFavorites = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('No access token found');
                return;
            }
            const response = await axios.post('http://127.0.0.1:8000/api/v1/yoga/user_favorites/', {
                yoga_pose: yogaPose.id
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Added to favorites:', response.data);
        } catch (error) {
            console.error('There was an error adding the yoga pose to favorites!', error);
        }
    };

    return (
        <div className={styles.fullYogaDescriptionCard}>
            <h1>Pose of the Day!</h1>
            {yogaPose ? (
                <div>
                    <h3>{yogaPose.english_name}</h3>
                    <p>Sanskrit Name: {yogaPose.sanskrit_name}</p>
                    <p>Translation: {yogaPose.translation_name}</p>
                    <p>Description: {yogaPose.pose_description}</p>
                    <p>Benefits: {yogaPose.pose_benefits}</p>
                    <img src={yogaPose.url_svg_alt} alt={yogaPose.english_name} />
                    <button onClick={handleAddToFavorites}>Add to Favorites</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default FullYogaDescriptionCard;