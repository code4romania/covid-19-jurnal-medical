import React, { useEffect, useState } from "react";
import "./MyAccount.scss";
import ProfileHistory from "../common/ProfileHistory/ProfileHistory";
import ProfileApi from "../../../api/profileApi";
export const MyAccount = () => {
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    ProfileApi.get().then(setUserProfile);
  }, []);
  return (
    <div className="account-container">
      <h1 className="account-header">Datele mele personale</h1>
      {userProfile && <ProfileHistory data={userProfile} isSelf={true} />}
    </div>
  );
};

export default MyAccount;
