import React from 'react'
import { useState, useNavigate } from 'react';
import axios from 'axios';

const RegisterPage = () => {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/user/register/', {
                username,
                email,
                password,
            });
            navigate('/login');
        } catch (error) {
            console.error('There was an error registering!', error);
        }
    };

    return (
        <>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input 
                        type='text' 
                        id='username' 
                        name='username' 
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type='text' 
                        id='email' 
                        name='email' 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input 
                        type='password' 
                        id='password' 
                        name='password' 
                        onChange = {(e) => setPassword(e.target.value)}
                        />
                </div>
                <button type='submit'>Register</button>
        </form>
        </>
    )
}

export default RegisterPage;