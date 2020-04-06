import React from "react";

import "./MemberAccount.scss";

import mockData from "../mockData/mockData";
// import ProfileDetails from "../common/ProfileDetails/ProfileDetails.js";

export const MemberAccount = () => {
  const familyMembers = mockData["Alte persoane in grija"];

  if (!familyMembers.length) {
    return <div> No family Members</div>;
  }

  // return familyMembers.map(member => <ProfileDetails fields={member} />);
  return "";
};

export default MemberAccount;
