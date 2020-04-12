import React from "react";
import PropTypes from "prop-types";

import OtherProfileRedirect from "./OtherProfileRedirect/OtherProfileRedirect";

const ProfileOthers = ({ family = [] }) => {
  return (
    <p className="general-info__field">
      <strong>Alte persoane în grijă:</strong>
      {family.length
        ? family.map((person, index) => (
            <OtherProfileRedirect
              key={person.id}
              person={person}
              isLastItem={index !== family.length - 1}
            />
          ))
        : " - "}
    </p>
  );
};

ProfileOthers.propTypes = {
  family: PropTypes.array
};

export default ProfileOthers;
