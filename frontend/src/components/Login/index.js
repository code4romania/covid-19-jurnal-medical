import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "@code4ro/taskforce-fe-components";
import StamAcasaLogo from "../../images/stamacasa.svg";
import "./login.scss";

const Login = () => {
  const style = { minWidth: 300, maxWidth: 400, marginTop: 20 };
  const initialState = {
    email: "",
    password: "",
    remember: true
  };

  const [loginData, setState] = useState(initialState);
  return (
    <div className="login">
      <img src={StamAcasaLogo} style={{ width: 300 }} alt={"logo"}></img>
      <div style={style}>
        <LoginForm
          rightContent={<Link to="/register">Ai uitat parola?</Link>}
          initialState={loginData}
          onSubmit={setState}
        />
      </div>
    </div>
  );
};

export default Login;
