import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Select } from "@code4ro/taskforce-fe-components";

import EvaluationForm from "./evaluationForm";
import EvaluationApi from "../../api/evaluationApi";
import ProfileApi from "../../api/profileApi";

const MemberEvaluation = () => {
  const location = useLocation();
  const history = useHistory();

  const [options, setOptions] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);

  useEffect(() => {
    ProfileApi.getDependants().then(setFamilyMembers);
  }, []);

  const personId = location?.state?.id;

  useEffect(() => {
    if (!personId && familyMembers.length) {
      history.replace({
        state: { id: familyMembers[0].id }
      });
    }

    setOptions(
      familyMembers.map(person => ({
        text: `${person.name} ${person.surname}`,
        value: person.id
      }))
    );
  }, [personId, familyMembers]);

  const props = {
    onChange: ({ target: { value: personId } }) => {
      if (personId) {
        history.replace({ state: { id: personId } });
      }
    }
  };

  if (!familyMembers.length) {
    return <div> Nu există alți membri</div>;
  }

  return (
    <>
      <h1 className="member-profile__select">
        <Select
          label="Alege persoana"
          defaultValue={personId}
          selectProps={props}
          options={options}
        />
      </h1>
      {personId && (
        <EvaluationForm
          getForm={() => EvaluationApi.getEvaluationForm(personId)}
          sendResults={results =>
            EvaluationApi.sendEvaluationResults(results, personId)
          }
        />
      )}
    </>
  );
};

export default MemberEvaluation;
