import DateTime from "./lib/DateTime.jsx";
import Battery from "./lib/Battery.jsx";
import Cpu from "./lib/Cpu.jsx";
import Memory from "./lib/Memory.jsx";
import Hdd from "./lib/Hdd.jsx";
import Wifi from "./lib/Wifi.jsx";
import Error from "./lib/Error.jsx";
import { rightSide } from "./lib/style.jsx";
import parse from "./lib/parse.jsx";

export const refreshFrequency = 60000;

export const command = "./yabar/scripts/right.sh";

export const updateState = (event, state) => {
  switch (event.type) {
    case "UB/COMMAND_RAN": {
      return {
        ...state,
        output: {
          time: state.output.time,
          ...parse(event.output)
        },
        error: event.error
      };
    }
    case "TICK": {
      return {
        ...state,
        output: {
          ...state.output,
          time: event.time
        }
      };
    }
    default:
      return state;
  }
};

export const init = dispatch => {
  setInterval(() => {
    dispatch({
      type: "TICK",
      time: new Date()
    });
  }, 1000);
};

export const initialState = {
  error: "Not initialized yet",
  output: {
    time: new Date()
  }
};

const renderWidget = ({ type, data }) => {
  switch (type) {
    case "wifi": {
      return [Wifi, data.wifi];
    }
    case "memory": {
      return [Memory, data.memory];
    }
    case "cpu": {
      return [Cpu, data.cpu];
    }
    case "battery": {
      return [Battery, data.battery];
    }
    case "datetime": {
      return [DateTime, data.time];
    }
    case "hdd": {
      return [Hdd, data.hdd];
    }
    default: {
      throw new Error("Not implemented");
    }
  }
};
const accumulateWidgets = data => (acc, type) => {
  const [Widget, output] = renderWidget({ type, data });

  acc.widgets.push(<Widget output={output} offset={acc.offset} />);
  acc.offset += Widget.WIDTH;

  return acc;
};

export const render = ({ output, error }, dispatch) => {
  // console.log(`Right bar output: ${JSON.stringify(output, null, 2)}`);

  if (output == null) {
    return (
      <div style={rightSide}>
        <Error msg="Error: unknown script output" side="right" />
      </div>
    );
  }

  if (error != null) {
    return (
      <div style={rightSide}>
        <Error msg={error} side="right" />
      </div>
    );
  }

  const widgets = [
    "wifi",
    // "memory",
    // "cpu",
    "battery",
    "datetime"
  ];

  return (
    <div style={rightSide}>
      {widgets
        .reverse()
        .reduce(accumulateWidgets(output), { offset: 0, widgets: [] })
        .widgets.reverse()}
    </div>
  );
};

export default null;
