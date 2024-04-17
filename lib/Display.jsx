import { React } from "uebersicht";
import { run } from "uebersicht";

import Widget from "./Widget.jsx";

const LABEL_REGEX = /@[^:]*:(\d)+/;
const getLabelIndexForSpace = (space) => {
  const groups = space.label.match(LABEL_REGEX);
  if (!groups) {
    return "";
  }
  return parseInt(groups[1], 10);
};

const getColorForSpace = ({ space, spaceWindows }) => {
  if (space["has-focus"]) {
    return "blue";
  } else if (space["is-visible"]) {
    return "white";
  } else if (spaceWindows.length === 0) {
    return "black";
  }

  return null;
};

const getIconForWindow = (space) => (window) => {
  const labelIndex = getLabelIndexForSpace(space);
  switch (window.app) {
    case "Todoist":
      return "fas fa-check";
    case "Firefox": {
      return (
        {
          "Brain.fm": "fas fa-music",
        }[window.title] ??
        {
          7: "fas fa-comment-dots",
          8: "fas fa-envelope",
        }[labelIndex] ??
        "fab fa-firefox"
      );
    }
    case "Signal":
      return "fas fa-comment-dots";
    case "Google Chrome":
      return "fab fa-chrome";
    case "Alacritty":
    case ".kitty-wrapped":
    case "kitty": {
      if (window.title.endsWith("editor")) {
        return "fas fa-pencil-alt";
      }
      if (window.title.endsWith("cli")) {
        return "fas fa-terminal";
      }
      if (labelIndex === 2) {
        return "fas fa-pencil-alt";
      }
      return "fas fa-cat";
    }
    case "Lens":
    case "kubenav":
      return "fas fa-search";
    case "Valentina Studio":
    case "MongoDB Compass":
      return "fas fa-database";
    case "zoom.us":
    case "Google Meet":
      return "fas fa-video";
    case "Brain.fm App":
    case "Spotify":
      return "fas fa-music";
    case "WorkFlowy":
      return "fas fa-list";
    case "Abstract":
      return "fas fa-palette";
    case "Figma":
      return "fab fa-figma";
    case "System Preferences":
      return "fas fa-cogs";
    case "Slack":
      return "fab fa-slack";
    case "Finder":
      return "fas fa-folder-open";
    case "Miro":
      return "fas fa-chalkboard";
    case "Keybase":
      return "fab fa-keybase";
    case "GraphQL Playground":
      return "far fa-paper-plane";
    case "Jira":
      return "fab fa-jira";
    default:
      return "fas fa-question";
  }
};
const getIconsForSpace = ({ space, spaceWindows }) => {
  const icons = spaceWindows.map(getIconForWindow(space));
  return icons.filter((x) => x).reverse();
};

const getRenderDetailsForSpace = (windows) => (space) => {
  const spaceWindows = space.windows
    .map((windowId) => windows.find((w) => w.id === windowId))
    .filter((x) => x)
    .filter((w) => w["has-ax-reference"]);

  const color = getColorForSpace({ space, spaceWindows });
  const labelIndex = getLabelIndexForSpace(space);
  const icons = getIconsForSpace({ space, spaceWindows });

  return {
    nbWindows: spaceWindows.length,
    focused: space["has-focus"],
    color,
    spaceIndex: space.index,
    labelIndex,
    icons,
    width: 60 + Math.max(0, icons.length - 1) * 20,
  };
};

const renderSpace = ({
  color,
  spaceIndex,
  labelIndex,
  icons,
  width,
  offset,
}) => {
  return (
    <Widget
      offset={offset}
      width={width}
      side="left"
      color={color}
      onClick={() => run(`yabai -m space --focus ${spaceIndex}`)}
    >
      {icons.map((icon) => (
        <>
          <i class={`${icon}`} />
          &nbsp;
        </>
      ))}
      {labelIndex}
    </Widget>
  );
};

const initialAccumulateOffset = (initialOffset) => ({
  acc: [],
  offset: initialOffset,
});
const accumulateOffsetFromWidth = ({ acc, offset }, details) => {
  const newOffset = offset + details.width;
  return {
    acc: [
      ...acc,
      {
        ...details,
        offset,
      },
    ],
    offset: newOffset,
  };
};

const getColorForLayout = (layout) => {
  return (
    {
      bsp: "green",
      stack: "orange",
    }[layout] ?? "cyan"
  );
};

const WIDTH_MODE = 100;
const WIDTH_LAYOUT = 70;
const render = ({ spaces, windows, mode, focussed }) => {
  if (spaces == null) {
    return null;
  }

  const space = spaces.find((space) => space["is-visible"]);
  const showLayout = space != null && space?.type !== "bsp";

  let initialOffset = WIDTH_MODE;
  if (showLayout) {
    initialOffset += WIDTH_LAYOUT;
  }

  const children = spaces
    .map(getRenderDetailsForSpace(windows))
    .filter(({ nbWindows, focused }) => nbWindows > 0 || focused)
    .reduce(accumulateOffsetFromWidth, initialAccumulateOffset(initialOffset))
    .acc.map(renderSpace);

  const getColorForMode = () => {
    if (focussed) {
      return "green";
    }

    return (
      {
        work: "red",
        personal: "magenta",
      }[mode] ?? "blue"
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <Widget
        offset={0}
        width={WIDTH_MODE}
        color={getColorForMode()}
        side="left"
      >
        {mode}
      </Widget>
      {showLayout && (
        <Widget
          offset={WIDTH_MODE}
          side="left"
          color={getColorForLayout(space?.type)}
          width={WIDTH_LAYOUT}
        >
          {space?.type}
        </Widget>
      )}
      {children}
    </div>
  );
};

export default render;
