import { signin, signout } from "../../api/auth";
import { NavLink } from "react-router-dom";
import React from "react";
import { sel as userSel } from "../../store/ducks/user";
import { useSelector } from "react-redux";

const ProfileItems = () => {
  const user = useSelector(userSel.user);
  const handleLogin = () => signin();
  const handleLogout = () => signout();

  return (
    <span className="account-items">
      {user ? (
        <>
          <NavLink to="/">Contul meu</NavLink>
          <div className="account-separator" />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <a
            href={`${process.env.REACT_APP_IDP_URL}/identity/account/register?returnUrl=${window.location}register-complete`}
          >
            Inregistrare
          </a>
          <div className="account-separator" />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </span>
  );
};

export default ProfileItems;
