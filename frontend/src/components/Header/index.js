import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as LogoSvg } from "../../assets/stamacasa.svg";
import { NavLink } from "react-router-dom";
import {
  Header as TFHeader,
  DevelopedBy
} from "@code4ro/taskforce-fe-components";
import { UserThunks } from "../../store/UserReducer";
import { connect } from "react-redux";

import "./header.scss";

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
      <NavLink className="nav-link" to="/despre">
        Despre
      </NavLink>
      <a href="https://code4.ro/ro/apps/">Ecosistemul Covid-19</a>
      <a href="https://code4.ro/ro/doneaza/">Sprijină proiectul</a>
    </>
  );

  const ProfileItems = () => (
    <span className="account-items">
      {user ? (
        <>
          <NavLink to="/">Contul meu</NavLink>
          <div className="account-separator"></div>
          <a onClick={handleLogout}>Logout</a>
        </>
      ) : (
        <a onClick={handleLogin}>Login</a>
      )}
    </span>
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
