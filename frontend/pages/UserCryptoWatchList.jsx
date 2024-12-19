import React from 'react';
import MyFavoritedCryptocurrenciesNavBar from '../components/NavBar/MyFavoritedCryptocurrenciesNavBar/MyFavoritedCryptocurrenciesNavBar.jsx';
import FavoriteCryptoCard from '../components/Cards/HomePageCards/FavoriteCryptoCard/FavoriteCryptoCard';
import './CSS/UserFavoriteCryptocurrencies.css';

const CryptoCurrencyFavorite = () => {

    return (
        <>
        <MyFavoritedCryptocurrenciesNavBar />
        <h1 className="my-favorite-crypto-page-title">My Favorited Cryptocurriences</h1>
        <div className="my-favorite-crypto-page-content">
            <FavoriteCryptoCard />
        </div>

        </>
    )
}

export default CryptoCurrencyFavorite;