const height = 20;
export const bar = {
  background: "rgba(46, 51, 64, 0.5)",
  zIndex: "-1",
  width: "100%",
  height: height + 12,
  position: "fixed",
  display: "flex",
  overflow: "hidden",
  top: "0px",
  right: "0px",
  left: "0px",
  WebkitBackdropFilter: "blur(15px)",
};

export const leftSide = {
  height,
  width: "50%",
  position: "fixed",
  display: "flex",
  overflow: "hidden",
  left: "0px",
  top: "0px",
  fontFamily: "Jetbrains Mono",
  fontSize: "8pt",
  lineHeight: "20px",
  color: "rgba(216, 222, 232, 1)",
  marginTop: 5,
};

export const rightSide = {
  height,
  position: "fixed",
  display: "flex",
  overflow: "hidden",
  right: "0px",
  top: "0px",
  fontFamily: "Jetbrains Mono",
  fontSize: "8pt",
  lineHeight: "20px",
  marginTop: 5,
  color: "rgba(216, 222, 232, 1)",
};
