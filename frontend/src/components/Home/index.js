import React from "react";

import { Hero } from "@code4ro/taskforce-fe-components";
import StepsBar from "../StepsBar";
import BasePage from "../BasePage";
import { ROUTES } from "../../routes";
import { AuthenticatedRoute } from "../../AuthenticatedRoute";

const Home = () => {
  const { home } = ROUTES;
  const homeRoutes = Object.values(home);
  return (
    <BasePage>
      <Hero
        title="Ce pași ai de urmat"
        subtitle="Pentru a te putea ajuta iata ce ai la dispozitie in contul tau:"
        useFallbackIcon={true}
      />
      <StepsBar />

      {homeRoutes.map(({ path, component, extraProps }) => (
        <AuthenticatedRoute
          path={path}
          component={component}
          key={path}
          {...extraProps}
        />
      ))}
    </BasePage>
  );
};

export default Home;
