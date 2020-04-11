import { ListHeader } from "@code4ro/taskforce-fe-components";
import SelectList from "../SelectList";
import React from "react";
import { options } from "./options";
import PropTypes from "prop-types";

const Context = ({ userData, setUserDataField }) => (
  <>
    <ListHeader title="III. Date despre contextul în care te afli" />
    <ListHeader title="În momentul de față te afli în izolare la domiciliu?" />
    <SelectList
      options={options.quarantineStatus}
      name="quarantineStatus"
      value={[userData.quarantineStatus.toString()]}
      onChange={([value]) => setUserDataField("quarantineStatus", +value)}
    />
    <ListHeader title="În momentul de față împarți locuința și cu alte persoane?" />
    <SelectList
      options={options.yesNo}
      name="livesWithOthers"
      value={[userData.livesWithOthers]}
      onChange={([value]) => setUserDataField("livesWithOthers", value)}
    />
    <ListHeader title="Celelalte persoane se află în izolare la domiciliu?" />
    <SelectList
      options={options.quarantineStatus}
      name="quarantineStatusOther"
      value={[userData.quarantineStatusOther.toString()]}
      onChange={([value]) => setUserDataField("quarantineStatusOther", +value)}
    />
  </>
);

Context.propTypes = {
  userData: PropTypes.object.isRequired,
  setUserDataField: PropTypes.func.isRequired
};

export default Context;
