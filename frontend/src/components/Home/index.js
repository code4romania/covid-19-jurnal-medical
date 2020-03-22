import React from "react";

import { Hero } from "@code4ro/taskforce-fe-components";
import StepsBar from "../StepsBar";
import BasePage from "../BasePage";

const Home = () => {
  return (
    <BasePage>
      <Hero
        title="Ce pași ai de urmat"
        subtitle="Pentru a te putea ajuta iata ce ai la dispozitie in contul tau:"
        useFallbackIcon={true}
      />
      <StepsBar />
      Home placeholder
    </BasePage>
  );
};

export default Home;
