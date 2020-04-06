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

const ProfileDetails = ({ fields, others, isSelf }) => {
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
          {others.length > 0
            ? others.map((person, index) => (
                <a key={person.id} className="link" href={`#/${person.id}`}>
                  {person.name} {index !== others.length - 1 && ","}
                </a>
              ))
            : " - "}
        </p>
      </div>
    </div>
  );
};

ProfileDetails.defaultProps = {
  //todo: remove mock when backend ready
  others: [
    {
      name: "Camelia Petrescu",
      id: "1"
    },
    { name: "Ioana Marinescu", id: "2" }
  ],
  isSelf: false
};

ProfileDetails.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
    phoneNumber: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    location: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    age: PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
    gender: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    smoking: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.bool
    }),
    comorbidities: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    livingAlone: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.bool
    }),
    inIsolation: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    othersInHouseholdIsolation: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  }).isRequired,
  others: PropTypes.array,
  isSelf: PropTypes.bool
};

export default ProfileDetails;
