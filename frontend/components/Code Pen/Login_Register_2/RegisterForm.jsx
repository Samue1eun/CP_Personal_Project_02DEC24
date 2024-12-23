import React, { useState } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginRegisterForm.css'

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/user/register/', {
                username,
                email,
                password,
            });
            console.log('User registered:', response.data);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            navigate('/login');
        } catch (error) {
            console.error('There was an error registering the user!', error);
        }
    };

    return (
        <>
        <div className="register-page-container">
            <div className="register-container">
            <h1>Register to be in Crypto Peace</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <h3 className="register-title">Register</h3>
                <label className="username-title" for="username">Username</label>
                <input
                    className="register-username-input"
                    type="text" 
                    id="username" 
                    placeholder="Type in your username.." 
                    autocomplete="off" 
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className="email-title" for="email">Email</label>
                <input
                    className="register-email-input"
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Enter your Email.." 
                    autocomplete="off" 
                    required 
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="password-title" for="password">Password</label>
                <input
                    className="register-password-input"
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Enter your password.." 
                    autocomplete="off" 
                    required 
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="register-log-in-button-container">
                    <button class="go-back-to-login-button button-clear" onClick={() => navigate('/login')}>Go Back to Log In</button>
                    <button type="submit" class="register-button button-outline">Register</button>
                </div>
            </form>
            </div>
        </div>
        </>
    )
}

export default Register;