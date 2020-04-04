import React, { useEffect, useState } from "react";
import { Button } from "@code4ro/taskforce-fe-components";
import PropTypes from "prop-types";
import EvaluationApi from "../../api/EvaluationApi";
import ProfileSummary from "./profileSummary";

const IntroSelfEvaluation = ({ onFinish }) => {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    EvaluationApi.getProfile().then(profile => setUserProfile(profile));
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
