import React from "react";
import BasePage from "../BasePage";
import UserHomePage from "./components/UserHomePage";
import DefaultHomePage from "./components/DefaultHomePage";

const Home = () => {
  const isAuthenticated = false;
  const page = isAuthenticated ? (
    <UserHomePage></UserHomePage>
  ) : (
    <DefaultHomePage></DefaultHomePage>
  );
  return <BasePage>{page}</BasePage>;
};

export default Home;
