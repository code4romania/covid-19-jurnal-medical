import React, { useState } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { AuthService } from "./auth";

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  AuthService.isAuthenticated().then(setIsAuthenticated);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? <Component {...props} /> : null
      }
    />
  );
};

AuthenticatedRoute.propTypes = {
  component: PropTypes.any
};

export { AuthenticatedRoute };
