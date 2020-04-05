import React from "react";

import "./MyAccount.scss";
import getDetails from '../common/Details.js';

import mockData from '../mockData/mockData';

export const MyAccount = () => {
    const myData = Object.assign({}, mockData);
    delete myData["Alte persoane in grija"];

    return (
        getDetails(myData)
    );
};

export default MyAccount;
