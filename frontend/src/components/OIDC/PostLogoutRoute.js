import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { UserThunks } from "../../store/UserReducer";
import { connect } from "react-redux";

const PostLogoutRoute = ({ clearUser }) => {
  clearUser();
  return <Redirect to="/"></Redirect>;
};

const mapDispatchToProps = dispatch => {
  return {
    clearUser: () => {
      UserThunks.clearUser(dispatch);
    }
  };
};

PostLogoutRoute.propTypes = {
  clearUser: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(PostLogoutRoute);
