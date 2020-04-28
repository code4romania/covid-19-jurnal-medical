import { ListHeader } from "@code4ro/taskforce-fe-components";
import SelectList from "../SelectList";
import React from "react";
import { options } from "./options";
import PropTypes from "prop-types";

const toArrayOfStringValues = value => (value ? [String(value)] : []);

const Context = ({ userData, setUserDataField, titles }) => (
  <>
    <ListHeader title={titles.header} />
    <ListHeader title={titles.quarantineStatus} />
    <SelectList
      options={options.quarantineStatus}
      name="quarantineStatus"
      value={toArrayOfStringValues(userData.quarantineStatus)}
      onChange={([value]) => setUserDataField("quarantineStatus", +value)}
    />
    <ListHeader title={titles.livesWithOthersStatus} />
    <SelectList
      options={options.yesNo}
      name="livesWithOthers"
      value={[userData.livesWithOthers]}
      onChange={([value]) => setUserDataField("livesWithOthers", value)}
    />
    {userData.livesWithOthers && (
      <div>
        <ListHeader title="Celelalte persoane se află în izolare la domiciliu?" />
        <SelectList
          options={options.quarantineStatus}
          name="quarantineStatusOthers"
          value={toArrayOfStringValues(userData.quarantineStatusOthers)}
          onChange={([value]) =>
            setUserDataField("quarantineStatusOthers", +value)
          }
        />
      </div>
    )}
  </>
);

Context.propTypes = {
  userData: PropTypes.object.isRequired,
  setUserDataField: PropTypes.func.isRequired,
  titles: PropTypes.shape({
    header: PropTypes.string.isRequired,
    quarantineStatus: PropTypes.string.isRequired,
    livesWithOthersStatus: PropTypes.string.isRequired
  })
};

export default Context;
