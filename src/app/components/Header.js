// react imports
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

// third party imports

// in-app imports

const Header = () => {
    const navigate = useNavigate();

    const onLogoClick = () => {
        navigate('/');
    }

    return (
        <div className="s-header">
            <div className="s-header__container">
                <div className="s-header__logo" onClick={onLogoClick}>
                    <img src="https://cdn.prod.website-files.com/62662ec945767b19355b5c00/6334243ff7701ea2ce6fa024_our-logo-mpa.svg" alt="Mamo Logo"/>
                </div>
                <div className="s-header__expenses">
                    <Link to="/">Make Payment</Link>
                </div>
                <div className="s-header__expenses">
                    <Link to="/expenses">My Expenses</Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
