import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const YogaPoseCard = ({ favorites }) => {
    const [yogaPose, setYogaPose] = useState(null);

    useEffect(() => {
        const fetchYogaPose = async () => {
            const cumulativeChange = calculateCumulativeChange(favorites);

            let level;
            if (cumulativeChange > 2) {
                level = 'expert';
            } else if (cumulativeChange < -2) {
                level = 'beginner';
            } else {
                level = 'intermediate';
            }

            try {
                const response = await axios.get(`https://yoga-api-nzy4.onrender.com/v1/poses?level=${level}`);
                const poses = response.data;

                // Ensure the randomly selected pose matches an ID within the category
                let randomPose;
                let attempts = 0;
                const maxAttempts = 10; // Prevent infinite loop

                do {
                    randomPose = poses[Math.floor(Math.random() * poses.length)];
                    attempts++;
                } while (!randomPose.id && attempts < maxAttempts);

                if (randomPose.id) {
                    setYogaPose(randomPose);
                } else {
                    console.error('No valid pose found after multiple attempts');
                }
            } catch (error) {
                console.error('There was an error fetching the yoga pose!', error);
            }
        };

        fetchYogaPose();
    }, [favorites]);

    const calculateCumulativeChange = (favorites) => {
        return favorites.reduce((acc, favorite) => acc + favorite.percent_change_24h, 0);
    };

    const savePose = (pose) => {
        setFavorites([...favorites, pose]);
    };

    return (
        <>
            <h1>Yoga Pose Card</h1>
            {yogaPose ? (
                <div>
                    <h2>{yogaPose.english_name}</h2>
                    <p><strong>Sanskrit Name:</strong> {yogaPose.sanskrit_name}</p>
                    <p><strong>Translation:</strong> {yogaPose.translation_name}</p>
                    <p><strong>Description:</strong> {yogaPose.pose_description}</p>
                    <p><strong>Benefits:</strong> {yogaPose.pose_benefits}</p>
                    <img src={yogaPose.url_svg_alt} alt={yogaPose.english_name} />
                    <button onClick={() => savePose(yogaPose)}>Save This Pose</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <h2>Favorites</h2>
            <ul>
                {favorites.map((pose, index) => (
                    <li key={index}>{pose.english_name}</li>
                ))}
            </ul>
        </>
    );
};

YogaPoseCard.propTypes = {
    favorites: PropTypes.array.isRequired,
};

YogaPoseCard.defaultProps = {
    favorites: [],
};

export default YogaPoseCard;