import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './UserPostList.css';

const UserPostList = () => {
    const [posts, setPosts] = useState([]);
    const [editingPostId, setEditingPostId] = useState(null);
    const [newContent, setNewContent] = useState('');

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

    const deletePosts = async (postId) => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('No access token found');
                return;
            }

            await axios.delete(`http://127.0.0.1:8000/api/v1/posts/${postId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPosts(posts.filter(post => post.id !== postId)); // Update the state to remove the deleted post
        } catch (error) {
            console.error('There was an error deleting the post!', error);
        }
    };

    const editPosts = (postId, content) => {
        setEditingPostId(postId);
        setNewContent(content);
    };

    const handleEditSubmit = async (postId) => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('No access token found');
                return;
            }

            const response = await axios.put(`http://127.0.0.1:8000/api/v1/posts/${postId}/`, {
                content: newContent
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setPosts(posts.map(post => post.id === postId ? { ...post, content: newContent } : post));
                setEditingPostId(null);
                setNewContent('');
            }
        } catch (error) {
            console.error('There was an error updating the post!', error);
        }
    };
    return (
        <>

            <div className="user-post-card-container">
                <h2 className="user-post-title"><strong>Your Posts</strong></h2>
                <ul className="user-post-unordered-list">
                    {posts.map((post) => (
                        <li key={post.id}>
                            {editingPostId === post.id ? (
                                <div>
                                    <textarea
                                        value={newContent}
                                        onChange={(e) => setNewContent(e.target.value)}
                                    />
                                    <div>
                                        <button class="button-outline" onClick={() => handleEditSubmit(post.id)}>Save</button>
                                        <button class="button-clear" onClick={() => setEditingPostId(null)}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="user-post-block-quote">
                                    <blockquote>
                                        {post.content}
                                    </blockquote>

                                    <br />
                                    <div>
                                        <button class="button-outline" onClick={() => deletePosts(post.id)}>Remove Post</button>
                                        <button class="button-clear" onClick={() => editPosts(post.id, post.content)}>Edit Post</button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
};

export default UserPostList;