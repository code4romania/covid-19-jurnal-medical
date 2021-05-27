import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./FilterColumn.scss";
import useOutsideClick from "../../../useOutsideClick";
import { ReactComponent as FilterSvg } from "../../../../images/filter-icon.svg";

const FilterColumn = ({ name, values, handleSelect, selectedValues }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const ref = useRef();
  useOutsideClick(ref, () => setIsVisible(false));
  useEffect(() => {
    setSearchResults(
      values
        .filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((x, i, a) => a.indexOf(x) === i)
    );
  }, [searchTerm, values]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="filterColumn" ref={ref}>
      <span>{name}</span>{" "}
      <button
        className="filter-buttom"
        onClick={() => setIsVisible(!isVisible)}
      >
        <FilterSvg />
      </button>
      <div className={["searchBox", isVisible ? "isVisible" : ""].join(" ")}>
        <input type="text" placeholder={name} onChange={handleChange} />
        <ul>
          {searchResults.length > 0
            ? searchResults.map(value => (
                <li key={value} onClick={() => handleSelect(value)}>
                  {value}
                  {selectedValues && selectedValues.includes(value) && (
                    <span className="approve-icon" />
                  )}
                </li>
              ))
            : "Niciun rezultat"}
        </ul>
      </div>
    </div>
  );
};

FilterColumn.propTypes = {
  name: PropTypes.string,
  values: PropTypes.array,
  selectedValues: PropTypes.array,
  handleSelect: PropTypes.func
};

export default FilterColumn;
