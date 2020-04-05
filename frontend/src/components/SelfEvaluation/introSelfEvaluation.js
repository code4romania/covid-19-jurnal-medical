import React, { useEffect, useState } from "react";
import { Button } from "@code4ro/taskforce-fe-components";
import PropTypes from "prop-types";
import ProfileSummary from "./profileSummary";
import ProfileApi from "../../api/profileApi";

const IntroSelfEvaluation = ({ onFinish }) => {
  const [userProfile, setUserProfile] = useState({});
  const [dependants, setDependants] = useState([]);

  useEffect(() => {
    ProfileApi.get().then(profile => setUserProfile(profile));
    ProfileApi.getDependants().then(dependants => setDependants(dependants));
  }, []);
  return (
    <div>
      <Button onClick={() => onFinish()}>Completeaza formularul</Button>
      {userProfile.id && (
        <ProfileSummary profile={userProfile} dependants={dependants} />
      )}
    </div>
  );
};

export default IntroSelfEvaluation;

IntroSelfEvaluation.propTypes = {
  onFinish: PropTypes.func.isRequired
};
