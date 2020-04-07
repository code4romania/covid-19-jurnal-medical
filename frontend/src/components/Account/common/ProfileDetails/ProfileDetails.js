import React from "react";
import PropTypes from "prop-types";
import "./ProfileDetails.scss";

const renderField = (field = {}) => {
  let processedValue = field.value;
  if (typeof field.value === "boolean") {
    processedValue = field.value ? "Da" : "Nu";
  }
  return (
    field.label && (
      <div className="profile__field" key={field.label}>
        {" "}
        <strong> {field.label}:</strong> {processedValue}
      </div>
    )
  );
};

const ProfileDetails = ({ fields, isSelf }) => {
  if (!fields || !Object.keys(fields).length) {
    return <div>Nu exista date</div>;
  }

  return (
    <div className="profile__container">
      {isSelf && (
        <div className="header">
          <a className="link" href="#">
            Editare profil
          </a>
        </div>
      )}
      <div className="content">
        <div className="left">
          {[
            fields.name,
            fields.relationship,
            fields.phoneNumber,
            fields.location,
            fields.age,
            fields.gender
          ].map(field => renderField(field))}
        </div>
        <div className="right">
          {[
            fields.smoking,
            fields.comorbidities,
            fields.livingAlone,
            fields.inIsolation,
            fields.othersInHouseholdIsolation
          ].map(field => renderField(field))}
        </div>
      </div>
      <div className="footer">
        <hr />
        <p className="general-info__field">
          <strong>Alte persoane în grijă:</strong>
          {fields.others.length > 0
            ? fields.others.map((person, index) => (
                <a
                  key={person.id}
                  className="link"
                  href={`/account/other-members?personId=${person.id}`}
                >
                  {person.name} {index !== fields.others.length - 1 && ","}
                </a>
              ))
            : " - "}
        </p>
      </div>
    </div>
  );
};

ProfileDetails.defaultProps = {
  isSelf: false
};

ProfileDetails.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
      .isRequired,
    relationship: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    phoneNumber: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    location: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }).isRequired,
    age: PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
      .isRequired,
    gender: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }).isRequired,
    smoking: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.bool
    }).isRequired,
    comorbidities: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }).isRequired,
    livingAlone: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.bool
    }).isRequired,
    inIsolation: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }).isRequired,
    othersInHouseholdIsolation: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }).isRequired,
    others: PropTypes.array
  }).isRequired,
  isSelf: PropTypes.bool
};

export default ProfileDetails;
