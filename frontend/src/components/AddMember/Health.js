import { ListHeader } from "@code4ro/taskforce-fe-components";
import SelectList from "../SelectList";
import { options } from "./options";
import React from "react";
import PropTypes from "prop-types";

const Health = ({ userData, setUserDataField, titles }) => (
  <>
    <ListHeader title={titles.healthInfo} />
    <ListHeader title={titles.smoker} />
    <SelectList
      options={options.yesNo}
      name="smoker"
      required={true}
      value={[userData.smoker]}
      onChange={([value]) => setUserDataField("smoker", value)}
    />
    <ListHeader title={titles.preexistingConditions} />
    <SelectList
      options={options.preexistingMedicalCondition}
      name="preexistingMedicalCondition"
      value={
        userData.preexistingMedicalCondition
          ? userData.preexistingMedicalCondition
          : []
      }
      multiple={true}
      onChange={value => {
        setUserDataField("preexistingMedicalCondition", value);
      }}
    />
  </>
);

Health.propTypes = {
  userData: PropTypes.object.isRequired,
  setUserDataField: PropTypes.func.isRequired,
  titles: {
    healthInfo: PropTypes.string.isRequired,
    smoker: PropTypes.string.isRequired,
    preexistingConditions: PropTypes.string.isRequired
  }
};

export default Health;
