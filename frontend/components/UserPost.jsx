import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPost = () => {
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

            const response = await axios.get('http://127.0.0.1:8000/api/v1/user/posts/', {
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
            <h2>Current Status</h2>
            <input
                type="text"
                placeholder="What is on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handlePost}>Submit</button>
            <button onClick={() => setContent('')}>Clear</button>
        </>
    );
};

export default UserPost;