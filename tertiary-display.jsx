import Left from "./lib/Left.jsx";

export const refreshFrequency = false;
export const command = "./powerbar/scripts/left.sh 3";

export const render = ({ output }) => {
  return <Left output={output} />;
};

export default null;
