import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const OtherProfileRedirect = ({ person, isLastItem }) => (
  <>
    <Link
      key={person.id}
      className="link"
      to={{
        pathname: "/account/other-members",
        state: { id: person.id }
      }}
    >
      {`${person.name} ${person.surname}`}
    </Link>
    {isLastItem && ", "}
  </>
);

OtherProfileRedirect.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    surname: PropTypes.string
  }).isRequired,
  isLastItem: PropTypes.bool.isRequired
};

export default OtherProfileRedirect;
