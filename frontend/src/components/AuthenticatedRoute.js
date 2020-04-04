import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { sel as userSel } from "../store/ducks/user";

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(userSel.user);

  return isAuthenticated ? <Route {...rest} component={Component} /> : null;
};

AuthenticatedRoute.propTypes = {
  component: PropTypes.any
};

export default AuthenticatedRoute;
