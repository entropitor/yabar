import Widget from "./Widget.jsx";

const icons = {
  1: "fab fa-firefox",
  2: "fas fa-pencil-alt",
  3: "fas fa-terminal",
  7: "fab fa-facebook-messenger",
  8: "fas fa-envelope",
  9: "fab fa-slack"
};
const LABEL_REGEX = /@:(\d)+/;
const getLabelIndexForSpace = space => {
  const groups = space.label.match(LABEL_REGEX);
  if (!groups) {
    return "-";
  }
  return groups[1];
};

const getColorForSpace = space => {
  if (space.focused === 1) {
    return "blue";
  } else if (space.visible === 1) {
    return "white";
  } else if (space.windows.length === 0) {
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
          default:
            return false;
        }
        return false;
      }),
      null
    );
};
const getIconForSpace = ({ space, windows }) => {
  const labelIndex = getLabelIndexForSpace(space);
  return (
    icons[labelIndex] ||
    getIconBasedOnWindows({ space, windows }) ||
    "fas fa-question-circle"
  );
};

const getRenderDetailsForSpace = ({ index, space, windows }) => {
  const width = 60;
  const offset = index * width;

  const color = getColorForSpace(space);
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

const render = ({ spaces, windows }) => {
  if (spaces == null) {
    return null;
  }

  const children = spaces
    .map((space, index) => getRenderDetailsForSpace({ index, space, windows }))
    .map(details => {
      return renderSpace(details);
    })
    .reverse();

  return <div>{children}</div>;
};

export default render;
