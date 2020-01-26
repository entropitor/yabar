import Display from "./Display.jsx";
import Error from "./Error.jsx";
import { leftSide } from "./style.jsx";
import parse from "./parse.jsx";

const render = ({ output }) => {
  const data = parse(output);
  if (data == null) {
    return (
      <div style={leftSide}>
        <Error msg="Error: unknown script output" side="left" />
      </div>
    );
  }
  if (data.error != null) {
    return (
      <div style={leftSide}>
        <Error msg={`Error: ${data.error}`} side="left" />
      </div>
    );
  }
  return (
    <div style={leftSide}>
      <Display spaces={data.spaces} windows={data.windows} />
    </div>
  );
};

export default render;
