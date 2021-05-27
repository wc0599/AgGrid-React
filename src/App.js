import AgGridBasicsView from "./views/AgGridBasicsView/AgGridBasicsView";
import AgGridDynamicColumnsView from "./views/AgGridDynamicColumnsView/AgGridDynamicColumnsView";
import AgGridCustomCellRendererView from "./views/AgGridCustomCellRenderView/AgGridCustomCellRendererView";
import HomeView from "./views/HomeView/HomeView";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import AgGridCellEditorView from "./views/AgGridCellEditorView/AgGridCellEditorView";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/aggrid-basics">
          <AgGridBasicsView />
        </Route>
        <Route path="/aggrid-update-delete-columns">
          <AgGridDynamicColumnsView />
        </Route>
        <Route path="/aggrid-custom-cell-render">
          <AgGridCustomCellRendererView />
        </Route>
        <Route path="/aggrid-cell-editor">
          <AgGridCellEditorView />
        </Route>
        <Route path="/">
          <HomeView />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
