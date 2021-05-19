import { Link } from "react-router-dom";

const HomeView = () => (
  <>
    <h1>AgGrid Basics in React</h1>
    <nav>
      <ul>
        <li>
          <Link to="/aggrid-basics">AgGrid Basics</Link>
        </li>
        <li>
          <Link to="/aggrid-update-delete-columns">
            Updating and Deleting Columns
          </Link>
        </li>
      </ul>
    </nav>
  </>
);

export default HomeView;
