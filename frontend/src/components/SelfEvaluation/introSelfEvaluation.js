import React, { useEffect, useState } from "react";
import { Button } from "@code4ro/taskforce-fe-components";
import PropTypes from "prop-types";
import ProfileSummary from "./profileSummary";
import ProfileApi from "../../api/profileApi";

const IntroSelfEvaluation = ({ onFinish }) => {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    ProfileApi.get().then(profile => setUserProfile(profile));
  }, []);
  return (
    <div>
      <Button onClick={() => onFinish()}>Completeaza formularul</Button>
      {userProfile.id && <ProfileSummary profile={userProfile} />}
    </div>
  );
};

export default IntroSelfEvaluation;

IntroSelfEvaluation.propTypes = {
  onFinish: PropTypes.func.isRequired
};
