import React from 'react';
import nameSystem from '../../assets/icons/nameSystem.png';
import '../styles/Header.css';

const Header = () => {
    return (
        <div className='header'>
            <img src= {nameSystem} alt="logo" className='header-logo' />
        </div>
    );
};

export default Header;