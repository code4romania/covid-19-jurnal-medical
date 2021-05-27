import { ListHeader } from "@code4ro/taskforce-fe-components";
import SelectList from "../SelectList";
import { mapPreExistMedCondValues } from "../../utils";
import { options } from "./options";
import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Health = ({ userData, setUserDataField, titles }) => {
  // TODO: We need to rethink a bit on how to
  // properly do the data mapping for this component
  useEffect(() => {
    if (userData.preexistingMedicalCondition) {
      const data = mapPreExistMedCondValues(
        userData.preexistingMedicalCondition
      );
      setUserDataField("preexistingMedicalCondition", data);
    }
  }, []); // eslint-disable-line

  return (
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
        value={userData.preexistingMedicalCondition || []}
        multiple={true}
        onChange={value => {
          setUserDataField("preexistingMedicalCondition", value);
        }}
      />
    </>
  );
};

Health.propTypes = {
  userData: PropTypes.object.isRequired,
  setUserDataField: PropTypes.func.isRequired,
  titles: PropTypes.shape({
    healthInfo: PropTypes.string.isRequired,
    smoker: PropTypes.string.isRequired,
    preexistingConditions: PropTypes.string.isRequired
  })
};

export default Health;
