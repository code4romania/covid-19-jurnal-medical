import React from "react";

import { ReactComponent as LogoSvg } from "../../assets/stamacasa.svg";
import { NavLink } from "react-router-dom";
import {
  Header as TFHeader,
  DevelopedBy,
  Button
} from "@code4ro/taskforce-fe-components";
import { AuthService } from "../../auth";

import "./header.css";

const Header = () => {
  const handleLogin = () => {
    AuthService.signin();
  };

  const Logo = () => (
    <NavLink to="/">
      <LogoSvg />
    </NavLink>
  );

  const MenuItems = () => (
    <>
      <NavLink className="navLink" to="/despre">
        Despre
      </NavLink>
      <a className="navLink" href="https://code4.ro/ro/apps/">
        Ecosistemul Covid-19
      </a>
      <a className="navLink" href="https://code4.ro/ro/doneaza/">
        Sprijină proiectul
      </a>
    </>
  );
  console.log("render");

  const ProfileItems = () =>
    AuthService.isAuthenticated() ? (
      <div>Wellcome, {AuthService.user.profile.email}</div>
    ) : (
      <>
        <NavLink to="/">Contul meu</NavLink>
        <div className="accountSeparator"></div>
        <Button onClick={handleLogin}>Login</Button>
      </>
    );

  return (
    <>
      <TFHeader
        Logo={<Logo />}
        MenuItems={<MenuItems />}
        ProfileItems={<ProfileItems />}
      />
      <DevelopedBy />
    </>
  );
};

export default Header;
