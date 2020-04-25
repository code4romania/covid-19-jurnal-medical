import {
  Input,
  ListHeader,
  Select,
  DropdownSearch
} from "@code4ro/taskforce-fe-components";
import React from "react";
import { options } from "./options";
import PropTypes from "prop-types";
import cities from "./cities.json";

export const PersonalData = ({
  userData,
  setUserDataField,
  isForFamilyMember
}) => {
  const getCitiesFor = county =>
    county ? cities[county].map(city => ({ label: city, value: city })) : [];

  const selectOption = (options, value) => {
    return options.map(option => {
      return {
        value: option.value,
        text: option.text,
        selected: (option.selected = +option.value === value)
      };
    });
  };

  const nameValidationMessages = {
    patternMismatch: "Acest camp poate contine doar caractere alfanumerice",
    valueMissing: "Acest camp este obligatoriu"
  };

  const phoneValidationMessages = {
    patternMismatch:
      "Va rog introduceti un numar de telefon valid (07xxxxxxxx sau 00xxxxxxxxxx - doar cifre)",
    valueMissing: "Acest camp este obligatoriu",
    tooShort: "Acest camp trebuie sa contina minim 10 caractere"
  };

  const ageValidationMessages = {
    rangeOverflow: "Valoarea trebuie sa fie mai mica sau egala cu 120",
    rangeUnderflow: "Valoarea trebuie sa fie mai mare sau egala cu 0",
    valueMissing: "Acest camp este obligatoriu",
    stepMismatch: "Valoarea trebuie sa fie un numar intreg"
  };

  return (
    <>
      <ListHeader title="I. Date personale" />
      <div className="user-profile-form-container">
        <Input
          type="text"
          label={"Nume"}
          name="nume"
          title="Nume"
          validationMessages={nameValidationMessages}
          required
          pattern="[A-Za-z ]{1,32}"
          usePlaceholder
          value={userData.name}
          defaultValue={userData.name}
          onChange={({ currentTarget: { value } }) => {
            setUserDataField("name", value);
          }}
        />
        <Input
          type="text"
          label={"Prenume"}
          name="surname"
          title="Prenume"
          required
          pattern="[A-Za-z ]{1,32}"
          validationMessages={nameValidationMessages}
          usePlaceholder
          value={userData.surname}
          defaultValue={userData.surname}
          onChange={({ currentTarget: { value } }) => {
            setUserDataField("surname", value);
          }}
        />
        <Input
          label={"Număr de telefon"}
          name="phoneNumber"
          type="tel"
          pattern="(?:00|07)[0-9]*"
          title="07xxxxxxxx sau 00xxxxxxxxxx - doar cifre"
          validationMessages={phoneValidationMessages}
          minLength="10"
          maxLength="13"
          required={!isForFamilyMember}
          usePlaceholder
          value={userData.phoneNumber}
          defaultValue={userData.phoneNumber}
          onChange={({ currentTarget: { value } }) => {
            setUserDataField("phoneNumber", value);
          }}
        />
        {isForFamilyMember && (
          <Select
            placeholder="Tip de relație"
            options={selectOption(options.relation, userData.relationshipType)}
            selectProps={{
              required: true,
              name: "relationshipType",
              onChange: ({ currentTarget: { selectedIndex } }) => {
                setUserDataField("relationshipType", selectedIndex);
              }
            }}
          />
        )}
        <div className={"field"}>
          <DropdownSearch
            title={"Județ"}
            options={options.county}
            onSelect={option => {
              setUserDataField("county", option.value);
            }}
          />
        </div>
        <div className={"field"}>
          <DropdownSearch
            title={"Localitate"}
            options={getCitiesFor(userData.county)}
            onSelect={option => {
              setUserDataField("city", option.value);
            }}
          />
        </div>

        <Input
          type="number"
          label={"Vârstă în ani împliniți"}
          name="age"
          title="Vârstă"
          required
          validationMessages={ageValidationMessages}
          usePlaceholder
          value={userData.age}
          defaultValue={userData.age}
          step={1}
          min={0}
          max={120}
          onChange={({ currentTarget: { value } }) => {
            setUserDataField("age", +value);
          }}
        />
        <Select
          placeholder="Gen"
          options={selectOption(options.gender, userData.gender)}
          selectProps={{
            required: true,
            name: "gender",
            onChange: ({ currentTarget: { selectedIndex } }) => {
              setUserDataField("gender", selectedIndex);
            }
          }}
        />
      </div>
    </>
  );
};

PersonalData.propTypes = {
  userData: PropTypes.object.isRequired,
  setUserDataField: PropTypes.func.isRequired,
  isForFamilyMember: PropTypes.bool.isRequired
};

export default PersonalData;
