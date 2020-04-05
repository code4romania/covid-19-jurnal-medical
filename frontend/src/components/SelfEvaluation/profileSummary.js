import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const ProfileSummary = ({ profile, dependants }) => {
  return (
    <div>
      <div>
        <div>
          Nume: {profile["name"]} {profile["surname"]}
        </div>
        <div>Numar de telefon: {profile["phoneNumber"]}</div>
        <div>Varsta: {profile["age"]}</div>
        <div>Gender: {profile["gender"]}</div>
      </div>
      <div>
        <b>Alte persoane in grija:</b>
        <ul>
          {dependants.map(depedant => (
            <li key={depedant.name}>
              {depedant.name} {depedant.surname}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileSummary;

ProfileSummary.propTypes = {
  profile: {
    name: PropTypes.string,
    surname: PropTypes.string,
    phoneNumber: PropTypes.string,
    age: PropTypes.string,
    gender: PropTypes.string
  },
  dependants: PropTypes.array
};
