import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@code4ro/taskforce-fe-components";

import { ReactComponent as LogoSvg } from "../../assets/stamacasa.svg";

import "./login.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="container">
        <NavLink to="/">
          <LogoSvg />
        </NavLink>
        <h1>LOGIN</h1>
        <form className="login-form">
          <label>
            <span>Email</span>
            <input type="email" required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" minLength="5" required />
          </label>
          <div className="button-wrapper">
            <Button>Login</Button>
            <NavLink to="/">
              <span className="forgot-password">Ai uitat parola?</span>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
