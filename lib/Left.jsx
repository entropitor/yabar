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

  const focussed = data.focus === "focus";

  const relevantWindows = data.windows
    .filter(w => w.minimized === 0)
    .filter(w => w.sticky === 0);
  const relevantSpaces = data.spaces.filter(space => {
    if (!space.label.startsWith("@")) {
      return true;
    }
    if (focussed) {
      if (space.label.startsWith(`@${data.mode}:8`)) {
        return false;
      }
      if (space.label.startsWith(`@${data.mode}:9`)) {
        return false;
      }
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
        windows={relevantWindows}
        mode={data.mode}
        focussed={focussed}
      />
    </div>
  );
};

export default render;
