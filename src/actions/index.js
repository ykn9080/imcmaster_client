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
export const gvar = (type, value) => {
  return {
    type: type,
    payload: value
  };
};
