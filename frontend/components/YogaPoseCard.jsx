import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YogaPoseCard = () => {
    const [yogaPose, setYogaPose] = useState(null);
    const [favorites, setFavorites] = useState([]);

    const url = `https://yoga-api-nzy4.onrender.com/v1/poses?id=5`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(url);
                if (result.data && typeof result.data === 'object') {
                    setYogaPose(result.data);
                } else {
                    console.error("Unexpected response format:", result.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

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
                    <img src={yogaPose.url_png} alt={yogaPose.english_name} />
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
}

export default YogaPoseCard;