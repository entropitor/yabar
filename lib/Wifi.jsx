import Widget from "./Widget.jsx";

const render = ({ output, offset }) => {
  if (typeof output === "undefined") {
    return null;
  }

  return (
    <Widget width={render.WIDTH} offset={offset}>
      <i class="fas fa-wifi" />
      &nbsp;{output.ssid}
    </Widget>
  );
};
render.WIDTH = 165;

export default render;
