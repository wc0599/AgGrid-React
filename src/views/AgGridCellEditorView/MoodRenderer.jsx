import { forwardRef, useImperativeHandle, useState } from "react";

const MoodRenderer = forwardRef((props, ref) => {
  const imageForMood = (mood) =>
    `https://www.ag-grid.com/example-assets/smileys/${
      mood === "Happy" ? "happy.png" : "sad.png"
    }`;

  const [mood, setMood] = useState(imageForMood(props.value));

  useImperativeHandle(ref, () => ({
    refresh: (params) => {
      setMood(imageForMood(params.value));
    },
  }));

  // eslint-disable-next-line jsx-a11y/alt-text
  return <img src={mood} width="20px" />;
});

export default MoodRenderer;
