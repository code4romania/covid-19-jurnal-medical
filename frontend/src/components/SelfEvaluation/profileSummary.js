import React from "react";

// eslint-disable-next-line react/prop-types
const ProfileSummary = ({ profile }) => {
  return (
    <div>
      {/* eslint-disable-next-line react/prop-types */}
      <div>Nume: {profile["fullName"]}</div>
      {/* eslint-disable-next-line react/prop-types */}
      <div>Numar de telefon: {profile["phoneNumber"]}</div>
      {/* eslint-disable-next-line react/prop-types */}
      <div>Varsta: {profile["age"]}</div>
      {/* eslint-disable-next-line react/prop-types */}
      <div>Gender: {profile["gender"]}</div>
    </div>
  );
};

export default ProfileSummary;
