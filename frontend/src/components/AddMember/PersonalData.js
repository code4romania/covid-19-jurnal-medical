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
  showRelationship
}) => {
  const getCitiesFor = county =>
    county ? cities[county].map(city => ({ label: city, value: city })) : [];

  return (
    <>
      <ListHeader title="I. Date personale" />
      <div className="user-profile-form-container">
        <Input
          type="text"
          label={"Nume"}
          name="nume"
          required
          usePlaceholder
          value={userData.name}
          onChange={({ currentTarget: { value } }) => {
            setUserDataField("name", value);
          }}
        />
        <Input
          type="text"
          label={"Prenume"}
          name="surname"
          required
          usePlaceholder
          value={userData.surname}
          onChange={({ currentTarget: { value } }) => {
            setUserDataField("surname", value);
          }}
        />
        <Input
          label={"Număr de telefon"}
          name="phoneNumber"
          type="tel"
          pattern="00[0-9]*"
          title="00xxxxxxxxxx - doar cifre"
          minLength="10"
          maxLength="13"
          required
          usePlaceholder
          value={userData.phoneNumber}
          onChange={({ currentTarget: { value } }) => {
            setUserDataField("phoneNumber", value);
          }}
        />
        {showRelationship && (
          <Select
            placeholder="Tip de relație"
            options={options.relation}
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
            title={"Judet"}
            options={options.county}
            onSelect={option => {
              setUserDataField("county", option.value);
            }}
          />
        </div>
        <div className={"field"}>
          <DropdownSearch
            title={"Localitatea"}
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
          required
          usePlaceholder
          value={userData.age}
          step={1}
          min="0"
          max="120"
          onChange={({ currentTarget: { value } }) => {
            setUserDataField("age", +value);
          }}
        />
        <Select
          placeholder="Genul"
          options={options.gender}
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
  showRelationship: PropTypes.bool.isRequired
};

export default PersonalData;
