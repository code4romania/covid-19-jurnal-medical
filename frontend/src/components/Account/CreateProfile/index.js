import React from "react";
import { ProfileForm } from "../../AddMember";
import ProfileApi from "../../../api/profileApi";
import PropTypes from "prop-types";

const CreateProfile = ({ onFinish }) => {
  const sendResults = userData =>
    ProfileApi.createProfile(userData).then(onFinish);

  return <ProfileForm sendResults={sendResults} forYourself={true} />;
};

CreateProfile.propTypes = {
  onFinish: PropTypes.func.isRequired
};

export default CreateProfile;
