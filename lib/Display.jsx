import Widget from "./Widget.jsx";

const icons = {
  1: "fab fa-firefox",
  2: "fas fa-pencil-alt",
  3: "fas fa-terminal",
  7: "fab fa-facebook-messenger",
  8: "fas fa-envelope",
  9: "fab fa-slack"
};
const LABEL_REGEX = /@[^:]*:(\d)+/;
const getLabelIndexForSpace = space => {
  const groups = space.label.match(LABEL_REGEX);
  if (!groups) {
    return "";
  }
  return groups[1];
};

const getColorForSpace = (space, windows) => {
  if (space.focused === 1) {
    return "blue";
  } else if (space.visible === 1) {
    return "white";
  } else if (!windows.some(w => space.windows.includes(w.id))) {
    return "black";
  }

  return null;
};
const firstNonNull = fn => (acc, next) => {
  if (acc != null) {
    return acc;
  }
  return fn(next);
};
const getIconBasedOnWindows = ({ space, windows }) => {
  return windows
    .filter(window => space.windows.includes(window.id))
    .reduce(
      firstNonNull(window => {
        switch (window.app) {
          case "Firefox":
            return "fab fa-firefox";
          case "Alacritty":
          case "kitty":
            return "fas fa-terminal";
          case "Lens":
          case "kubenav":
            return "fas fa-search";
          case "Valentina Studio":
            return "fas fa-database";
          case "zoom.us":
            return "fas fa-video";
          case "Google Chrome":
            return "fab fa-chrome";
          case "WorkFlowy":
            return "fas fa-list";
          case "Abstract":
            return "fas fa-palette";
          default:
            return false;
        }
      }),
      null
    );
};
const getIconForSpace = ({ space, windows }) => {
  if (!windows.some(w => space.windows.includes(w.id))) {
    return "";
  }

  const labelIndex = getLabelIndexForSpace(space);
  return icons[labelIndex] || getIconBasedOnWindows({ space, windows }) || "";
};

const WIDTH_MODE = 100;
const getRenderDetailsForSpace = ({ space, windows }) => {
  const width = 60;

  const color = getColorForSpace(space, windows);
  const labelIndex = getLabelIndexForSpace(space);
  const icon = getIconForSpace({ space, windows });

  return { color, labelIndex, icon, width };
};

const renderSpace = ({ color, labelIndex, icon, width, offset }) => {
  return (
    <Widget offset={offset} width={width} side="left" color={color}>
      &nbsp; <i class={`${icon}`} />
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
    .map(space => getRenderDetailsForSpace({ space, windows }))
    .reduce(accumulateOffsetFromWidth, initialAccumulateOffset)
    .acc.map(renderSpace)
    .reverse();

  return (
    <div>
      {children}
      <Widget
        offset={0 * spaces.length}
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
