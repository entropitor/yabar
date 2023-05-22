import Left from "./lib/Left.jsx";

export const refreshFrequency = false;
export const command = "./yabar/scripts/left.sh 2";

export const render = ({ output }) => {
  return <Left output={output} />;
};

export default null;
