import React, { useState } from "react";
import PropTypes from "prop-types";
import { Select } from "@code4ro/taskforce-fe-components";
import "./MemberAccount.scss";

import mockData from "../mockData/mockData";
import ProfileHistory from "../ProfileHistory/ProfileHistory.js";

export const MemberAccount = ({ data }) => {
  const familyMembers = mockData.otherMembers;
  const options = data.map(person => ({
    text: person.profile.name.value,
    value: person.profile.name.value
  }));
  const [selectedMember, setSelectedMember] = useState(familyMembers[0]);
  const props = {
    onChange: function(el) {
      const selectedPerson = familyMembers.find(
        person => person.profile.name.value === el.target.value
      );
      setSelectedMember(selectedPerson ? selectedPerson : familyMembers[0]);
    }
  };

  if (!familyMembers.length) {
    return <div> No family Members</div>;
  }

  return (
    <div className="member-container">
      <p>
        Următorul formular te ajută să menții un istoric al simptomelor sau al
        absenței acestora în perioada în care persoanele pe care le ai în grijă
        stau în izolare. Parcurge întrebările și răspunde cu atenție. Pe măsură
        ce completezi, această pagină se va popula cu istoricul răspunsurilor
        lor. Chiar dacă nu locuiești cu aceste persoane, dar ții legătura
        recurent cu ele, le poți ajuta monitorizându-le sănătatea telefonic și
        marcând răspunsurile în aplicație
      </p>
      <h1>
        <Select label={"Alege persona"} selectProps={props} options={options} />
      </h1>
      <ProfileHistory data={selectedMember} />;
    </div>
  );
};

MemberAccount.defaultProps = {
  //todo: change when api ready
  data: mockData.otherMembers
};

MemberAccount.propTypes = {
  data: PropTypes.array
};

export default MemberAccount;
