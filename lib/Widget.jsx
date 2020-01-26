const colors = {
  black: "#2d2d2d",
  red: "#f2777a",
  green: "#99cc99",
  yellow: "#ffcc66",
  blue: "#6699cc",
  magenta: "#cc99cc",
  cyan: "#66cccc",
  white: "#d3d0c8",
  gray: "#4c566a",
  whiteGray: "#ebeff3",
  orange: "#f99157",
  brightBlack: "#747369"
};
const getColorDetails = color => {
  const {
    gray: textDark,
    whiteGray,
    green,
    yellow,
    orange,
    red,
    gray
  } = colors;
  const arrow = whiteGray;

  switch (color) {
    case "cyan":
    case "green":
    case "orange":
    case "red":
    case "whiteGray":
    case "yellow": {
      const background = colors[color];
      return {
        arrow,
        background,
        text: textDark
      };
    }
    case "white": {
      return {
        arrow,
        background: whiteGray,
        text: textDark
      };
    }
    default: {
      const background = colors[color] || gray;
      return {
        arrow,
        background,
        text: whiteGray
      };
    }
  }
};
const render = ({ children, width, offset, color, side = "right" }) => {
  const colorDetails = getColorDetails(color);
  const isLeftWidget = side === "left";

  const leftOrRight = isLeftWidget ? "left" : "right";
  const borderLeftOrRight = isLeftWidget ? "borderLeft" : "borderRight";

  const containerStyle = {
    height: "100%",
    width: `${width}px`,
    position: "absolute",
    [leftOrRight]: `${offset}px`,
    top: "0px"
  };

  const arrowStyle = {
    height: "0",
    width: "0",
    borderTop: "10px solid transparent",
    borderBottom: "10px solid transparent",
    [borderLeftOrRight]: `10px solid ${colorDetails.background}`,
    position: "absolute",
    [leftOrRight]: `${width}px`
  };
  const arrowLightStyle = {
    ...arrowStyle,
    [borderLeftOrRight]: `10px solid ${colorDetails.arrow}`,
    [leftOrRight]: `${width + 1}px`
  };
  const contentStyle = {
    height: "100%",
    width: `${width}px`,
    background: `${colorDetails.background}`,
    textAlign: "center",
    color: `${colorDetails.text}`
  };

  return (
    <div style={containerStyle}>
      <div style={arrowLightStyle} />
      <div style={arrowStyle} />
      <div style={contentStyle}>{children}</div>
    </div>
  );
};

export default render;
