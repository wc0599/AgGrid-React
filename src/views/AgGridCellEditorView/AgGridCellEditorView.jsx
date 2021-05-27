import { AgGridReact, AgGridColumn } from "ag-grid-react";
import DoublingEditor from "./DoublingEditor";
import MoodRenderer from "./MoodRenderer";
import MoodEditor from "./MoodEditor";
import NumericEditor from "./NumericEditor";

export const KEY = Object.freeze({
  BACKSPACE: 8,
  DELETE: 46,
  F2: 113,
  ENTER: 13,
  TAB: 9,
});

const AgGridCellEditor = () => {
  const rowData = [
    { name: "Bob", mood: "Happy", number: 10 },
    { name: "Harry", mood: "Sad", number: 3 },
    { name: "Sally", mood: "Happy", number: 20 },
    { name: "Mary", mood: "Sad", number: 5 },
    { name: "John", mood: "Happy", number: 15 },
    { name: "Jack", mood: "Happy", number: 25 },
    { name: "Sue", mood: "Sad", number: 43 },
    { name: "Sean", mood: "Sad", number: 1335 },
    { name: "Niall", mood: "Happy", number: 2 },
    { name: "Alberto", mood: "Happy", number: 123 },
    { name: "Fred", mood: "Sad", number: 532 },
    { name: "Jenny", mood: "Happy", number: 34 },
    { name: "Larry", mood: "Happy", number: 13 },
  ];

  return (
    <>
      <a href="/">Home</a>
      <h1>Simple Cell Editor</h1>
      <ul>
        <li>
          The `Doubling` Cell Editor doubles a given input and reject values
          over 1000
        </li>
        <li>
          The `Mood` Cell Editor illustrates an editor with values changed
          depending on the smiley chosen
        </li>
        <li>
          The `Numeric` Cell Editor illustrates a numeric editor to the
          `Doubling` editor above, with increased input validation and better
          initial carot behavior
        </li>
      </ul>
      <div
        className="ag-theme-alpine"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <AgGridReact
          rowData={rowData}
          frameworkComponents={{
            doublingEditor: DoublingEditor,
            moodRenderer: MoodRenderer,
            moodEditor: MoodEditor,
            numbericEditor: NumericEditor,
          }}
          defaultColDef={{
            editable: true,
            sortable: true,
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
          }}
        >
          <AgGridColumn
            headerName="Doubling"
            field="number"
            cellEditor="doublingEditor"
            editable={true}
          />
          <AgGridColumn
            field="mood"
            cellRenderer="moodRenderer"
            cellEditor="moodEditor"
            editable={true}
            width={300}
          />
          <AgGridColumn
            headerName="Numeric"
            field="number"
            cellEditor="numericEditor"
            editable={true}
            width={280}
          />
        </AgGridReact>
      </div>
    </>
  );
};

export default AgGridCellEditor;
