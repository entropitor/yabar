import Display from "./lib/Display.jsx";
import Error from "./lib/Error.jsx";
import { leftSide } from "./lib/style.jsx";
import parse from "./lib/parse.jsx";

export const refreshFrequency = 500;

export const command = "./powerbar/status-left.sh 1";

export const render = ({ output }) => {
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

export default null;
