import React from "react";
import AppRouter from "../AppRouter";

import Header from "../Header";
import { Hero } from "@code4ro/taskforce-fe-components";
import StepsBar from "../StepsBar";
import Footer from "../Footer";

const Home = () => {
  return (
    <>
      <Header />
      <div className="container main-content">
        <Hero
          title="Ce pași ai de urmat"
          subtitle="Pentru a te putea ajuta iata ce ai la dispozitie in contul tau:"
          useFallbackIcon={true}
        />
        <StepsBar />
        <AppRouter />
      </div>
      <Footer />
    </>
  );
};

export default Home;
