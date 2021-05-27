import { signin, signout } from "../../api/auth";
import { Link } from "react-router-dom";
import React from "react";
import { sel as userSel } from "../../store/ducks/user";
import { useSelector } from "react-redux";
import { Constants } from "../../config/constants";

const ProfileItems = () => {
  const user = useSelector(userSel.user);
  const handleLogin = () => signin();
  const handleLogout = () => signout();

  return (
    <div className="account-items">
      {user ? (
        <div className="dropdown is-hoverable">
          <div className="dropdown-trigger">
            <button
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              <span>Contul meu</span>
              <span className="icon is-small">
                <svg
                  className="svg-inline--fa fa-angle-down fa-w-10"
                  aria-hidden="true"
                  data-prefix="fas"
                  data-icon="angle-down"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content has-text-left">
              <Link to="/account" className="dropdown-item button is-white">
                Profil
              </Link>
              <Link
                to="/delete-account"
                className="dropdown-item button is-white"
              >
                Ștergere cont
              </Link>
              <hr className="dropdown-divider"></hr>
              <button
                onClick={handleLogout}
                className="dropdown-item button is-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <a
            href={`${Constants.idpUrl}/identity/account/register?returnUrl=${window.location}register-complete`}
            className="button is-white"
          >
            Înregistrare
          </a>
          <div className="account-separator" />
          <button onClick={handleLogin} className="button is-white">
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileItems;
