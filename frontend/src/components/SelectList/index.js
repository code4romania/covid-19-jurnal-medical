import React from "react";
import PropTypes from "prop-types";
import "./SelectList.scss";

const SelectList = ({ name, options, value, multiple = false, onChange }) => {
  const mutuallyExclusiveValues = options
    .filter(option => option.mutuallyExclusive)
    .map(option => option.value);

  const unselectItem = item =>
    value.filter(selectedItem => !multiple || selectedItem !== item);

  const unselectMutuallyExclusiveItems = () =>
    value.filter(selectItem => !mutuallyExclusiveValues.includes(selectItem));

  const selectItem = item => [
    ...(multiple ? unselectMutuallyExclusiveItems() : []),
    item
  ];

  const handleClick = option => {
    const item = option.value;
    const isSelected = value.includes(item);

    if (option.mutuallyExclusive) {
      onChange(isSelected ? [] : [item]);
    } else {
      onChange(isSelected ? unselectItem(item) : selectItem(item));
    }
  };

  return (
    <div className="select-list" data-testid={name}>
      {options.map(option => {
        return (
          <div
            key={`${name}__select_option_${option.value}__${option.text}`}
            className={`select-option ${
              value.includes(option.value) ? "selected" : ""
            }`}
            onClick={() => handleClick(option)}
          >
            {option.text}
          </div>
        );
      })}
    </div>
  );
};

SelectList.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
      ]).isRequired,
      text: PropTypes.string.isRequired,
      mutuallyExclusive: PropTypes.bool
    })
  ).isRequired,
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SelectList;
