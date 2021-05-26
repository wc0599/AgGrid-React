const MedalCellRenderer = ({ value }) => {
  const medalColor = (value) => {
    if (value < 3) return "red";
    if (value >= 3 && value < 5) return "yellow";
    if (value >= 5) return "green";
  };

  return (
    <span id={medalColor(value)}>{new Array(value).fill("#").join("")}</span>
  );
};

export default MedalCellRenderer;
