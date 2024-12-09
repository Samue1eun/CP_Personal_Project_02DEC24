import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './FullYogaDescriptionCard.module.css';

const FullYogaDescriptionCard = () => {

    const [yogaPose, setYogaPose] = useState(null);

    useEffect(() => {
        const fetchYogaPose = async () => {
            try {
                const response = await axios.get('https://yoga-api-nzy4.onrender.com/v1/poses');
                const poses = response.data;

                // Select a random pose
                const randomPose = poses[Math.floor(Math.random() * poses.length)];
                setYogaPose(randomPose);
            } catch (error) {
                console.error('There was an error fetching the yoga pose!', error);
            }
        };

        fetchYogaPose();
    }, []);

    return (
        <>
            <div className={styles.fullYogaDescriptionCard}> 
                <h1>Pose of the Day!</h1>
                {yogaPose ? (
                    <div>
                        <h2>{yogaPose.english_name}</h2>
                        <p><strong>Sanskrit Name:</strong> {yogaPose.sanskrit_name}</p>
                        <p><strong>Translation:</strong> {yogaPose.translation_name}</p>
                        <p><strong>Description:</strong> {yogaPose.pose_description}</p>
                        <p><strong>Benefits:</strong> {yogaPose.pose_benefits}</p>
                        <img className={styles.yogaPoseImageFullDescription} src={yogaPose.url_svg_alt} alt={yogaPose.english_name} />
                        <button className={styles.addToFavoritesButton}>Add to Favorites</button>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
};

export default FullYogaDescriptionCard;