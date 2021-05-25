const MedalCellRenderer = ({ value }) => (
  <span>{new Array(value).fill("#").join("")}</span>
);

export default MedalCellRenderer;
