import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AddMember.scss";
import { Button } from "@code4ro/taskforce-fe-components";
import ProfileApi from "../../api/profileApi";
import PersonalData from "./PersonalData";
import Health from "./Health";
import Context from "./Context";
import { options } from "./options";
import { useHistory } from "react-router-dom";

const AddMember = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
    relationshipType: 0,
    age: 0,
    gender: 0,
    smoker: false,
    preexistingMedicalCondition: [],
    livesWithOthers: false,
    quarantineStatus: 0,
    quarantineStatusOther: 0
  });
  const history = useHistory();

  const setUserDataField = (field, value) => {
    setUserData({
      ...userData,
      [field]: value
    });
  };

  const nextStepHandler = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      ProfileApi.addDependant({
        ...userData,
        preexistingMedicalCondition: userData.preexistingMedicalCondition
          .map(
            key =>
              options.preexistingMedicalCondition.find(x => x.value === key)
                .text
          )
          .join(", ")
      }).then(() => history.push("/account/me"));
    }
  };

  const submitForm = e => {
    e.preventDefault();
    nextStepHandler();
  };

  return (
    <form onSubmit={submitForm} className="user-profile-form">
      {currentStep === 1 && (
        <PersonalData userData={userData} setUserDataField={setUserDataField} />
      )}
      {currentStep === 2 && (
        <Health userData={userData} setUserDataField={setUserDataField} />
      )}
      {currentStep === 3 && (
        <Context userData={userData} setUserDataField={setUserDataField} />
      )}

      <Button type="warning" inputType="submit">
        Continuă
      </Button>
    </form>
  );
};

AddMember.propTypes = {
  evaluateCallback: PropTypes.func
};

export default AddMember;
