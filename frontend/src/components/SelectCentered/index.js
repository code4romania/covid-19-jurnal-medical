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

  // a bit meta I know! But IE 11 doesn't support CSS.supports
  // however it supports text-align-last hence why when CSS.supports
  // is not supported it does the default behaviour
  const cssSupportsSupported = CSS ? CSS.supports : false;

  if (!cssSupportsSupported) {
    return select();
  }
  const textCenteredByDefault = CSS.supports("text-align-last", "center");

  if (textCenteredByDefault) {
    return select();
  } else {
    const selected = options.find(option => option.selected);
    return (
      <label className="center-select">
        {select()}
        <span className="text">{selected ? selected.text : placeholder}</span>
      </label>
    );
  }
};

export default SelectCentered;
