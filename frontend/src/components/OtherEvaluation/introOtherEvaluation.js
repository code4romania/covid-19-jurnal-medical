import React, { useEffect, useState } from "react";
import { Select } from "@code4ro/taskforce-fe-components";
import PropTypes from "prop-types";
import ProfileApi from "../../api/profileApi";
import StartFormButton from "../Evaluation/startFormButton";

const IntroOtherEvaluation = ({ onFinish }) => {
  const [dependants, setDependants] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    ProfileApi.getDependants().then(members => {
      setDependants(members);

      if (members.length > 0) {
        setSelectedMember(members[0].id);
      }
    });
  }, []);

  const props = {
    onChange: event => setSelectedMember(event.target.value),
    defaultValue: String(selectedMember)
  };

  if (dependants === null) {
    return <div>Formularul se incarca</div>;
  }

  if (dependants.length === 0) {
    return <div>Nu aveti dependenti pentru care sa completati formulare</div>;
  }

  const options = dependants.map(dependant => {
    return {
      text: `${dependant.name} ${dependant.surname}`,
      value: String(dependant.id)
    };
  });

  return (
    <div>
      <Select
        label={"Alege persoana pentru care faci formularul"}
        options={options}
        selectProps={props}
      />
      <StartFormButton onClick={() => onFinish(selectedMember)} />
    </div>
  );
};

export default IntroOtherEvaluation;

IntroOtherEvaluation.propTypes = {
  onFinish: PropTypes.func.isRequired
};
