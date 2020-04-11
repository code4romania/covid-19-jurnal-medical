import { ListHeader } from "@code4ro/taskforce-fe-components";
import SelectList from "../SelectList";
import React from "react";
import { options } from "./options";
import PropTypes from "prop-types";

const Context = ({ userData, setUserDataField, titles }) => (
  <>
    <ListHeader title={titles.header} />
    <ListHeader title={titles.quarantineStatus} />
    <SelectList
      options={options.quarantineStatus}
      name="quarantineStatus"
      value={[userData.quarantineStatus.toString()]}
      onChange={([value]) => setUserDataField("quarantineStatus", +value)}
    />
    <ListHeader title={titles.livesWithOthersStatus} />
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
  setUserDataField: PropTypes.func.isRequired,
  titles: {
    header: PropTypes.string.isRequired,
    quarantineStatus: PropTypes.string.isRequired,
    livesWithOthersStatus: PropTypes.string.isRequired
  }
};

export default Context;
