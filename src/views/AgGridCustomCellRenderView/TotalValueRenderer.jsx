const TotalValueRenderer = ({ valueFormatted, value }) => {
  const cellValue = valueFormatted || value;

  const buttonClicked = () => {
    alert(`${cellValue} medals won!`);
  };

  return (
    <span>
      <span>{cellValue}</span>&nbsp;
      <button onClick={() => buttonClicked()}>Push For Total</button>
    </span>
  );
};

export default TotalValueRenderer;
