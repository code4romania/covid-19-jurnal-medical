import React from "react";
import { Link } from "react-router-dom";
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
        <strong> {field.label}:</strong> {processedValue}
      </div>
    )
  );
};

const renderFields = fields => {
  return fields.map(renderField);
};

const ProfileDetails = ({ fields, isSelf }) => {
  const leftColumnFields = [
    fields.name,
    fields.relationship,
    fields.phoneNumber,
    fields.location,
    fields.age,
    fields.gender
  ];
  const rightColumnFields = [
    fields.smoking,
    fields.comorbidities,
    fields.livingAlone,
    fields.inIsolation,
    fields.othersInHouseholdIsolation
  ];
  if (!fields || !Object.keys(fields).length) {
    return <div>Nu exista date</div>;
  }

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
        <div className="left">{renderFields(leftColumnFields)}</div>
        <div className="right">{renderFields(rightColumnFields)}</div>
      </div>
      <div className="footer">
        <hr />
        <p className="general-info__field">
          <strong>Alte persoane în grijă:</strong>
          {fields.others.length > 0
            ? fields.others.map((person, index) => (
                <>
                  <Link
                    key={person.id}
                    className="link"
                    to={`/account/other-members/${person.id}`}
                  >
                    {person.name}
                  </Link>
                  {index !== fields.others.length - 1 && ", "}
                </>
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
