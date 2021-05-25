import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import MedalCellRenderer from "./MedalCellRenderer.jsx";
import TotalValueRenderer from "./TotalValueRenderer.jsx";

const AgGridCustomCellRendererView = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => {
      setRowData(data);
    };

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  return (
    <>
      <h1>Cell Renderer</h1>
      <h3>
        By default the grid creates cell values using simple text. If you want
        more complex HTML inside cells, use cell renderers
      </h3>
      <h3>
        Example below shows a simple cell renderer to render a hash (#) symbol
        for each medal won (instead of the medal count), and the
        `MedalCellRenderer` for the `Total` column
      </h3>
      <div
        style={{
          height: "100%",
          width: "100%",
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          frameworkComponents={{
            medalCellRenderer: MedalCellRenderer,
            totalValueRenderer: TotalValueRenderer,
          }}
          defaultColDef={{
            editable: true,
            sortable: true,
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
          }}
          onGridReady={onGridReady}
          rowData={rowData}
        >
          <AgGridColumn field="athlete" />
          <AgGridColumn field="year" />
          <AgGridColumn field="gold" cellRenderer="medalCellRenderer" />
          <AgGridColumn field="silver" cellRenderer="medalCellRenderer" />
          <AgGridColumn field="bronze" cellRenderer="medalCellRenderer" />
          <AgGridColumn
            field="total"
            minWidth={175}
            cellRenderer="totalValueRenderer"
          />
        </AgGridReact>
      </div>
    </>
  );
};

export default AgGridCustomCellRendererView;
