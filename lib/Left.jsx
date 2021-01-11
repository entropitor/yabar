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

  const nonMinimizedWindows = data.windows.filter(w => w.minimized === 0);
  const relevantSpaces = data.spaces.filter(space => {
    if (!space.label.startsWith("@")) {
      return true;
    }
    if (space.label.startsWith(`@${data.mode}:`)) {
      return true;
    }
    return false;
  });

  return (
    <div style={leftSide}>
      <Display
        spaces={relevantSpaces}
        windows={nonMinimizedWindows}
        mode={data.mode}
      />
    </div>
  );
};

export default render;
