import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProfileSummary from "./profileSummary";
import ProfileApi from "../../api/profileApi";
import StartFormButton from "../Evaluation/startFormButton";

const IntroSelfEvaluation = ({ onFinish }) => {
  const [userProfile, setUserProfile] = useState({});
  const [dependants, setDependants] = useState([]);

  useEffect(() => {
    ProfileApi.get().then(profile => setUserProfile(profile));
    ProfileApi.getDependants().then(dependants => setDependants(dependants));
  }, []);
  return (
    <div>
      <StartFormButton onClick={() => onFinish()} />
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
