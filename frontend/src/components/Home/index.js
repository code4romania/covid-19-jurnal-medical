import React from "react";
import BasePage from "../BasePage";
import UserHomePage from "./components/UserHomePage";
import DefaultHomePage from "./components/DefaultHomePage";
import { useSelector } from "react-redux";
import { sel as userSel } from "../../store/ducks/user";

const Home = () => {
  const isAuthenticated = useSelector(userSel.user);
  const page = isAuthenticated ? (
    <UserHomePage isAuthenticated />
  ) : (
    <DefaultHomePage />
  );

  return <BasePage>{page}</BasePage>;
};

export default Home;
