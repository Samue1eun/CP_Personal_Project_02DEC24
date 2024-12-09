import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NavBar_1.css';

const NavBar_1 = () => {
    return (
        <>
            {/* {location.pathname === '/home' && (
                <nav>
                    <ul>
                        <li><button onClick={() => navigate('/home')}>Home</button></li>
                        <li><button onClick={() => navigate('/user-profile')}>My Profile</button></li>
                        <li><button onClick={() => navigate('/yoga-favorites')}>My Favorite Yoga Poses</button></li>
                        <li><button onClick={() => navigate('/crypto-favorites')}>My Crypto Watchlist</button></li>
                        <li><button onClick={handleLogout}>Log Out</button></li>
                    </ul>
                </nav>
            )} */}
        <header>
        <a id="logo" href="#">OP</a>
       <nav>
         <ul>
           <li><a href="#" id="current">Home</a></li>
           <li><a href="#">My Profile</a></li>
           <li><a href="#">My Favorite Yoga Poses</a></li>
           <li><a href="#" id="fb">My Crypto Watchlist</a></li>
         </ul>
       </nav>
     </header>
        </>
    )
};

export default NavBar_1;


