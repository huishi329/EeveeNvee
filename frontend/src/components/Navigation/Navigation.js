import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';
import './Navigation.css';

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const hostingSpots = useSelector(state => state.spots.hostSpots);
    const [showModal, setShowModal] = useState(false);
    const [login, setLogin] = useState(true);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar_left'>
                    <NavLink exact to="/">Home</NavLink>
                </div>
                <div className='navbar_right'>
                    {isLoaded &&
                        <>
                            {sessionUser ?
                                <button>Switch to hosting</button> :
                                <button>Become a host</button>}
                            <ProfileButton
                                user={sessionUser}
                                setLogin={setLogin}
                                setShowModal={setShowModal}
                            />
                        </>
                    }
                </div>
                {showModal &&
                    <Modal onClose={() => setShowModal(false)}>
                        {login ?
                            <LoginForm setShowModal={setShowModal} />
                            : <SignupForm setShowModal={setShowModal} />
                        }
                    </Modal>
                }
            </nav>
            <hr></hr>
        </>
    );
}
