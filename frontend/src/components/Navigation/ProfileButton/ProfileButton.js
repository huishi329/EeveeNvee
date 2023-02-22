import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session';
import styles from './ProfileButton.module.css'
import { loginUser } from "../../../store/session";
import { useNavigate } from "react-router-dom";

export default function ProfileButton({ user, setShowLogin, setShowSignup, setShowModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const demoUserLogin = () => {
    dispatch(loginUser({
      credential: 'Demo-lition',
      password: 'password'
    }))
  }

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };
    // click anywhere on the window, close the profile menu
    document.addEventListener('click', closeMenu);
    document.addEventListener('wheel', closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
      document.removeEventListener("wheel", closeMenu);
    }
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logoutUser());
  };

  return (
    <>
      <div className={styles.faIcon}>
        <button onClick={openMenu}>
          <i className="fa-solid fa-bars"></i>
          <i className="fa-regular fa-user"></i>
        </button>

      </div>
      {showMenu && (user ?
        (<div className={styles.profileDropdown} >
          <div className={styles.profileInfo}>{user.username}</div>
          <div className={styles.profileInfo}>{user.email}</div>
          <div className={styles.buttonDiv}
            onClick={() => navigate('/trips/upcoming')}>
            <button className={styles.buttonBold}>Trips</button>
          </div>
          <div className={styles.buttonDiv}
            onClick={logout}>
            <button>Log Out</button>
          </div>
        </div>) :
        <div className={styles.profileDropdown} >
          <div className={styles.buttonDiv}
            onClick={() => {
              setShowModal(true)
              setShowLogin(true)
              setShowSignup(false)
            }}>
            <button>Log in</button>
          </div>
          <div className={styles.buttonDiv} onClick={() => {
            setShowModal(true)
            setShowSignup(true)
            setShowLogin(false)
          }}>
            <button className={styles.transparentButton}>Sign up</button>
          </div>
          <div className={styles.buttonDiv} style={{ borderRadius: '0 0 1rem 1rem' }}>
            <button className={styles.transparentButton}
              onClick={() => demoUserLogin()}
            >Demo User</button>
          </div>
        </div>
      )}
    </>
  );
};
