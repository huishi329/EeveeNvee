import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import './Navigation.css';

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const hostingSpots = useSelector(state => state.spots.hostSpots);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div>
                {hostingSpots ?
                    <NavLink to='/spotlist'>Switch to hosting</NavLink> :
                    <NavLink to='/spotform'>Become host</NavLink>}
                <ProfileButton user={sessionUser} />
            </div>
        );
    } else {
        sessionLinks = (
            <div className='before_login'>
                <LoginFormModal />
                <NavLink to="/signup">Sign Up</NavLink>
            </div>
        );
    }

    return (
        <nav className='navbar'>
            <div className='navbar_left'>
                <NavLink exact to="/">Home</NavLink>
            </div>
            <div className='navbar_right'>
                {isLoaded && sessionLinks}
            </div>
        </nav>
    );
}
