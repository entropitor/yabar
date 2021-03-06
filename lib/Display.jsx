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
          default:
            return false;
        }
        return false;
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
const getRenderDetailsForSpace = ({ index, space, windows }) => {
  const width = 60;
  const offset = index * width + WIDTH_MODE;

  const color = getColorForSpace(space, windows);
  const labelIndex = getLabelIndexForSpace(space);
  const icon = getIconForSpace({ space, windows });

  return { color, labelIndex, icon, offset, width };
};

const renderSpace = ({ color, labelIndex, icon, width, offset }) => {
  return (
    <Widget offset={offset} width={width} side="left" color={color}>
      &nbsp; <i class={`${icon}`} />
      &nbsp;{labelIndex}
    </Widget>
  );
};

const render = ({ spaces, windows, mode }) => {
  if (spaces == null) {
    return null;
  }

  const children = spaces
    .map((space, index) => getRenderDetailsForSpace({ index, space, windows }))
    .map(details => {
      return renderSpace(details);
    })
    .reverse();

  return (
    <div>
      {children}
      <Widget
        offset={0 * spaces.length}
        width={WIDTH_MODE}
        color="magenta"
        side="left"
      >
        {mode}
      </Widget>
    </div>
  );
};

export default render;
