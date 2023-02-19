import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';
import styles from './Navigation.module.css';
import ProfileButton from './ProfileButton/ProfileButton';

export default function Navigation({ isLoaded }) {
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const location = useLocation().pathname;
    const [showModal, setShowModal] = useState(false);
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);

    return (
        <div className={styles.navbarOuter}>
            <nav className={styles.navbarInner} style={location.includes('spots') ? { width: '90rem', maxWidth: '90vw' } : {}}>
                <div className={styles.navbarLeft}>
                    <NavLink to="/">
                        <div className={styles.logo}>
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
                <div>
                    <a className={styles.socialLink} target="_blank" rel="nofollow noreferrer" href="https://huishi329.github.io/my-portfolio/">
                        <img src='/logo2.png' alt='huishi logo'></img>
                    </a>
                    <a className={styles.socialLink} rel="nofollow noreferrer" href="https://www.linkedin.com/in/huishi-an-8397311b1/">
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                    <a className={styles.socialLink} target="_blank" rel="nofollow noreferrer" href="https://github.com/huishi329">
                        <i className="fa-brands fa-github"></i>
                    </a>
                    <a className={styles.socialLink} target="_blank" rel="nofollow noreferrer" href="mailto:anhuishi95@gmail.com">
                        <i className="fa-solid fa-envelope"></i>
                    </a>
                </div>
                <div className={styles.navbarRight}>
                    {isLoaded &&
                        <>
                            {sessionUser &&
                                <div className={styles.switchToHostingButton}>
                                    <button onClick={() => {
                                        navigate('/listings')
                                    }}>Switch to hosting</button>
                                </div>}
                            <ProfileButton
                                user={sessionUser}
                                setLogin={setLogin}
                                setSignup={setSignup}
                                setShowModal={setShowModal}
                            />
                        </>
                    }
                </div>
                {
                    showModal &&
                    <Modal onClose={() => setShowModal(false)}>
                        {login && <LoginForm setShowModal={setShowModal} />}
                        {signup && <SignupForm setShowModal={setShowModal} />}
                    </Modal>
                }
            </nav >
        </div >
    );
}
