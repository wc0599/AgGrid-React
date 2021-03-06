import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "./AgGridDynamicColumnsView.scss";

const AgGridDynamicColumnsView = () => {
  const colDefsMedalsIncluded = [
    { field: "athlete" },
    { field: "age" },
    { field: "country" },
    { field: "sport" },
    { field: "year" },
    { field: "date" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];

  const colDefsMedalsExcluded = [
    { field: "athlete" },
    { field: "age" },
    { field: "country" },
    { field: "sport" },
    { field: "year" },
    { field: "date" },
  ];

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [columns, setColumns] = useState(colDefsMedalsIncluded);
  const [forceRefresh, setForceRefresh] = useState(false);

  useEffect(() => {
    if (forceRefresh) {
      // refreshCells allow grid API to update the cells if the data is updated
      setTimeout(() => gridApi.refreshCells({ force: true }));
      setForceRefresh(false);
    }
  }, [forceRefresh]);

  const onGridReady = (params) => {
    // refreshCells allow updatesgrid API to update the cells if the data is updated
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const httpRequest = new XMLHttpRequest();
    httpRequest.open(
      "GET",
      "https://www.ag-grid.com/example-assets/olympic-winners.json"
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200)
        setRowData(JSON.parse(httpRequest.responseText));
    };
  };

  const onBtExcludeMedalColumns = () => setColumns(colDefsMedalsExcluded);

  const onBtIncludeMedalColumns = () => {
    setColumns(colDefsMedalsIncluded);
  };

  const renderButton = (onClick, text) => (
    <button onClick={onClick}>{text}</button>
  );

  const setHeaderNames = () => {
    const newColumns = gridApi.getColumnDefs();
    newColumns.forEach(
      (newColumn, index) => (newColumn.headerName = `C${index}`)
    );
    setColumns(newColumns);
  };

  const removeHeaderNames = () => {
    const newColumns = gridApi.getColumnDefs();
    newColumns.forEach((newColumn) => (newColumn.headerName = undefined));
    setColumns(newColumns);
  };

  const renderColumns = () =>
    columns.map((column) => {
      switch (column.field) {
        case "athlete":
        case "age":
          return (
            <AgGridColumn
              {...column}
              sortable={true}
              filter={true}
              rowGroup={true}
              key={column.field}
            />
          );
        default:
          return (
            <AgGridColumn
              {...column}
              sortable={true}
              filter={true}
              key={column.field}
              cellRenderer="agGroupCellRenderer"
            />
          );
      }
    });

  const setValueFormatters = () => {
    const newColumns = gridApi.getColumnDefs();
    newColumns.forEach(
      (newColumn) =>
        (newColumn.valueFormatter = (params) => `[ ${params.value} ]`)
    );

    setColumns(newColumns);
    setForceRefresh(true);
  };

  const removeValueFormatters = () => {
    const newColumns = gridApi.getColumnDefs();
    newColumns.forEach((newColumn) => (newColumn.valueFormatter = undefined));

    setColumns(newColumns);
    setForceRefresh(true);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Link to="/">Home</Link>
      {renderButton(setHeaderNames, "Set Header Names")}
      {renderButton(removeHeaderNames, "Remove Header Names")}
      {renderButton(setValueFormatters, "Set Value Formatters")}
      {renderButton(removeValueFormatters, "Remove Value Formatters")}
      {renderButton(onBtIncludeMedalColumns, "Include Medal Columns")}
      {renderButton(onBtExcludeMedalColumns, "Exclude Medal Columns")}
      <div
        style={{
          height: "100%",
          width: "100%",
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          rowData={rowData}
          rowSelection="multiple"
          onGridReady={onGridReady} // Receives the grid APIs. onGridReady stores the api for later use
          groupSelectsChildren={true}
          autoGroupColumnDef={{
            headerName: "Athlete",
            field: "athlete",
            cellRenderer: "agGroupCellRenderer",
            cellRendererParams: { checkbox: true },
          }}
          defaultColDef={{
            initialWidth: 100,
            sortable: true,
            resizable: true,
          }}
        >
          {renderColumns()}
        </AgGridReact>
      </div>
    </div>
  );
};

export default AgGridDynamicColumnsView;
