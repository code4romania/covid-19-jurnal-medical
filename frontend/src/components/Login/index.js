import React from "react";
import { NavLink } from "react-router-dom";
import { LoginForm } from "@code4ro/taskforce-fe-components";

import { ReactComponent as LogoSvg } from "../../assets/stamacasa.svg";

import "./login.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="logo-wrapper">
        <NavLink to="/">
          <LogoSvg />
        </NavLink>
      </div>
      <div className="login-wrapper">
        <LoginForm rightContent={<NavLink to="/">Ai uitat parola?</NavLink>} />
      </div>
    </div>
  );
};

export default Login;
