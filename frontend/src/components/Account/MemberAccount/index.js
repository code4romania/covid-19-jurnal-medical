import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Select } from "@code4ro/taskforce-fe-components";
import "./MemberAccount.scss";

import mockData from "../mockData/mockData";
import ProfileHistory from "../common/ProfileHistory/ProfileHistory.js";

export const MemberAccount = ({ data: familyMembers }) => {
  const { personId } = useParams();
  const [selectedMember, setSelectedMember] = useState();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(
      familyMembers.map(person => ({
        text: person.profile.name.value,
        value: person.profile.name.value,
        selected: selectedMember && person.id === selectedMember.id
      }))
    );
  }, [selectedMember, familyMembers]);

  useEffect(() => {
    if (!selectedMember) {
      if (!personId && familyMembers.length) {
        setSelectedMember(familyMembers[0]);
      } else {
        setSelectedMember(familyMembers.find(m => m.id === personId));
      }
    }
  }, [selectedMember, personId, familyMembers]);

  const props = {
    onChange: el => {
      const selectedPerson = familyMembers.find(
        person => person.profile.name.value === el.target.value
      );
      if (selectedPerson) {
        setSelectedMember(selectedPerson);
      }
    }
  };

  if (!familyMembers.length) {
    return <div> Nu exista alti membrii</div>;
  }

  return (
    <div className="member-profile">
      <p>
        Următorul formular te ajută să menții un istoric al simptomelor sau al
        absenței acestora în perioada în care persoanele pe care le ai în grijă
        stau în izolare. Parcurge întrebările și răspunde cu atenție. Pe măsură
        ce completezi, această pagină se va popula cu istoricul răspunsurilor
        lor. Chiar dacă nu locuiești cu aceste persoane, dar ții legătura
        recurent cu ele, le poți ajuta monitorizându-le sănătatea telefonic și
        marcând răspunsurile în aplicație
      </p>
      <h1 className="member-profile__select">
        <Select label={"Alege persona"} selectProps={props} options={options} />
      </h1>
      {selectedMember && <ProfileHistory data={selectedMember} />}
    </div>
  );
};

MemberAccount.defaultProps = {
  //todo: change when api ready
  data: mockData.otherMembers
};

MemberAccount.propTypes = {
  data: PropTypes.array.isRequired
};

export default MemberAccount;
