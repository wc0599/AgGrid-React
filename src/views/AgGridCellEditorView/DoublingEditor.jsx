import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";

const DoublingEditor = forwardRef((props, ref) => {
  const [value, setValue] = useState(parseInt(props.value));
  const refInput = useRef(null);

  useEffect(() => {
    // set focus on input
    setTimeout(() => refInput.current.focus());
  }, []);

  /**
   * useImperativeHandle
   *
   * customizes the instance value exposed to parent components when using `ref`
   * imperative code using refs should be avoided in most cases.
   *
   * useImperativeHandle should be used with forwardRef
   *  */
  useImperativeHandle(ref, () => ({
    // final value to send to the grid, on completion of editing
    // doubles value by 2
    getValue: () => value * 2,

    // Gets called once before editing starts to give editor a chance to cancel editing before it even starts.
    isCancelBeforeStart: () => false,

    // Gets called once when editing is finished (e.g. if Enter is pressed)
    // If you return true, then the result of the edit will be ignored.
    // our editor will reject any value greater than 1000
    isCancelAfterEnd: () => value > 1000,
  }));

  return (
    <input
      type="number"
      ref={refInput}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      style={{ width: "100%" }}
    />
  );
});

export default DoublingEditor;
