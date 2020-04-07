import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import FilterColumn from "../../components/FilterColumn";
import useTableFilter from "../../components/FilterColumn/use-table-filter";
import CircleArrow from "../../components/CircleArrow";
import DashboardWidgets from "../../components/DashboardWidgets";
import "./CazuriRedFlag.scss";

const DATA = [
  {
    loc: "Alba",
    varsta: "65",
    afectiuni_agravate: "Diabet",
    temperatura_ridicata: "Da",
    tuse_constante: "Da"
  },
  {
    loc: "Cluj",
    varsta: "55",
    afectiuni_agravate: "Hipertensiune",
    temperatura_ridicata: "Da",
    tuse_constante: "Nu"
  },
  {
    loc: "Bucuresti",
    varsta: "35",
    afectiuni_agravate: "Nu",
    temperatura_ridicata: "Nu",
    tuse_constante: "Nu"
  },
  {
    loc: "Iasi",
    varsta: "44",
    afectiuni_agravate: "Nu",
    temperatura_ridicata: "Da",
    tuse_constante: "Nu"
  },
  {
    loc: "Iasi",
    varsta: "54",
    afectiuni_agravate: "Diabet",
    temperatura_ridicata: "Da",
    tuse_constante: "Da"
  }
];

const NotFound = () => (
  <Tr>
    <Td colSpan={5} align="center">
      Not found
    </Td>
  </Tr>
);

const CazuriRedFlag = () => {
  const { data, requestFilter, filters } = useTableFilter(DATA, null);

  const getRowData = (rowData, index) => (
    <Tr key={index}>
      <Td>{rowData.loc}</Td>
      <Td>{rowData.varsta}</Td>
      <Td>{rowData.afectiuni_agravate}</Td>
      <Td>{rowData.temperatura_ridicata}</Td>
      <Td>{rowData.tuse_constante}</Td>
      <Td align="right">
        <CircleArrow type={"error"} />
      </Td>
    </Tr>
  );

  return (
    <>
      <DashboardWidgets />
      <div className="dashboard-box">
        <div className="table-header">
          <h3>
            <strong>Cazuri Red Flag</strong>
          </h3>
          <button className="resend-button">@ Trimite selectia</button>
        </div>
        <br />
        <Table className="dashboard-table table danger-table bordered">
          <Thead>
            <Tr>
              <Th>
                <FilterColumn
                  name="Loc"
                  values={DATA.map(data => data.loc)}
                  selectedValues={filters["loc"]}
                  handleSelect={value => requestFilter("loc", value)}
                />
              </Th>
              <Th>
                <FilterColumn
                  name="Varsta"
                  values={DATA.map(data => data.varsta)}
                  selectedValues={filters["varsta"]}
                  handleSelect={value => requestFilter("varsta", value)}
                />
              </Th>
              <Th>
                <FilterColumn
                  name="Afectiuni agravate"
                  values={DATA.map(data => data.afectiuni_agravate)}
                  selectedValues={filters["afectiuni_agravate"]}
                  handleSelect={value =>
                    requestFilter("afectiuni_agravate", value)
                  }
                />
              </Th>
              <Th>
                <FilterColumn
                  name="Temperatura ridicata"
                  values={DATA.map(data => data.temperatura_ridicata)}
                  selectedValues={filters["temperatura_ridicata"]}
                  handleSelect={value =>
                    requestFilter("temperatura_ridicata", value)
                  }
                />
              </Th>
              <Th>
                <FilterColumn
                  name="Tuse constante"
                  values={DATA.map(data => data.tuse_constante)}
                  selectedValues={filters["tuse_constante"]}
                  handleSelect={value => requestFilter("tuse_constante", value)}
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
    </>
  );
};

export default CazuriRedFlag;
