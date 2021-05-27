import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";
import KEY from "./AgGridCellEditorView";

const NumericEditor = forwardRef((props, ref) => {
  const createInitialState = () => {
    let startValue;
    let highlightAllOnFocus = true;

    if (props.keyPress === KEY.BACKSPACE || props.keyPress === KEY.DELETE)
      startValue = "";
    else if (props.charPress) {
      startValue = props.charPress;
      highlightAllOnFocus = false;
    } else {
      startValue = props.value;
      if (props.keyPress === KEY.F2) highlightAllOnFocus = false;
    }

    return {
      value: startValue,
      highlightAllOnFocus,
    };
  };

  const initialState = createInitialState();
  const [value, setValue] = useState(initialState.value);
  const [highlightAllOnFocus, setHighlightAllOnFocus] = useState(
    initialState.highlightAllOnFocus
  );
  const refInput = useRef(null);

  const cancelBeforeStart =
    props.charPress && "1234567890".indexOf(props.charPress) < 0;

  const isLeftOrRight = (e) => [37, 39].indexOf(e.keyCode) > -1;

  const getCharCodeFromEvent = (e) => {
    e = e || window.event;
    return typeof e.which === "undefined" ? e.keyCode : e.which;
  };

  const isCharNumeric = (charStr) => !!/\d/.test(charStr);

  const isKeyPressedNumeric = (e) => {
    const charCode = getCharCodeFromEvent(e);
    const charStr = e.key || String.fromCharCode(charCode);
    return isCharNumeric(charStr);
  };

  const deleteOrBackspace = (e) =>
    [KEY.DELETE, KEY.BACKSPACE].indexOf(e.keyCode) > -1;

  const finishedEditingPressed = (e) => {
    const charCode = getCharCodeFromEvent(e);
    return charCode === KEY.ENTER || charCode === KEY.TAB;
  };

  const onKeyDown = (e) => {
    if (isLeftOrRight(e) || deleteOrBackspace(e)) {
      e.stopPropagation();
      return;
    }

    if (!finishedEditingPressed(e) && !isKeyPressedNumeric(e))
      if (e.preventDefault) e.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  useImperativeHandle(ref, () => ({
    afterGuiAttached: () => {
      const eInput = refInput.current;
      eInput.focus();
      if (highlightAllOnFocus) {
        eInput.select();
        setHighlightAllOnFocus(false);
      } else {
        /**
         * when we started editing, we want the carot at the end, not the start.
         * comes into play in two scenarios:
         *  a) when user hits F2
         *  b) when user hits a printable character, then on IE (and only in IE) the carot was placed after the first character, thus 'apply' -> 'pplea'
         */
        const length = eInput.value ? eInput.value.length : 0;
        if (length > 0) eInput.setSelectionRange(length, length);
      }
    },
    getValue: () => value,
    isCancelBeforeStart: () => cancelBeforeStart,
    /**
     * will reject number if greater than 1,000,000
     * (not very practical but for demonstrative purposes...)
     */
    isCancelAfterEnd: () => value > 1000000,
  }));

  return (
    <input
      ref={refInput}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      style={{ width: "100%" }}
    />
  );
});

export default NumericEditor;
