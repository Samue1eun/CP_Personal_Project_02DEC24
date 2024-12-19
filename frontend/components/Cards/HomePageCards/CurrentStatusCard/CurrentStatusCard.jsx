import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./CurrentStatusCard.css";

const CurrentStatusCard = () => {
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('No access token found');
                return;
            }

            const response = await axios.get('http://127.0.0.1:8000/api/v1/posts/user/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPosts(response.data);
        } catch (error) {
            console.error('There was an error fetching the posts!', error);
        }
    };

    const handlePost = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('No access token found');
                return;
            }

            const response = await axios.post('http://127.0.0.1:8000/api/v1/posts/', {
                content: content
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Post added:', response.data);
            setContent(''); // Clear the input after successful submission
            fetchPosts(); // Fetch the updated list of posts
        } catch (error) {
            console.error('There was an error adding the post!', error);
            if (error.response) {
                console.error('Error response data:', error.response.data); // Log the error response data
            }
        }
    };

    return (
        <>
            <div className="currentstatuscard">
            <h2 className="current-status-card-title">Current Thoughts</h2>
            <input
                className="current-status-input"
                type="text"
                placeholder="What is on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <br />
            <div className="button-container">
                <button class="status-button button-outline" onClick={handlePost}>Submit</button>
                <button class="status-button button-outline" onClick={() => setContent('')}>Clear</button>
            </div>

            </div>
        </>
    )
}

export default CurrentStatusCard;