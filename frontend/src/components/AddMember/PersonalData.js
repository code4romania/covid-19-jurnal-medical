import { Input, ListHeader, Select } from "@code4ro/taskforce-fe-components";
import React from "react";
import { options } from "./options";
import PropTypes from "prop-types";

export const PersonalData = ({
  userData,
  setUserDataField,
  showRelationship
}) => (
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
        type="tel"
        label={"Număr de telefon"}
        name="phoneNumber"
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
      <Select
        placeholder="Judet"
        options={options.county}
        selectProps={{
          required: true,
          name: "county",
          onChange: ({ currentTarget: { selectedIndex } }) => {
            setUserDataField("county", options.county[selectedIndex].value);
          }
        }}
      />
      <Select
        placeholder="Localitate"
        options={options.city}
        selectProps={{
          required: true,
          name: "city",
          onChange: ({ currentTarget: { selectedIndex } }) => {
            setUserDataField("city", options.city[selectedIndex].value);
          }
        }}
      />
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

PersonalData.propTypes = {
  userData: PropTypes.object.isRequired,
  setUserDataField: PropTypes.func.isRequired,
  showRelationship: PropTypes.bool.isRequired
};

export default PersonalData;
