import Widget from "./Widget.jsx";

const displayIcon = (batteryPercentage, isCharging) => {
  if (isCharging === true) {
    return "fa-bolt";
  } else if (batteryPercentage < 20) {
    return "fa-battery-empty";
  } else if (batteryPercentage < 40) {
    return "fa-battery-quarter";
  } else if (batteryPercentage < 60) {
    return "fa-battery-half";
  } else if (batteryPercentage < 80) {
    return "fa-battery-three-quarters";
  } else {
    return "fa-battery-full";
  }
};

const getColorForBattery = (batteryPercentage, isCharging) => {
  if (isCharging === true) {
    if (batteryPercentage < 90) {
      return "green";
    } else {
      return "default";
    }
  } else {
    if (batteryPercentage < 20) {
      return "red";
    } else if (batteryPercentage < 40) {
      return "orange";
    } else if (batteryPercentage < 60) {
      return "yellow";
    }
  }
};

const render = ({ output, offset }) => {
  if (typeof output === "undefined") {
    return null;
  }

  const batteryIcon = displayIcon(output.percentage, output.charging);
  const color = getColorForBattery(output.percentage, output.charging);
  return (
    <Widget offset={offset} width={render.WIDTH} color={color}>
      <i class={`fas ${batteryIcon}`} />
      &nbsp;{output.percentage}%
    </Widget>
  );
};

render.WIDTH = 75;

export default render;
