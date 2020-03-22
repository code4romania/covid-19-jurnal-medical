import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as LogoSvg } from "../../assets/stamacasa.svg";
import { NavLink } from "react-router-dom";
import {
  Header as TFHeader,
  DevelopedBy,
  Button
} from "@code4ro/taskforce-fe-components";
import { UserThunks } from "../../store/UserReducer";
import { connect } from "react-redux";

import "./header.css";

const Header = ({ user, loadUser }) => {
  if (!user) {
    loadUser();
  }
  const handleLogin = () => {
    UserThunks.authenticate();
  };

  const handleLogout = () => {
    UserThunks.logout();
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

  const ProfileItems = () => (
    <>
      <NavLink to="/">Contul meu</NavLink>
      <div className="accountSeparator"></div>
      {user ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
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

const mapStateToProps = state => {
  return {
    user: state.UserReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => UserThunks.loadUser(dispatch)
  };
};

Header.propTypes = {
  user: PropTypes.object,
  loadUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
