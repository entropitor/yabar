const getColorDetails = color => {
  const black = "#4c566a";
  const white = "#ebeff3";
  const arrowLight = white;

  switch (color) {
    case "white": {
      return {
        arrowLight,
        background: white,
        text: black
      };
    }
    case "green": {
      return {
        arrowLight,
        background: "#99cc99",
        text: black
      };
    }
    case "yellow": {
      return {
        arrowLight,
        background: "#ffcc66",
        text: black
      };
    }
    case "orange": {
      return {
        arrowLight,
        background: "#f99157",
        text: black
      };
    }
    case "red": {
      return {
        arrowLight,
        background: "#f2777a",
        text: black
      };
    }
    default: {
      return {
        arrowLight,
        background: "#4c566a",
        text: white
      };
    }
  }
};
const render = ({ children, width, offset, color }) => {
  const colorDetails = getColorDetails(color);

  const containerStyle = {
    height: "100%",
    width: `${width}px`,
    position: "absolute",
    right: `${offset}px`,
    top: "0px"
  };

  const arrowStyle = {
    height: "0",
    width: "0",
    borderTop: "10px solid transparent",
    borderBottom: "10px solid transparent",
    borderRight: `10px solid ${colorDetails.background}`,
    position: "absolute",
    right: `${width}px`
  };
  const arrowLightStyle = {
    ...arrowStyle,
    borderRight: `10px solid ${colorDetails.arrowLight}`,
    right: `${width + 1}px`
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
