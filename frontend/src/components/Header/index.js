import React from "react";

import { ReactComponent as LogoSvg } from "../../assets/stamacasa.svg";
import { NavLink } from "react-router-dom";
import { Header as TFHeader } from "@code4ro/taskforce-fe-components";
import { IncubatedBy } from "@code4ro/taskforce-fe-components";

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
      <NavLink className="navLink" to="https://code4.ro/ro/apps/">
        Ecosistemul Covid-19
      </NavLink>
      <NavLink className="navLink" to="https://code4.ro/ro/doneaza/">
        Sprijină proiectul
      </NavLink>
    </>
  );

  const ProfileItems = () => (
    <>
      <NavLink to="/">Contul meu</NavLink>
      <div className="accountSeparator"></div>
      <NavLink to="/">Login</NavLink>
    </>
  );

  return (
    <>
      <TFHeader
        Logo={<Logo />}
        MenuItems={<MenuItems />}
        ProfileItems={<ProfileItems />}
      />
      <IncubatedBy />
    </>
  );
};

export default Header;
