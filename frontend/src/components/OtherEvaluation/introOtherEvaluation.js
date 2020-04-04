import React, { useEffect, useState } from "react";
import { Button, Select } from "@code4ro/taskforce-fe-components";
import PropTypes from "prop-types";
import EvaluationApi from "../../api/EvaluationApi";

const IntroOtherEvaluation = ({ onFinish }) => {
  useEffect(() => {
    EvaluationApi.getDependants().then(members => {
      setDependants(members);
      setSelectedMember(members[0]);
    });
  });

  const [dependants, setDependants] = useState([]);
  const [selectedMember, setSelectedMember] = useState(undefined);
  let onChange = event => {
    setSelectedMember(event.target.value);
  };

  const props = {
    onChange: function(el) {
      setSelectedMember(el.target.value);
    }
  };

  const options = dependants.map(dependant => {
    return {
      text: dependant,
      value: dependant,
      selected: dependant === selectedMember
    };
  });

  return (
    <div>
      <Select
        label={"Alege persoana pentru care faci formularul"}
        options={options}
        onChange={onChange}
        selectProps={props}
      />
      <Button onClick={() => onFinish(selectedMember)}>
        Completeaza formularul
      </Button>
    </div>
  );
};

export default IntroOtherEvaluation;

IntroOtherEvaluation.propTypes = {
  onFinish: PropTypes.func.isRequired
};
