import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { mapProfileDetails } from "./ProfileDetails.constants";

import "./ProfileDetails.scss";

const ProfileDetails = ({
  // eslint-disable-next-line no-unused-vars
  fields: { id, ...profileDetails },
  isSelf,
  children
}) => {
  if (!profileDetails || !Object.keys(profileDetails).length) {
    return <div>Nu exista date</div>;
  }

  const data = mapProfileDetails(profileDetails);

  return (
    <div className="profile">
      <div className="header">
        <Link
          className="link"
          to={{
            pathname: "/update-profile",
            state: {
              id,
              profileDetails,
              isSelf
            }
          }}
        >
          Editare profil
        </Link>
      </div>
      <div className="content">
        {data.map(({ label, value }) => (
          <div className="profile__field" key={label}>
            <strong>{label}:</strong>
            {Array.isArray(value) ? value.join(", ") : value}
          </div>
        ))}
      </div>
      <div className="footer">
        <hr />
        {children}
      </div>
    </div>
  );
};

ProfileDetails.defaultProps = {
  isSelf: false,
  family: []
};

ProfileDetails.propTypes = {
  fields: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    surname: PropTypes.string,
    phoneNumber: PropTypes.string,
    age: PropTypes.number,
    gender: PropTypes.number,
    county: PropTypes.string,
    city: PropTypes.string,
    preexistingMedicalCondition: PropTypes.array,
    quarantineStatus: PropTypes.string,
    smoker: PropTypes.bool,
    livesWithOthers: PropTypes.bool,
    quarantineStatusOthers: PropTypes.number,
    relationshipType: PropTypes.number
  }).isRequired,
  isSelf: PropTypes.bool,
  children: PropTypes.node
};

export default ProfileDetails;
