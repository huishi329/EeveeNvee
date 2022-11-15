import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user, setLogin, setShowModal }) {
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
        (<ul className="profile-dropdown">
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div>
            <button onClick={logout}>Log Out</button>
          </div>
        </ul>) :
        <ul className="profile-dropdown">
          <div onClick={() => {
            setLogin(true)
            setShowModal(true)
          }}>
            <button>Log in</button>
          </div>
          <div onClick={() => {
            setLogin(false)
            setShowModal(true)
          }}>
            <button>Sign up</button>
          </div>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
