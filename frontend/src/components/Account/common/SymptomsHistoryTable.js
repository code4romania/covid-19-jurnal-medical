import React from "react";

import { DataTable, DataTableItem, DataTableRow } from "@code4ro/taskforce-fe-components";

const SymptomsHistoryTable = ({ symptomsData, headers, title }) => {
    if (!symptomsData || !Object.keys(symptomsData).length) {
        return <div> Nothing to show yet</div>
    }

    const renderCell = (cell) => <DataTableItem> {cell} </DataTableItem>;

    const renderHeader = () => {
        return <DataTableRow>
            {headers.map(renderCell)}
        </DataTableRow>;
    };

    const renderData = (data) => {
        const renderRow = (row) => <DataTableRow>{Object.values(row).map(renderCell)}</DataTableRow>;
        return Object.values(data).map(renderRow);
    };

    return <div className="general-info__container">
        <h5> {title} </h5>
        {renderHeader()}
        <DataTable>
            {renderData(symptomsData)}
        </DataTable>
    </div>
};

export default SymptomsHistoryTable;