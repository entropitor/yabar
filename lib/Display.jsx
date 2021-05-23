import { React } from "uebersicht";

import Widget from "./Widget.jsx";

const LABEL_REGEX = /@[^:]*:(\d)+/;
const getLabelIndexForSpace = space => {
  const groups = space.label.match(LABEL_REGEX);
  if (!groups) {
    return "";
  }
  return parseInt(groups[1], 10);
};

const getColorForSpace = ({ space, spaceWindows }) => {
  if (space.focused === 1) {
    return "blue";
  } else if (space.visible === 1) {
    return "white";
  } else if (spaceWindows.length === 0) {
    return "black";
  }

  return null;
};

const getIconForWindow = space => window => {
  const labelIndex = getLabelIndexForSpace(space);
  switch (window.app) {
    case "Firefox": {
      return (
        {
          7: "fab fa-facebook-messenger",
          8: "fas fa-envelope"
        }[labelIndex] ?? "fab fa-firefox"
      );
    }
    case "Google Chrome":
      return "fab fa-chrome";
    case "Alacritty":
    case "kitty": {
      return (
        {
          2: "fas fa-pencil-alt"
        }[labelIndex] ?? "fas fa-terminal"
      );
    }
    case "Lens":
    case "kubenav":
      return "fas fa-search";
    case "Valentina Studio":
      return "fas fa-database";
    case "zoom.us":
      return "fas fa-video";
    case "WorkFlowy":
      return "fas fa-list";
    case "Abstract":
      return "fas fa-palette";
    default:
      return null;
  }
};
const getIconsForSpace = ({ space, spaceWindows }) => {
  const icons = spaceWindows.map(getIconForWindow(space));
  return icons.filter(x => x).reverse();
};

const WIDTH_MODE = 100;
const getRenderDetailsForSpace = windows => space => {
  const spaceWindows = windows.filter(w => space.windows.includes(w.id));

  const color = getColorForSpace({ space, spaceWindows });
  const labelIndex = getLabelIndexForSpace(space);
  const icons = getIconsForSpace({ space, spaceWindows });

  return {
    color,
    labelIndex,
    icons,
    width: 60 + Math.max(0, icons.length - 1) * 20
  };
};

const renderSpace = ({ color, labelIndex, icons, width, offset }) => {
  return (
    <Widget offset={offset} width={width} side="left" color={color}>
      &nbsp;{" "}
      {icons.map(icon => (
        <>
          {" "}
          <i class={`${icon}`} />
        </>
      ))}
      &nbsp;{labelIndex}
    </Widget>
  );
};

const initialAccumulateOffset = { acc: [], offset: WIDTH_MODE };
const accumulateOffsetFromWidth = ({ acc, offset }, details) => {
  const newOffset = offset + details.width;
  return {
    acc: [
      ...acc,
      {
        ...details,
        offset
      }
    ],
    offset: newOffset
  };
};

const render = ({ spaces, windows, mode, focussed }) => {
  if (spaces == null) {
    return null;
  }

  const children = spaces
    .map(getRenderDetailsForSpace(windows))
    .reduce(accumulateOffsetFromWidth, initialAccumulateOffset)
    .acc.map(renderSpace)
    .reverse();

  return (
    <div>
      {children}
      <Widget
        offset={0}
        width={WIDTH_MODE}
        color={focussed ? "green" : mode === "work" ? "red" : "magenta"}
        side="left"
      >
        {mode}
      </Widget>
    </div>
  );
};

export default render;
