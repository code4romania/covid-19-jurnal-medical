import React from "react";
import PropTypes from "prop-types";
import { PersonalDataTable } from "@code4ro/taskforce-fe-components";

const getPersonalData = function(profile) {
  return {
    age: {
      label: "Vârsta",
      value: profile.age
    },
    gender: {
      label: "Sexul",
      value: profile.gender
    },
    smoking: { label: "Fumator/fumatoare", value: profile.smoker },
    comorbidities: {
      label: "Alte afectiuni",
      value: profile.preexistingMedicalCondition
        ? [profile.preexistingMedicalCondition]
        : []
    },
    inIsolation: {
      label: "In izolare",
      value: profile.quarantineStatus === 1
    },
    othersInHousehold: {
      label: "Alte persoane in casă",
      value: profile.quarantineStatusOthers === 1
    }
  };
};

const ProfileSummary = ({ profile, dependants }) => {
  return (
    <div>
      <b>
        Nume: {profile.name} {profile.surname}{" "}
      </b>
      <PersonalDataTable personalData={getPersonalData(profile)} />
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
  profile: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
    phoneNumber: PropTypes.string,
    age: PropTypes.number,
    gender: PropTypes.number
  }),
  dependants: PropTypes.array
};
