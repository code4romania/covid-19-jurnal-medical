import React from "react";

import { ReactComponent as LogoSvg } from "../../assets/stamacasa.svg";
import { NavLink } from "react-router-dom";
import { Header as TFHeader } from "@code4ro/taskforce-fe-components";
import { DevelopedBy } from "@code4ro/taskforce-fe-components";

import "./header.css";

const Header = () => {
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

  const ProfileItems = () => (
    <>
      <NavLink to="/">Contul meu</NavLink>
      <div className="accountSeparator"></div>
      <NavLink to="/login">Login</NavLink>
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
