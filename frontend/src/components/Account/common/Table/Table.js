import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";
import "./Table.scss";

const Table = ({ dataRows, headers, title }) => {
  if (!dataRows || !Object.keys(dataRows).length) {
    return <div> Nu exista date</div>;
  }

  const renderRow = item => {
    return (
      <tr key={item.id}>
        {Object.keys(item).map((key, index) => {
          if (key === "date") {
            return (
              <td key={index}>
                {format(fromUnixTime(item.date), "dd.MM.yyyy / HH:mm")}
              </td>
            );
          }
          return <td key={index}>{item[key]}</td>;
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
            {headers.length && headers.map(item => <th key={item}>{item}</th>)}
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
