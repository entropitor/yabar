import Widget from "./Widget.jsx";

const render = ({ output, offset }) => {
  if (typeof output === "undefined") {
    return null;
  }

  const usedMemory = output.total - output.free;
  const memoryConsumption = Math.round((output.free / output.total) * 100.0);
  return (
    <Widget width={render.WIDTH} offset={offset}>
      <i class="fas fa-memory" />
      &nbsp;{memoryConsumption}%
    </Widget>
  );
};
render.WIDTH = 85;

export default render;
