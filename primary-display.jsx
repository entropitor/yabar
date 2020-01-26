import Left from "./lib/Left.jsx";

export const refreshFrequency = false;
export const command = "./powerbar/scripts/left.sh 1";

export const render = ({ output }) => {
  return <Left output={output} />;
};

export default null;
