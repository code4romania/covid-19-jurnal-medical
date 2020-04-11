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
      {isSelf && (
        <div className="header">
          {
            //todo: should set url once available
          }
          <Link className="link" to="#">
            Editare profil
          </Link>
        </div>
      )}
      <div className="content">
        {data.map(({ label, value }) => (
          <div className="profile__field" key={label}>
            <strong>{label}:</strong> {value}
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
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    gender: PropTypes.number.isRequired,
    county: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    preexistingMedicalCondition: PropTypes.string.isRequired,
    quarantineStatus: PropTypes.number.isRequired,
    smoker: PropTypes.bool.isRequired,
    livesWithOthers: PropTypes.bool.isRequired,
    quarantineStatusOthers: PropTypes.number.isRequired,
    relationshipType: PropTypes.number.isRequired
  }).isRequired,
  isSelf: PropTypes.bool,
  children: PropTypes.shape
};

export default ProfileDetails;
