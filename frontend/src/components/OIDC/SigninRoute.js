import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { UserThunks } from "../../store/UserReducer";
import { connect } from "react-redux";

const SigninRoute = ({ loadUser }) => {
  loadUser();
  return <Redirect to="/"></Redirect>;
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      UserThunks.setUser(dispatch);
    }
  };
};

SigninRoute.propTypes = {
  loadUser: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(SigninRoute);
