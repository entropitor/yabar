import DateTime from "./lib/DateTime.jsx";
import Battery from "./lib/Battery.jsx";
import Cpu from "./lib/Cpu.jsx";
import Memory from "./lib/Memory.jsx";
import Hdd from "./lib/Hdd.jsx";
import Wifi from "./lib/Wifi.jsx";
import Error from "./lib/Error.jsx";
import { rightSide } from "./lib/style.jsx";
import parse from "./lib/parse.jsx";

export const refreshFrequency = 15000;

export const command = "./yabar/scripts/right.sh";

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
      return [DateTime, data.datetime];
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

export const render = ({ output }) => {
  console.log(`Right bar output: ${output}`);
  const data = parse(output);
  console.log(data);

  if (data == null) {
    return (
      <div style={rightSide}>
        <Error msg="Error: unknown script output" side="right" />
      </div>
    );
  }

  if (data.error != null) {
    return (
      <div style={rightSide}>
        <Error msg={data.error} side="right" />
      </div>
    );
  }

  const widgets = ["wifi", "memory", "cpu", "battery", "datetime"];

  return (
    <div style={rightSide}>
      {widgets
        .reverse()
        .reduce(accumulateWidgets(data), { offset: 0, widgets: [] })
        .widgets.reverse()}
    </div>
  );
};

export default null;
