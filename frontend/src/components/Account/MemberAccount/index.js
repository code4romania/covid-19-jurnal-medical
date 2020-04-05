import React from "react";

import "./MemberAccount.scss";

import mockData from '../mockData/mockData';
import getGeneralInfo from '../common/GeneralInfo.js';

export const MemberAccount = () => {
    
    const familyMembers = mockData["Alte persoane in grija"];

    if(!familyMembers.length) {
        return <div> No family Members</div>;
    }

    return familyMembers.map(getGeneralInfo)
};

export default MemberAccount;
