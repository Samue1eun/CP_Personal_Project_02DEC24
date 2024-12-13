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
        <form onSubmit={handleSubmit}>
            <h3 id="logo">Register</h3>
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
            <label for="email">Email</label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Enter your Email.." 
                autocomplete="off" 
                required 
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
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
            <a class="register" href="#" onClick={() => navigate('/login')}>Go Back to Log In</a>
            <input type="submit" name="submit" value="Register" />
        </form>
        </>
    )
}

export default Register;