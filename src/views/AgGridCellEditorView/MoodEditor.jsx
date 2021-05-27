import {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";
import ReactDOM from "react-dom";

const MoodEditor = forwardRef((props, ref) => {
  const isHappy = (value) => value === "Happy";

  const [happy, setHappy] = useState(isHappy(props.value));
  const [editing, setEditing] = useState(true);
  const refContainer = useRef(null);

  useEffect(() => {
    focus();
  }, []);

  const checkAndToggleMoodIfLeftRight = (e) => {
    if ([37, 39].indexOf(e.keyCode) > -1) {
      // left and right
      setHappy(!happy);
      e.stopPropagation();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", checkAndToggleMoodIfLeftRight);

    return () => {
      window.removeEventListener("keydown", checkAndToggleMoodIfLeftRight);
    };
  }, [checkAndToggleMoodIfLeftRight]);

  useImperativeHandle(ref, () => ({
    getValue: () => (happy ? "Happy" : "Sad"),
    isPopup: () => true,
  }));

  useEffect(() => {
    if (!editing) props.api.stopEditing();
  }, [editing]);

  const focus = () => {
    window.setTimeout(() => {
      let container = ReactDOM.findDOMNode(refContainer.current);
      if (container) container.focus();
    });
  };

  const mood = {
    borderRadius: 15,
    border: "1px solid gray",
    background: "#e6e6e6",
    padding: 15,
    textAlign: "center",
    display: "inline-block",
  };

  const unselected = {
    paddingLeft: 10,
    paddingRight: 10,
    border: "1px solid transparent",
    padding: 4,
  };

  const selected = {
    paddingLeft: 10,
    paddingRight: 10,
    border: "1px solid lightgreen",
    padding: 4,
  };

  const happyStyle = happy ? selected : unselected;
  const sadStyle = !happy ? selected : unselected;

  return (
    <div ref={refContainer} style={mood} tabIndex={1}>
      <img
        src="https://www.ag-grid.com/example-assets/smileys/happy.png"
        onClick={() => {
          setHappy(true);
          setEditing(false);
        }}
        style={happyStyle}
      />
      <img
        src="https://www.ag-grid.com/example-assets/smileys/sad.png"
        onClick={() => {
          setHappy(false);
          setEditing(false);
        }}
        style={sadStyle}
      />
    </div>
  );
});

export default MoodEditor;
