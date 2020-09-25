import Widget from "./Widget.jsx";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const render = ({ output: date, offset }) => {
  if (date == null) {
    return null;
  }

  const dayOfWeek = date.getDay();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  const seconds = `${date.getSeconds()}`.padStart(2, "0");

  const dateStr = `${DAYS[dayOfWeek]} ${day}/${month}/${year}`;
  const timeStr = `${hours}:${minutes}:${seconds}`;

  return (
    <Widget offset={offset} width={render.WIDTH}>
      <i class="fas fa-calendar-alt" />
      &nbsp;{dateStr}&nbsp;
      <i class="fas fa-clock" />
      &nbsp;{timeStr}
    </Widget>
  );
};
render.WIDTH = 205;

export default render;
