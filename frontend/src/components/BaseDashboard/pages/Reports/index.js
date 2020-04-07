import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import FilterColumn from "../../components/FilterColumn";
import useTableFilter from "../../components/FilterColumn/use-table-filter";

const DATA = [
  {
    data: "14.03.2020",
    ora: "13:00",
    destinatar: "Directia de Sanatate Publica - Tulcea"
  },
  {
    data: "14.03.2020",
    ora: "11:00",
    destinatar: "Directia de Sanatate Publica - Tulcea"
  },
  {
    data: "13.03.2020",
    ora: "10:00",
    destinatar: "Directia de Sanatate Publica - Tulcea"
  },
  {
    data: "12.03.2020",
    ora: "11:00",
    destinatar: "Directia de Sanatate Publica - Tulcea"
  },
  {
    data: "12.03.2020",
    ora: "13:00",
    destinatar: "Directia de Sanatate Publica - Tulcea"
  },
  {
    data: "14.03.2020",
    ora: "13:00",
    destinatar: "Directia de Sanatate Publica - Tulcea"
  },
  {
    data: "14.03.2020",
    ora: "14:00",
    destinatar: "Spitalul municipal Bucuresti"
  },
  {
    data: "14.03.2020",
    ora: "11:00",
    destinatar: "Spitalul municipal Bucuresti"
  },
  {
    data: "14.03.2020",
    ora: "10:00",
    destinatar: "Directia de Sanatate Publica - Cluj-Napoca"
  }
];

const NotFound = () => (
  <Tr>
    <Td colSpan={5} align="center">
      Not found
    </Td>
  </Tr>
);

const Reports = () => {
  const { data, requestFilter, filters } = useTableFilter(DATA, null);

  const getRowData = (rowData, index) => (
    <Tr key={index}>
      <Td>{rowData.data}</Td>
      <Td>{rowData.ora}</Td>
      <Td>{rowData.destinatar}</Td>
      <Td>
        <button className="resend-button">@ Retrimite</button>
      </Td>
    </Tr>
  );

  return (
    <div className="dashboard-box">
      <h3 className="mb-20">
        <strong>Rapoarte transmise</strong>
      </h3>
      <Table className="table danger-table bordered">
        <Thead>
          <Tr>
            <Th>
              <FilterColumn
                name="Data"
                values={DATA.map(data => data.data)}
                selectedValues={filters["data"]}
                handleSelect={value => requestFilter("data", value)}
              />
            </Th>
            <Th>
              <FilterColumn
                name="Ora"
                values={DATA.map(data => data.ora)}
                selectedValues={filters["ora"]}
                handleSelect={value => requestFilter("ora", value)}
              />
            </Th>
            <Th style={{ width: "35%" }}>
              <FilterColumn
                name="Destinatar"
                values={DATA.map(data => data.destinatar)}
                selectedValues={filters["destinatar"]}
                handleSelect={value => requestFilter("destinatar", value)}
              />
            </Th>
            <Th className="border-0" />
          </Tr>
        </Thead>
        <Tbody>
          {data.length > 0 ? (
            data.map((rowData, index) => getRowData(rowData, index))
          ) : (
            <NotFound />
          )}
        </Tbody>
      </Table>
    </div>
  );
};

export default Reports;
