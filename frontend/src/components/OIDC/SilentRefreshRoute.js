import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { UserThunks } from "../../store/UserReducer";
import { connect } from "react-redux";

const SilentRefreshRoute = ({ silentRefresh }) => {
  silentRefresh();
  return <Redirect to="/"></Redirect>;
};

const mapDispatchToProps = dispatch => {
  return {
    silentRefresh: () => {
      UserThunks.silentRefreshCallback(dispatch);
    }
  };
};

SilentRefreshRoute.propTypes = {
  silentRefresh: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(SilentRefreshRoute);
