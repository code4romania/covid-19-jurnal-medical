import React from "react";

import "./MemberAccount.scss";

import mockData from '../mockData/mockData';
import getDetails from '../common/Details.js';

export const MemberAccount = () => {
 
    return mockData["Alte persoane in grija"].map(getDetails)
};

export default MemberAccount;
