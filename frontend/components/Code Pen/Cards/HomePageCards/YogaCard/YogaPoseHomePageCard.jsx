import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './YogaPoseHomePageCard.css';

const YogaPoseHomePageCard = () => {

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

    const handleAddToFavorites = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('No access token found');
                return;
            }
            const response = await axios.post('http://127.0.0.1:8000/api/user/favorites/', {
                yoga_pose_id: yogaPose.id
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

    // Still need to add in the backend for adding yoga poses.
    return (
        <>
            <div className="yogacard"> 
                <h1>Pose of the Day</h1>
                {yogaPose ? (
                    <div>
                        <h2>{yogaPose.english_name}</h2>
                        <p><strong>Sanskrit Name:</strong> {yogaPose.sanskrit_name}</p>
                        <p><strong>Translation:</strong> {yogaPose.translation_name}</p>
                        {/* <p><strong>Description:</strong> {yogaPose.pose_description}</p>
                        <p><strong>Benefits:</strong> {yogaPose.pose_benefits}</p> */}
                        <img className="yoga-pose-image" src={yogaPose.url_svg_alt} alt={yogaPose.english_name} />
                        <button className="add-to-favorites-button" onClick={handleAddToFavorites}>Add to Favorites</button>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
};

export default YogaPoseHomePageCard;