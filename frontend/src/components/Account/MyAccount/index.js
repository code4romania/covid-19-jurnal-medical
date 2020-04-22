import React, { useEffect, useState } from "react";

import ProfileHistory from "../common/ProfileHistory/ProfileHistory";
import ProfileApi from "../../../api/profileApi";

import "./MyAccount.scss";

export const MyAccount = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [familyMembers, setFamilyMembers] = useState();

  const getUserDetails = () => {
    ProfileApi.get().then(setUserProfile);
  };

  const getUserDependantsDetails = () => {
    ProfileApi.getDependants().then(setFamilyMembers);
  };

  useEffect(() => getUserDetails(), []);

  useEffect(() => getUserDependantsDetails(), []);

  return (
    <div className="account-container">
      <h1 className="account-header">Datele mele personale</h1>
      {userProfile && (
        <ProfileHistory
          data={userProfile}
          family={familyMembers}
          isSelf={true}
        />
      )}
    </div>
  );
};

export default MyAccount;
