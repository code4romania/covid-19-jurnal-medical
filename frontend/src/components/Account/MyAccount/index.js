import React, { useEffect, useState } from "react";

import ProfileHistory from "../common/ProfileHistory/ProfileHistory";
import ProfileApi from "../../../api/profileApi";
import EvaluationApi from "../../../api/evaluationApi";

import "./MyAccount.scss";

export const MyAccount = () => {
  const [userProfile, setUserProfile] = useState();
  const [familyMembers, setFamilyMembers] = useState();
  const [evaluationResults, setEvaluationResults] = useState();

  useEffect(() => {
    ProfileApi.get().then(setUserProfile);
  }, []);

  useEffect(() => {
    ProfileApi.getDependants().then(setFamilyMembers);
  }, []);

  useEffect(() => {
    EvaluationApi.getEvaluationResults().then(res => {
      setEvaluationResults(res);
    });
  }, []);

  return (
    <div className="account-container">
      <h1 className="account-header">Datele mele personale</h1>
      {userProfile && (
        <ProfileHistory
          data={userProfile}
          family={familyMembers}
          evaluation={evaluationResults}
          isSelf={true}
        />
      )}
    </div>
  );
};

export default MyAccount;
