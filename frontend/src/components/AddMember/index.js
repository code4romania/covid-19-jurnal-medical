import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AddMember.scss";
import { Button } from "@code4ro/taskforce-fe-components";
import ProfileApi from "../../api/profileApi";
import PersonalData from "./PersonalData";
import Health from "./Health";
import Context from "./Context";
import SidebarLayout from "../SidebarLayout";
import { options } from "./options";
import { useHistory } from "react-router-dom";
import titles from "./titles";

export const ProfileForm = ({ sendResults, forYourself }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({});

  const fieldsForYourself = [
    {
      name: "name",
      required: true
    },
    {
      name: "surname",
      required: true
    },
    {
      name: "phoneNumber",
      required: true
    },
    {
      name: "age",
      required: true
    },
    {
      name: "gender",
      required: true
    },
    {
      name: "county",
      required: true
    },
    {
      name: "city",
      required: true
    }
  ];
  const fieldsForDependant = [
    {
      name: "name",
      required: true
    },
    {
      name: "surname",
      required: true
    },
    {
      name: "phoneNumber",
      required: false
    },
    {
      name: "age",
      required: true
    },
    {
      name: "gender",
      required: true
    },
    {
      name: "county",
      required: true
    },
    {
      name: "city",
      required: true
    },
    {
      name: "relationshipType",
      required: false
    }
];
  const personalFields = forYourself ? fieldsForYourself : fieldsForDependant;

  const healthFields = [
    {
      name: "smoker",
      required: true
    },
    { 
      name: "preexistingMedicalCondition",
      required: true
    }
  ];

  const contextFields = [
    {
      name: "livesWithOthers",
      required: true
    },
    {
      name: "quarantineStatus",
      required: true
    },
    {
      name: "quarantineStatusOthers",
      required: true
    }
  ];

  const fieldsCompleted = fields => {
    return fields.filter(field => field.required && userData[field.name] === undefined).length === 0;
  };

  const canGoNext = () => {
    if (currentStep === 1 && fieldsCompleted(personalFields)) {
      return true;
    }

    if (currentStep === 2 && fieldsCompleted(healthFields)) {
      return true;
    }

    if (currentStep === 3 && fieldsCompleted(contextFields)) {
      return true;
    }

    return false;
  };
  const setUserDataField = (field, value) => {
    setUserData({
      ...userData,
      [field]: value
    });
  };

  const mapExistingConditions = userData => {
    return {
      ...userData,
      preexistingMedicalCondition: userData.preexistingMedicalCondition
        .map(
          key =>
            options.preexistingMedicalCondition.find(x => x.value === key).text
        )
        .join(", ")
    };
  };

  const nextStepHandler = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      if (forYourself) {
        delete userData["relationType"];
      }

      if (userData.smoker === null) {
        userData.smoker = false;
      }

      if (userData.livesWithOthers === null) {
        userData.livesWithOthers = false;
      }

      sendResults(mapExistingConditions(userData));
    }
  };

  const submitForm = e => {
    e.preventDefault();
    nextStepHandler();
  };

  const titlesForForm = forYourself ? titles.forYourself : titles.forOthers;
  return (
    <form onSubmit={submitForm} className="user-profile-form">
      {currentStep === 1 && (
        <PersonalData
          userData={userData}
          setUserDataField={setUserDataField}
          isForFamilyMember={!forYourself}
        />
      )}
      {currentStep === 2 && (
        <Health
          userData={userData}
          setUserDataField={setUserDataField}
          titles={titlesForForm.health}
        />
      )}
      {currentStep === 3 && (
        <Context
          userData={userData}
          setUserDataField={setUserDataField}
          titles={titlesForForm.context}
        />
      )}

      <Button type="warning" inputType="submit" disabled={!canGoNext()}>
        Continuă
      </Button>
    </form>
  );
};

const AddMember = () => {
  const history = useHistory();

  const sendResults = userData => {
    ProfileApi.addDependant(userData).then(() => history.push("/account/me"));
  };

  return (
    <SidebarLayout>
      <ProfileForm sendResults={sendResults} forYourself={false} />
    </SidebarLayout>
  );
};

ProfileForm.propTypes = {
  sendResults: PropTypes.func.isRequired,
  forYourself: PropTypes.bool.isRequired
};

export default AddMember;
