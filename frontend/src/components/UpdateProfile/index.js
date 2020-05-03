import React from "react";
import { ProfileForm } from "../AddMember";
import ProfileApi from "../../api/profileApi";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import SidebarLayout from "../SidebarLayout";

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
      ProfileApi.updateFamilyProfile(id, userData).then(() =>
        history.push({
          pathname: "/account/other-members",
          state: { id }
        })
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
