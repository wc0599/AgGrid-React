import AgGridBasicsView from "./views/AgGridBasicsView/AgGridBasicsView";
import AgGridDynamicColumnsView from "./views/AgGridDynamicColumnsView/AgGridDynamicColumnsView";
import HomeView from "./views/HomeView/HomeView";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/aggrid-update-delete-columns">
          <AgGridDynamicColumnsView />
        </Route>
        <Route path="/aggrid-basics">
          <AgGridBasicsView />
        </Route>
        <Route path="/">
          <HomeView />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
