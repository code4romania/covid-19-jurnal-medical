import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";
import "./Table.scss";

const formatCell = (key, value) => {
  if (key === "date") {
    return format(fromUnixTime(value), "dd.MM.yyyy / HH:mm");
  }

  if (value === true || value === false) {
    return value ? "Da" : "Nu";
  }

  return value;
};

const Table = ({ dataRows, headers, title }) => {
  if (!dataRows || !Object.keys(dataRows).length) {
    return <div> Nu exista date</div>;
  }

  const renderRow = (item, itemIndex) => {
    return (
      <tr key={itemIndex}>
        {headers.map((header, index) => {
          return (
            <td key={index}>{formatCell(header.field, item[header.field])}</td>
          );
        })}
      </tr>
    );
  };

  return (
    <div className="table-container">
      {title && <h2 className="header subheader">{title}</h2>}
      <table className="table">
        <thead>
          <tr>
            {headers.length &&
              headers.map(item => <th key={item.label}>{item.label}</th>)}
          </tr>
        </thead>
        <tbody>{dataRows.map(renderRow)}</tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  dataRows: PropTypes.array,
  headers: PropTypes.array,
  title: PropTypes.string
};

export default Table;
