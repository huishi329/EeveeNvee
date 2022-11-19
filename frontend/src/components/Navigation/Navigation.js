import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';
import SpotForm from '../SpotForm/SpotForm';
import './Navigation.css';

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const navbarStyle = useSelector(state => state.style.navbar);
    const [showModal, setShowModal] = useState(false);
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);
    const [createSpot, setCreateSpot] = useState(false);

    return (
        <div className='navbar-outer'>
            <nav className='navbar-inner' style={navbarStyle.header}>
                <div className='navbar-left'>
                    <NavLink exact to="/">
                        <div className='logo'>
                            <img src='https://github.com/huishi329/EeveeNvee/blob/main/eeveeNvee-logo.png?raw=true' alt='logo'>
                            </img>
                            <div>
                                <button>
                                    EeveeNvee
                                </button>
                            </div>
                        </div>
                    </NavLink>
                </div>
                <div className='navbar-right'>
                    {isLoaded &&
                        <>
                            {sessionUser &&
                                <div className='create-spot-button'>
                                    <button onClick={() => {
                                        setShowModal(true)
                                        setCreateSpot(true)
                                        setLogin(false)
                                        setSignup(false)
                                    }}>Create a spot</button>
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
