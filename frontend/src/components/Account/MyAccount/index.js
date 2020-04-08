import React from "react";
import PropTypes from "prop-types";
import "./MyAccount.scss";
import ProfileHistory from "../common/ProfileHistory/ProfileHistory";
import mockData from "../mockData/mockData";
export const MyAccount = ({ data }) => {
  return (
    <div className="account-container">
      <h1 className="account-header">Datele mele personale</h1>
      <ProfileHistory data={data} isSelf={true} />
    </div>
  );
};

MyAccount.defaultProps = {
  //todo change when api ready
  data: mockData
};

MyAccount.propTypes = {
  data: PropTypes.object.isRequired
};

export default MyAccount;
