import { ListHeader } from "@code4ro/taskforce-fe-components";
import SelectList from "../SelectList";
import { options } from "./options";
import React from "react";
import PropTypes from "prop-types";

const Health = ({ userData, setUserDataField }) => (
  <>
    <ListHeader title="II. Date despre starea ta de sănătate" />
    <ListHeader title="Ești fumător?" />
    <SelectList
      options={options.yesNo}
      name="smoker"
      required={true}
      value={[userData.smoker]}
      onChange={([value]) => setUserDataField("smoker", value)}
    />
    <ListHeader title="Ți-a spus vreun medic că ai oricare dintre următoarele afecțiuni?" />
    <SelectList
      options={options.preexistingMedicalCondition}
      name="preexistingMedicalCondition"
      value={userData.preexistingMedicalCondition}
      multiple={true}
      onChange={value => {
        setUserDataField("preexistingMedicalCondition", value);
      }}
    />
  </>
);

Health.propTypes = {
  userData: PropTypes.object.isRequired,
  setUserDataField: PropTypes.func.isRequired
};

export default Health;
