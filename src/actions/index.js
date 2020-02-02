export const increment = () => {
  return {
    type: "INCREMENT"
  };
};
export const decrement = () => {
  return {
    type: "DECREMENT"
  };
};

//gloval variable collection
export const globalVariable = obj => {
  console.log({
    type: Object.keys(obj)[0],
    payload: obj[Object.keys(obj)[0]]
  });
  return {
    type: Object.keys(obj)[0],
    payload: obj[Object.keys(obj)[0]]
  };
};
