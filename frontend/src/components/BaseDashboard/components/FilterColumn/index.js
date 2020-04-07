import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./FilterColumn.scss";
import useOutsideClick from "../../../useOutsideClick";

const FilterColumn = ({ name, values, handleSelect, selectedValues }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const ref = useRef();
  values = values = values.filter((x, i, a) => a.indexOf(x) === i);

  useOutsideClick(ref, () => setIsVisible(false));

  useEffect(() => {
    setSearchResults((values = values.filter((x, i, a) => a.indexOf(x) === i)));
  }, []);

  useEffect(() => {
    setSearchResults(
      values.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

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
        <img src={require("../../../../images/filter-icon.svg")} alt="" />
      </button>
      <div className={["searchBox", isVisible ? "isVisible" : ""].join(" ")}>
        <input type="text" placeholder={name} onChange={handleChange} />
        <ul>
          {searchResults.length > 0
            ? searchResults.map((value, index) => (
                <li key={index} onClick={() => handleSelect(value)}>
                  {value}
                  {selectedValues.includes(value) && <span>&#10003;</span>}
                </li>
              ))
            : "Nici un rezultat"}
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
