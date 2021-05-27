import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Hero } from "@code4ro/taskforce-fe-components";

import StepsBar from "../../StepsBar";
import AuthenticatedRoute from "../../AuthenticatedRoute";

import { ROUTES } from "../../../routes";
import ProfileApi from "../../../api/profileApi";
import useAuthHomeRedirect from "../../../hooks/redirect";

const UserHomePage = ({ isAuthenticated }) => {
  useAuthHomeRedirect(isAuthenticated);
  const [userProfile, setUserProfile] = useState(null);

  const updateProfileFromServer = () => {
    if (!userProfile) {
      ProfileApi.get().then(setUserProfile);
    }
  };

  useEffect(() => updateProfileFromServer(), []);

  const { home } = ROUTES;

  // TODO: to be refactored
  const onProfileUpdated = profileData => {
    setUserProfile(profileData);
  };
  home.account.props = {
    onProfileUpdated
  };
  const homeRoutes = Object.values(home);
  return (
    <>
      <Hero
        title="Ce pași ai de urmat:"
        subtitle="În secțiunea Profilul meu vei putea să vezi istoricul datelor tale sub tab-ul Formularele mele și istoricul celorlalți membri ai familiei sau persoane pentru care monitorizezi apariția sau manifestarea simptomelor sub tab-ul Alte persoane. În secțiunea Adaugă-ți familia în cont vei putea adăuga alte persoane în contul tău, iar în secțiunea Completează formularul de evaluare vei putea completa evaluarea zilnică atât pentru tine cât și pentru ceilalți."
        useFallbackIcon={true}
      />
      <StepsBar
        isProfileComplete={userProfile !== null && userProfile.id !== undefined}
      />

      {homeRoutes.map(({ path, component, props, extraProps }) => (
        <AuthenticatedRoute
          path={path}
          component={component}
          props={props}
          key={path}
          {...extraProps}
        />
      ))}
    </>
  );
};

UserHomePage.propTypes = {
  isAuthenticated: PropTypes.bool
};

export default UserHomePage;
