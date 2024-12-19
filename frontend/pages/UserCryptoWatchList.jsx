import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MyFavoritedCryptocurrenciesNavBar from '../components/NavBar/MyFavoritedCryptocurrenciesNavBar/MyFavoritedCryptocurrenciesNavBar.jsx';

const CryptoCurrencyFavorite = () => {

    return (
        <>
        <MyFavoritedCryptocurrenciesNavBar />
        <h1>My Favorited Cryptocurriences</h1>
        </>
    )
}

export default CryptoCurrencyFavorite;