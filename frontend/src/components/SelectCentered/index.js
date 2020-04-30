import { Select } from "@code4ro/taskforce-fe-components";
import "./selectCentered.scss";

import React from "react";

const SelectCentered = ({
  label,
  description,
  options,
  selectProps,
  defaultValue,
  placeholder
}) => {
  //todo meta: what is CSS.supports is not supported??
  const worksByDefault = CSS.supports("text-align-last", "center");
  const select = () => {
    return (
      <Select
        placeholder={placeholder}
        label={label}
        description={description}
        options={options}
        selectProps={selectProps}
        defaultValue={defaultValue}
      />
    );
  };
  if (worksByDefault) {
    return select();
  } else {
    const selected = options.find(option => option.selected);
    return (
      <label className="center-select">
        {select()}
        <span className="center-select__text">
          {selected ? selected.text : placeholder}
        </span>
      </label>
    );
  }
};

export default SelectCentered;
