import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user, setLogin, setSignup, setCreateSpot,setShowModal }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

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
      <button className="fa" onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (user ?
        (<div className="profile-dropdown">
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div>
            <button onClick={logout}>Log Out</button>
          </div>
        </div>) :
        <div className="profile-dropdown">
          <div onClick={() => {
            setShowModal(true)
            setLogin(true)
            setSignup(false)
            setCreateSpot(false)
          }}>
            <button>Log in</button>
          </div>
          <div onClick={() => {
            setShowModal(true)
            setSignup(true)
            setLogin(false)
            setCreateSpot(false)
          }}>
            <button>Sign up</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
