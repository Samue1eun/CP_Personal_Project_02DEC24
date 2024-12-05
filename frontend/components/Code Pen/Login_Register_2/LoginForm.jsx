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
        <form onSubmit={handleSubmit}>
            <h3 id="logo">Log In</h3>
            <label for="username">Username</label>
            <input 
                type="text" 
                id="username" 
                placeholder="Type in your username.." 
                autocomplete="off" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label for="password">Password</label>
            <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Enter your password.." 
                autocomplete="off" 
                required 
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <a class="forgot" href="#">Forgot Password?</a>
            <a class="register" href="#">Register</a>
            <input type="submit" name="submit" value="Log In" />
        </form>
        </>
    )
}

export default LogIn;