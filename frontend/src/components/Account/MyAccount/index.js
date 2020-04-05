import React from "react";

import "./MyAccount.scss";
import getGeneralInfo from '../common/GeneralInfo.js';

import mockData from '../mockData/mockData';

export const MyAccount = () => {
    const myData = Object.assign({}, mockData);
    return (
        getGeneralInfo(myData)
    );
};

export default MyAccount;
