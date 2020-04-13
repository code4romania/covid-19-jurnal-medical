import React, { useEffect, useState } from "react";

import { Hero } from "@code4ro/taskforce-fe-components";
import StepsBar from "../../StepsBar";
import { ROUTES } from "../../../routes";
import ProfileApi from "../../../api/profileApi";
import AuthenticatedRoute from "../../AuthenticatedRoute";

const UserHomePage = () => {
  const [userProfile, setUserProfile] = useState(null);

  const updateProfileFromServer = () => {
    if (!userProfile) {
      ProfileApi.get().then(setUserProfile);
    }
  };

  useEffect(updateProfileFromServer, []);

  const { home } = ROUTES;
  const homeRoutes = Object.values(home);
  return (
    <>
      <Hero
        title="Ce pași ai de urmat"
        subtitle="Pentru a te putea ajuta iata ce ai la dispozitie in contul tau:"
        useFallbackIcon={true}
      />
      <StepsBar
        isProfileComplete={userProfile !== null && userProfile.id !== undefined}
      />

      {homeRoutes.map(({ path, component, extraProps }) => (
        <AuthenticatedRoute
          path={path}
          component={component}
          key={path}
          {...extraProps}
        />
      ))}
    </>
  );
};

export default UserHomePage;
