import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';
import SpotForm from '../SpotForm/SpotForm';
import './Navigation.css';
import ProfileButton from './ProfileButton/ProfileButton';

export default function Navigation({ isLoaded }) {
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const navbarStyle = useSelector(state => state.style.navbar);
    const location = useLocation().pathname;
    const [showModal, setShowModal] = useState(false);
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);
    const [createSpot, setCreateSpot] = useState(false);

    return (
        <div className='navbar-outer'>
            <nav className='navbar-inner' style={navbarStyle.header}>
                <div className='navbar-left'>
                    <NavLink to="/">
                        <div className='logo'>
                            <img src='/eeveeNvee-logo.png' alt='logo'>
                            </img>
                            {!location.includes('spots') && <div>
                                <button>
                                    EeveeNvee
                                </button>
                            </div>}
                        </div>
                    </NavLink>
                </div>
                <div className='navbar-right'>
                    {isLoaded &&
                        <>
                            {sessionUser &&
                                <div className='switch-to-hosting'>
                                    <button onClick={() => {
                                        navigate('/listings')
                                    }}>Switch to hosting</button>
                                </div>}
                            <ProfileButton
                                user={sessionUser}
                                setCreateSpot={setCreateSpot}
                                setLogin={setLogin}
                                setSignup={setSignup}
                                setShowModal={setShowModal}
                            />
                        </>
                    }
                </div>
                {showModal &&
                    <Modal onClose={() => setShowModal(false)}>
                        {login && <LoginForm setShowModal={setShowModal} />}
                        {signup && <SignupForm setShowModal={setShowModal} />}
                        {createSpot && <SpotForm setShowModal={setShowModal} />}
                    </Modal>
                }
            </nav>
        </div>
    );
}
