import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "./AgGridBasicsView.scss";

const AgGridBasicsView = () => {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(null);
  const masterDetail = true;

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((res) => res.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  const onButtonClick = (e) => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.make} ${node.model}`)
      .join(", ");
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  };

  const detailCellRendererParams = {
    // provide the Grid Options to use on the Detail Grid
    detailGridOptions: {
      columnDefs: [
        { field: "callId" },
        { field: "direction" },
        { field: "number" },
      ],
    },

    // get the rows for each Detail Grid
    getDetailRowData: (params) => {
      params.successCallback(params.data.callRecords);
    },
  };

  return (
    <>
      <Link to="/">Home</Link>
      <div className="ag-theme-alpine" style={{ height: 1200, width: 600 }}>
        <button onClick={onButtonClick}>Get selected rows</button>
        <AgGridReact
          ref={gridRef}
          masterDetail={masterDetail}
          detailCellRendererParams={detailCellRendererParams}
          rowData={rowData}
          rowSelection="multiple"
          groupSelectsChildren={true}
          autoGroupColumnDef={{
            headerName: "Model",
            field: "model",
            cellRenderer: "agGroupCellRenderer",
            cellRendererParams: { checkbox: true },
          }}
        >
          <AgGridColumn
            field="make"
            sortable={true}
            filter={true}
            checkboxSelection={true}
            rowGroup={true}
          />
          <AgGridColumn field="price" sortable={true} filter={true} />
        </AgGridReact>
      </div>
    </>
  );
};

export default AgGridBasicsView;
