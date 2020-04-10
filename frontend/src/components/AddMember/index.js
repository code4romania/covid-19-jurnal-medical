import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AddMember.scss";
import {
  Button,
  Input,
  ListHeader,
  Select
} from "@code4ro/taskforce-fe-components";
import ProfileApi from "../../api/profileApi";
import SelectList from "../SelectList";

const AddMember = ({
  sendResults = userData => ProfileApi.addDependant(userData),
  forYourself = false,
  titles = {
    healthInfo: "II. Date despre starea lor de sănătate",
    smoker: "Este fumător?",
    preexistingConditions:
      "I-a spus vreun medic că are oricare dintre următoarele afecțiuni?",
    context: "III. Date despre contextul în care se află",
    quarantineStatus: "În momentul de față se află în izolare la domiciliu?",
    livesWithOthersStatus:
      "În momentul de față împarte locuința și cu alte persoane?"
  }
}) => {
  const options = {
    gender: [
      { key: "", text: "Genul", disabled: true, selected: true },
      { key: "1", text: "Feminin" },
      { key: "2", text: "Masculin" }
    ],
    county: [
      { key: "", text: "Judet", disabled: true, selected: true },
      { key: "1", text: "București" }
    ],
    relation: [
      { value: "-1", text: "Tip relație", disabled: true, selected: true },
      { value: "0", text: "Părinte" },
      { value: "1", text: "Copil" },
      { value: "2", text: "Bunic\\Bunică" },
      { value: "3", text: "Vecin\\Vecină" },
      { value: "4", text: "Altele" }
    ],
    city: [
      { key: "", text: "Localitate", disabled: true, selected: true },
      { key: "1", text: "București" }
    ],
    yesNo: [
      { value: true, text: "Da" },
      { value: false, text: "Nu" }
    ],
    preexistingMedicalCondition: [
      {
        value: "1",
        text: "O boală de inimă (boală cardiovasculară, înclusiv hipertensiune"
      },
      { value: "2", text: "Diabet" },
      { value: "3", text: "O boală a plămânilor" },
      { value: "4", text: "Cancer" },
      { value: "5", text: "Altă boală cronică" }
    ],
    quarantineStatus: [
      { value: "1", text: "Da, sunt în izolare, nu ies deloc din locuință" },
      {
        value: "2",
        text: "Stau mai mult pe acasă, dar mai ies atunci când este nevoie"
      },
      {
        value: "3",
        text: "Nu sunt în izolare și ies din locuință după program normal"
      },
      {
        value: "4",
        text: "Altă situație"
      }
    ]
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
    relationType: 0,
    age: 0,
    gender: 0,
    smoker: false,
    preexistingMedicalCondition: "",
    livesWithOthers: false,
    quarantineStatus: 0,
    quarantineStatusOther: 0
  });

  const setUserDataField = (field, value) => {
    setUserData({
      ...userData,
      [field]: value
    });
  };

  const submitForm = e => {
    // TODO: submit the form when endpoint available
    e.preventDefault();
  };

  const personalDataForm = (
    <>
      <ListHeader title="I. Date personale"></ListHeader>
      <div className="user-profile-form-container">
        <Input
          type="text"
          label={"Nume"}
          usePlaceholder
          defaultValue={userData.name}
          onChange={({ currentTarget: { value } }) => {
            setUserDataField("name", value);
          }}
        />
        <Input
          type="text"
          label={"Prenume"}
          usePlaceholder
          defaultValue={userData.surname}
          onChange={({ currentTarget: { value } }) => {
            setUserDataField("surname", value);
          }}
        />
        <Input
          type="text"
          label={"Număr de telefon"}
          usePlaceholder
          defaultValue={userData.phoneNumber}
          onChange={({ currentTarget: { value } }) => {
            setUserDataField("phoneNumber", value);
          }}
        />
        {!forYourself && (
          <Select
            placeholder="Tip de relație"
            options={options.relation}
            selectProps={{
              onChange: ({ currentTarget: { selectedIndex } }) => {
                setUserDataField("relationType", selectedIndex);
              }
            }}
          ></Select>
        )}
        <Select
          placeholder="Judet"
          options={options.county}
          selectProps={{
            onChange: ({ currentTarget: { selectedIndex } }) => {
              setUserDataField("county", String(selectedIndex));
            }
          }}
        ></Select>
        <Select
          placeholder="Localitate"
          options={options.city}
          selectProps={{
            onChange: ({ currentTarget: { selectedIndex } }) => {
              setUserDataField("city", String(selectedIndex));
            }
          }}
        ></Select>
        <Input
          type="number"
          label={"Vârstă în ani împliniți"}
          usePlaceholder
          value={userData.age}
          onChange={({ currentTarget: { value } }) => {
            setUserDataField("age", parseInt(value));
          }}
        />
        <Select
          placeholder="Genul"
          options={options.gender}
          selectProps={{
            onChange: ({ currentTarget: { selectedIndex } }) => {
              setUserDataField("gender", selectedIndex);
            }
          }}
        ></Select>
      </div>
    </>
  );

  const healthDataForm = (
    <>
      <ListHeader title={titles.healthInfo}></ListHeader>
      <ListHeader title={titles.smoker}></ListHeader>
      <SelectList
        options={options.yesNo}
        onChange={([value]) => setUserDataField("smoker", value)}
      ></SelectList>
      <ListHeader title={titles.preexistingConditions}></ListHeader>
      <SelectList
        options={options.preexistingMedicalCondition}
        multiple={true}
        onChange={value => {
          setUserDataField(
            "preexistingMedicalCondition",
            value
              .map(
                key =>
                  options.preexistingMedicalCondition.find(x => x.value === key)
                    .text
              )
              .join(", ")
          );
        }}
      ></SelectList>
    </>
  );
  const contextDataForm = (
    <>
      <ListHeader title={titles.context}></ListHeader>
      <ListHeader title={titles.quarantineStatus}></ListHeader>
      <SelectList
        options={options.quarantineStatus}
        onChange={value =>
          setUserDataField("quarantineStatus", parseInt(value, 10))
        }
      ></SelectList>
      <ListHeader title={titles.livesWithOthersStatus}></ListHeader>
      <SelectList
        options={options.yesNo}
        onChange={([value]) => setUserDataField("livesWithOthers", value)}
      ></SelectList>
      <ListHeader title="Celelalte persoane se află în izolare la domiciliu?"></ListHeader>
      <SelectList
        options={options.quarantineStatus}
        onChange={value =>
          setUserDataField("quarantineStatusOther", parseInt(value, 10))
        }
      ></SelectList>
    </>
  );
  const steps = [personalDataForm, healthDataForm, contextDataForm];

  const nextStepHandler = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      if (forYourself) {
        delete userData["relationType"];
      }
      sendResults(userData);
    }
  };

  return (
    <form className="user-profile-form" onSubmit={submitForm}>
      {steps[currentStep]}
      <Button type="button" onClick={nextStepHandler}>
        Continuă
      </Button>
    </form>
  );
};

AddMember.propTypes = {
  sendResults: PropTypes.func,
  forYourself: PropTypes.bool,
  titles: PropTypes.object
};

export default AddMember;
