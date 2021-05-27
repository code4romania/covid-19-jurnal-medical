import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import CircleArrow from "../../components/CircleArrow";

const AllUsersTable = () => {
  return (
    <div className="dashboard-box">
      <h3 className="mb-20">
        <strong>Toti utilizatorii</strong>
      </h3>
      <Table className="dashboard-table table info-table">
        <Thead>
          <Tr>
            <Th>Judet</Th>
            <Th>Varsta</Th>
            <Th>Afectiuni agravate</Th>
            <Th>Temperatura</Th>
            <Th>Tuse constante</Th>
            <Th className="last-column"></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Bacau</Td>
            <Td>65</Td>
            <Td>Diabet</Td>
            <Td>38.5</Td>
            <Td>Da</Td>
            <Td align="right">
              <CircleArrow type={"info"} />
            </Td>
          </Tr>
          <Tr>
            <Td>Calarasi</Td>
            <Td>54</Td>
            <Td>Hipertensiune</Td>
            <Td>39</Td>
            <Td>Nu</Td>
            <Td align="right">
              <CircleArrow type={"info"} />
            </Td>
          </Tr>
          <Tr>
            <Td>Bacau</Td>
            <Td>25</Td>
            <Td>Nu</Td>
            <Td>38.2</Td>
            <Td>Nu</Td>
            <Td align="right">
              <CircleArrow type={"info"} />
            </Td>
          </Tr>
          <Tr>
            <Td>Iasi</Td>
            <Td>32</Td>
            <Td>Nu</Td>
            <Td>38.2</Td>
            <Td>Da</Td>
            <Td align="right">
              <CircleArrow type={"info"} />
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <button className="button view-all" onClick={() => {}}>
        Vezi toate
      </button>
    </div>
  );
};

export default AllUsersTable;
