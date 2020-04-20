import { signin, signout } from "../../api/auth";
import { NavLink } from "react-router-dom";
import React from "react";
import { sel as userSel } from "../../store/ducks/user";
import { useSelector } from "react-redux";
import { Constants } from "../../config/constants";

const ProfileItems = () => {
  const user = useSelector(userSel.user);
  const handleLogin = () => signin();
  const handleLogout = () => signout();

  return (
    <span className="account-items">
      {user ? (
        <>
          <NavLink to="/account">Contul meu</NavLink>
          <div className="account-separator" />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <a
            href={`${Constants.idpUrl}/identity/account/register?returnUrl=${window.location}register-complete`}
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
