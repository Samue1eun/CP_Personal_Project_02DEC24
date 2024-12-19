import React, { useState } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginRegisterForm.css'

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username,
                password,
            });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            navigate('/home');
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    };

    return (
        <>
        <div className="log-in-page-container">
        <video autoPlay muted loop className="background-video">
            <source src="./media/website_background_video.mov" type="video/mp4" />
        </video>
            <div className="log-in-container">
                <h1 className="log-in-header">Welcome to your Crypto Tracker, Yogi</h1>
            <form className="log-in-form" onSubmit={handleSubmit}>
                <h3 className ="log-in-title">Log In</h3>
                <label className ="username-title" for="username">Username</label>
                <input 
                    type="text" 
                    class="log-in-username-input" 
                    placeholder="Type in your username.." 
                    autocomplete="off" 
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className="password-title" for="password">Password</label>
                <input 
                    type="password" 
                    class="log-in-password-input" 
                    name="password" 
                    placeholder="Enter your password.." 
                    autocomplete="off" 
                    required 
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="log-in-button-container">
                    <button class="log-in-register-button button-clear" onClick={() => navigate('/register')}>Register</button>
                    <button type="submit" class="log-in-button button-outline">Log In</button>
                </div>
            </form>
            </div>
        </div>
        </>
    )
}

export default LogIn;