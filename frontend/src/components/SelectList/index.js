import React, { useState } from "react";
import PropTypes from "prop-types";
import "./SelectList.scss";

const SelectList = ({ options, multiple = false, onChange }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const selectItem = item => {
    let nextState = null;
    if (selectedItems.includes(item)) {
      nextState = selectedItems.filter(selectedItem => selectedItem !== item);
      setSelectedItems(nextState);
      onChange(nextState);
      return;
    }
    nextState = [...(multiple ? selectedItems : []), item];
    setSelectedItems(nextState);
    onChange(nextState);
  };

  return (
    <div className="select-list">
      {options.map(option => {
        return (
          <div
            key={`__select_option_${option.value}__${option.text}`}
            className={`select-option ${
              selectedItems.includes(option.value) ? "selected" : ""
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
  options: PropTypes.array,
  multiple: PropTypes.bool,
  onChange: PropTypes.func
};

export default SelectList;
