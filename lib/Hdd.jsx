import Widget from "./Widget.jsx";

const render = ({ output, offset }) => {
  if (typeof output === "undefined") {
    return null;
  }
  const total = (output.totalBytes * 512) / 1024 / 1024 / 1024;
  const free = (output.freeBytes * 512) / 1024 / 1024 / 1024;
  const used = total - free;
  return (
    <Widget offset={offset} width={render.WIDTH}>
      <i class="fas fa-hdd" />
      &nbsp;{Math.round(used)}Gi/{Math.round(total)}Gi
    </Widget>
  );
};
render.WIDTH = 125;

export default render;
