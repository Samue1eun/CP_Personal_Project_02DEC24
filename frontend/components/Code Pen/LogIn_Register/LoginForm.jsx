import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './LoginRegisterForm.module.css'; // Import the CSS module

const LoginForm = () => {
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
            navigate('/home');  // Redirect to the homepage
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    };

    return (
        <div className={styles.login}>
            <div className={styles.loginTriangle}></div>
            <h2 className={styles.loginHeader}>Log in</h2>
            <form className={styles.loginContainer} onSubmit={handleSubmit}>
                <p>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </p>
                <p>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </p>
                <p>
                    <input type="submit" value="Log in" />
                </p>
            </form>
        </div>
    );
};

export default LoginForm;