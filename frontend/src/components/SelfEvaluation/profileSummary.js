import React from "react";

// eslint-disable-next-line react/prop-types
const ProfileSummary = ({ profile }) => {
  return (
    <div>
      <div>
        {/* eslint-disable-next-line react/prop-types */}
        Nume: {profile["name"]} {profile["surname"]}
      </div>
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
