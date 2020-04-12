import React, { useEffect, useState } from "react";

import ProfileHistory from "../common/ProfileHistory/ProfileHistory";
import ProfileApi from "../../../api/profileApi";

import "./MyAccount.scss";

export const MyAccount = () => {
  const [userProfile, setUserProfile] = useState();
  const [familyMembers, setFamilyMembers] = useState();

  useEffect(() => {
    ProfileApi.get().then(setUserProfile);
  }, []);

  useEffect(() => {
    ProfileApi.getDependants().then(setFamilyMembers);
  }, []);

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
