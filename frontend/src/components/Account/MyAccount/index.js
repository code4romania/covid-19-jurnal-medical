import React, { useEffect, useState } from "react";
import "./MyAccount.scss";
import ProfileHistory from "../common/ProfileHistory/ProfileHistory";
import MockProfileApi from "../../../api/mockProfileApi";
export const MyAccount = () => {
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    MockProfileApi.get().then(setUserProfile);
  }, []);
  return (
    <div className="account-container">
      <h1 className="account-header">Datele mele personale</h1>
      {userProfile && <ProfileHistory data={userProfile} isSelf={true} />}
    </div>
  );
};

export default MyAccount;
