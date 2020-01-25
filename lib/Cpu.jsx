import Widget from "./Widget.jsx";

const render = ({ output, offset }) => {
  if (typeof output === "undefined") {
    return null;
  }

  return (
    <Widget offset={offset} width={render.WIDTH}>
      <i class="fas fa-microchip" />
      &nbsp;{output.loadAverage}
    </Widget>
  );
};
render.WIDTH = 85;

export default render;
