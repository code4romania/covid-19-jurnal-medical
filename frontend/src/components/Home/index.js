import React from "react";
import PropTypes from "prop-types";
import BasePage from "../BasePage";
import UserHomePage from "./components/UserHomePage";
import DefaultHomePage from "./components/DefaultHomePage";
import { connect } from "react-redux";

const Home = ({ user }) => {
  const isAuthenticated = user !== null;
  const page = isAuthenticated ? (
    <UserHomePage></UserHomePage>
  ) : (
    <DefaultHomePage></DefaultHomePage>
  );
  return <BasePage>{page}</BasePage>;
};

const mapStateToProps = state => {
  return {
    user: state.UserReducer.user
  };
};

Home.propTypes = {
  user: PropTypes.any
};

export default connect(mapStateToProps)(Home);
