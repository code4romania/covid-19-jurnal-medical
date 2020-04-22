import React from "react";
import { ProfileForm } from "../AddMember";
import ProfileApi from "../../api/profileApi";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import SidebarLayout from "../SidebarLayout";
import { mapPreExistMedCondTexts } from "../../utils";

const UpdateProfile = ({
  location: {
    state: { id, profileDetails: currentUserData, isSelf }
  }
}) => {
  const history = useHistory();
  const sendResults = userData => {
    if (isSelf) {
      ProfileApi.updateProfile(id, userData).then(() =>
        history.push("/account/me")
      );
    } else {
      const preexistingMedicalCondition = mapPreExistMedCondTexts(
        userData.preexistingMedicalCondition
      );
      const formattedUserData = {
        ...userData,
        preexistingMedicalCondition
      };
      ProfileApi.updateFamilyProfile(id, formattedUserData).then(() =>
        history.push(`/account/other-members/${id}`)
      );
    }
  };

  return (
    <SidebarLayout>
      <ProfileForm
        sendResults={sendResults}
        forYourself={isSelf}
        currentUserData={currentUserData}
      />
    </SidebarLayout>
  );
};

UpdateProfile.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number.isRequired,
      profileDetails: PropTypes.object.isRequired,
      isSelf: PropTypes.bool.isRequired
    }).isRequired
  }).isRequired
};

export default UpdateProfile;
