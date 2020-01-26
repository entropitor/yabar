import {
  containerLeft,
  containerRight,
  arrowLeft,
  arrowRight,
  contentLeft,
  contentRight
} from "./style.jsx";
import Widget from "./Widget.jsx";

const render = ({ msg, side = "right" }) => {
  if (msg == null) {
    return null;
  }

  return (
    <Widget color="red" width={400} offset={0} side={side}>
      <i class="fas fa-exclamation-triangle" />
      &nbsp;{msg}
    </Widget>
  );
};

export default render;
