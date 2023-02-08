import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../../store/session';
import styles from './ProfileButton.module.css'
import { loginUser } from "../../../store/session";

export default function ProfileButton({ user, setLogin, setSignup, setCreateSpot, setShowModal }) {
  const dispatch = useDispatch();
  const navbarStyle = useSelector(state => state.style.navbar);
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

    return () => document.removeEventListener("click", closeMenu);
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
        (<div className={styles.profileDropdown} style={navbarStyle.menu}>
          <div className={styles.profileInfo}>{user.username}</div>
          <div className={styles.profileInfo}>{user.email}</div>
          <div className={styles.buttonDiv} style={{ borderRadius: '0 0 1rem 1rem' }}>
            <button
              className={styles.transparentButton}
              onClick={logout}
            >Log Out</button>
          </div>
        </div>) :
        <div className={styles.profileDropdown} style={navbarStyle.menu}>
          <div className={styles.buttonDiv} style={{ borderRadius: '1rem 1rem 0 0' }}
            onClick={() => {
              setShowModal(true)
              setLogin(true)
              setSignup(false)
              setCreateSpot(false)
            }}>
            <button className={styles.transparentButton}>Log in</button>
          </div>
          <div className={styles.buttonDiv} onClick={() => {
            setShowModal(true)
            setSignup(true)
            setLogin(false)
            setCreateSpot(false)
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
