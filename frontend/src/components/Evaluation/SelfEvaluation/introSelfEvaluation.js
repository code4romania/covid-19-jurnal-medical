import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProfileApi from "../../../api/profileApi";
import StartFormButton from "../startFormButton";
import ProfileDetails from "../../Account/common/ProfileDetails/ProfileDetails";
import ProfileOthers from "../../Account/common/ProfileOthers/ProfileOthers";

const IntroSelfEvaluation = ({ onFinish }) => {
  const [userProfile, setUserProfile] = useState({});
  const [dependants, setDependants] = useState([]);

  useEffect(() => {
    ProfileApi.get().then(setUserProfile);
    ProfileApi.getDependants().then(setDependants);
  }, []);
  return (
    <div>
      <StartFormButton onClick={onFinish} />
      {userProfile.id && (
        <ProfileDetails fields={userProfile} isSelf>
          <ProfileOthers family={dependants} />
        </ProfileDetails>
      )}
    </div>
  );
};

export default IntroSelfEvaluation;

IntroSelfEvaluation.propTypes = {
  onFinish: PropTypes.func.isRequired
};
