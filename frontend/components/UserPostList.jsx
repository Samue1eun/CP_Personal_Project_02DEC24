import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const UserPostList = () => {
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

            const response = await axios.get('http://127.0.0.1:8000/api/user/posts/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPosts(response.data);
        } catch (error) {
            console.error('There was an error fetching the posts!', error);
        }
    };

    return (
        <>
            <h2>Your Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.content}</li>
                ))}
            </ul>
        </>
    )
};

export default UserPostList;