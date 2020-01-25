import Widget from "./Widget.jsx";

const render = ({ output, offset }) => {
  if (typeof output === "undefined") {
    return null;
  }

  return (
    <Widget offset={offset} width={render.WIDTH}>
      <i class="fas fa-calendar-alt" />
      &nbsp;{output.date}&nbsp;
      <i class="fas fa-clock" />
      &nbsp;{output.time}
    </Widget>
  );
};
render.WIDTH = 195;

export default render;
