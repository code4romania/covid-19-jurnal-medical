import React, { useState, useEffect } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams
} from "react-router-dom";
import { Select } from "@code4ro/taskforce-fe-components";
import "./MemberAccount.scss";

import ProfileHistory from "../common/ProfileHistory/ProfileHistory.js";
import ProfileApi from "../../../api/profileApi";

export const MemberAccount = () => {
  const { personId } = useParams();
  const history = useHistory();
  const [options, setOptions] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);

  useEffect(() => {
    ProfileApi.getDependants().then(setFamilyMembers);
  }, []);

  useEffect(() => {
    setOptions(
      familyMembers.map(person => ({
        text: person.profile.name.value,
        value: person.profile.name.value,
        selected: person.id === personId
      }))
    );
  }, [personId, familyMembers]);

  const props = {
    onChange: el => {
      const selectedPerson = familyMembers.find(
        person => person.profile.name.value === el.target.value
      );
      if (selectedPerson) {
        history.replace(`/account/other-members/${selectedPerson.id}`);
      }
    }
  };

  if (!familyMembers.length) {
    return <div> Nu exista alti membri</div>;
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
        <Select label="Alege persona" selectProps={props} options={options} />
      </h1>
      <Switch>
        {familyMembers.map(member => (
          <Route key={member.id} path={`/account/other-members/${member.id}`}>
            <ProfileHistory data={member} />
          </Route>
        ))}
        {familyMembers.length && (
          <Redirect to={`/account/other-members/${familyMembers[0].id}`} />
        )}
      </Switch>
    </div>
  );
};

export default MemberAccount;
