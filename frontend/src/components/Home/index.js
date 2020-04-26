import React from "react";
import { Redirect } from "react-router-dom";
import BasePage from "../BasePage";
import UserHomePage from "./components/UserHomePage";
import DefaultHomePage from "./components/DefaultHomePage";
import { useSelector } from "react-redux";
import { sel as userSel } from "../../store/ducks/user";
import LoadingPlaceholder from "../LoadingPlaceholder";

const Home = () => {
  const { user, pending } = useSelector(userSel.state);
  if (!user && [null, true].includes(pending)) {
    return (
      <BasePage>
        <LoadingPlaceholder />
      </BasePage>
    );
  }

  const page = user ? (
    <UserHomePage isAuthenticated />
  ) : (
    <>
      <DefaultHomePage />
      <Redirect to="/" />
    </>
  );

  return <BasePage>{page}</BasePage>;
};

export default Home;
