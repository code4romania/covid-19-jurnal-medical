import React, { useState, useEffect } from "react";
import { Link, Route, Switch, useHistory, useParams } from "react-router-dom";
import { Select } from "@code4ro/taskforce-fe-components";

import ProfileHistory from "../common/ProfileHistory/ProfileHistory.js";
import ProfileApi from "../../../api/profileApi";

import { DESCRIPTION_TEXT } from "./constants.js";

import "./MemberAccount.scss";
import LoadingPlaceholder from "../../LoadingPlaceholder";

export const MemberAccount = () => {
  const { personId } = useParams();
  const history = useHistory();
  const [options, setOptions] = useState([]);
  const [familyMembers, setFamilyMembers] = useState();

  useEffect(() => {
    ProfileApi.getDependants().then(setFamilyMembers);
  }, []);

  useEffect(() => {
    if (!familyMembers) {
      return;
    }

    if (!personId && familyMembers.length) {
      history.replace(`/account/other-members/${familyMembers[0].id}`);
    }

    setOptions(
      familyMembers.map(({ name, surname, id }) => ({
        text: `${name} ${surname}`,
        value: id
      }))
    );
  }, [personId, familyMembers]);

  const props = {
    onChange: ({ target: { value: selectedValue } }) => {
      const selectedPerson = familyMembers.find(
        ({ id }) => id === +selectedValue
      );

      if (selectedPerson) {
        history.replace(`/account/other-members/${selectedPerson.id}`);
      }
    }
  };

  if (!familyMembers) {
    return <LoadingPlaceholder />;
  }

  if (!familyMembers.length) {
    return (
      <div>
        <div>Nu există alți membri. </div>
        <Link className="link" to={{ pathname: "/add-member" }}>
          Adaugă pe cineva
        </Link>
      </div>
    );
  }

  return (
    <div className="member-profile">
      <p>{DESCRIPTION_TEXT}</p>
      <h1 className="member-profile__select">
        <Select
          label="Alege persoana"
          selectProps={props}
          defaultValue={personId}
          options={options}
        />
      </h1>
      <Switch>
        {familyMembers.map(member => (
          <Route key={member.id} path={`/account/other-members/${member.id}`}>
            <ProfileHistory data={member} family={familyMembers} />
          </Route>
        ))}
      </Switch>
    </div>
  );
};

export default MemberAccount;
