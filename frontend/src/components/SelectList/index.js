import React from "react";
import PropTypes from "prop-types";
import "./SelectList.scss";

const SelectList = ({ name, options, value, multiple = false, onChange }) => {
  const selectItem = item => {
    const items = value.includes(item)
      ? value.filter(selectedItem => !multiple || selectedItem !== item)
      : [...(multiple ? value : []), item];
    onChange(items);
  };

  return (
    <div className="select-list">
      {options.map(option => {
        return (
          <div
            key={`${name}__select_option_${option.value}__${option.text}`}
            className={`select-option ${
              value.includes(option.value) ? "selected" : ""
            }`}
            onClick={() => selectItem(option.value)}
          >
            {option.text}
          </div>
        );
      })}
    </div>
  );
};

SelectList.propTypes = {
  options: PropTypes.array.isRequired,
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func
};

export default SelectList;
