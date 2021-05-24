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

  const renderLinks = () => (
    <nav>
      <ol>
        {renderLink("/aggrid-basics", "Ag Grid Basics")}
        {renderLink(
          "/aggrid-update-delete-columns",
          "Updating and Deleting Columns"
        )}
      </ol>
    </nav>
  );

  const renderExternalLinks = () => (
    <ul>
      {renderExternalLink("https://github.com/wc0599/AgGrid-React", "GitHub")}
      {renderExternalLink(
        "https://www.ag-grid.com/react-grid/",
        "Ag-Grid Docs"
      )}
    </ul>
  );

  return (
    <>
      <h1>AgGrid Basics in React</h1>
      {renderLinks()}
      <nav>
        <p>External Links:</p>
        {renderExternalLinks()}
      </nav>
    </>
  );
};

export default HomeView;
