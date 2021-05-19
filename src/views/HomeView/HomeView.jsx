import { Link } from "react-router-dom";
import "./HomeView.scss";

const HomeView = () => {
  const renderExternalLink = (href, text) => (
    <li>
      <a href={href} referrerPolicy="no-referrer" target="_blank">
        {text}
      </a>
    </li>
  );

  const renderLink = (url, text) => (
    <li>
      <Link to={url}>{text}</Link>
    </li>
  );

  return (
    <>
      <h1>AgGrid Basics in React</h1>
      <nav>
        <ol>
          {renderLink("/aggrid-basics", "Ag Grid Basics")}
          {renderLink(
            "/aggrid-update-delete-columns",
            "Updating and Deleting Columns"
          )}
        </ol>
      </nav>
      <nav>
        <p>External Links:</p>
        <ul>
          {renderExternalLink(
            "https://github.com/wc0599/AgGrid-React",
            "GitHub"
          )}
          {renderExternalLink(
            "https://www.ag-grid.com/react-grid/",
            "Ag-Grid Docs"
          )}
        </ul>
      </nav>
    </>
  );
};

export default HomeView;
