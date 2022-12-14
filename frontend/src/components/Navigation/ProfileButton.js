import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css'
import { loginUser } from "../../store/session";

function ProfileButton({ user, setLogin, setSignup, setCreateSpot, setShowModal }) {
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
      <div className="fa-icon">
        <button onClick={openMenu}>
          <i className="fa-solid fa-bars"></i>
          <i className="fa-regular fa-user"></i>
        </button>

      </div>
      {showMenu && (user ?
        (<div className="profile-dropdown" style={navbarStyle.menu}>
          <div className="profile-info">{user.username}</div>
          <div className="profile-info">{user.email}</div>
          <div className="button-div" style={{ borderRadius: '0 0 1rem 1rem' }}>
            <button
              className="transparent-button"
              onClick={logout}
            >Log Out</button>
          </div>
        </div>) :
        <div className="profile-dropdown" style={navbarStyle.menu}>
          <div className="button-div" style={{ borderRadius: '1rem 1rem 0 0' }}
            onClick={() => {
              setShowModal(true)
              setLogin(true)
              setSignup(false)
              setCreateSpot(false)
            }}>
            <button className="transparent-button">Log in</button>
          </div>
          <div className="button-div" onClick={() => {
            setShowModal(true)
            setSignup(true)
            setLogin(false)
            setCreateSpot(false)
          }}>
            <button className="transparent-button">Sign up</button>
          </div>
          <div className="button-div" style={{ borderRadius: '0 0 1rem 1rem' }}>
            <button className="transparent-button"
              onClick={() => demoUserLogin()}
            >Demo User</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
