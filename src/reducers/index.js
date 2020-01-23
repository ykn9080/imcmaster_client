import { combineReducers } from "redux";

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};
const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return !state;
    default:
      return state;
  }
};
export const glovalVariableReducer = (state = {}, action) => {
  return { ...state, [action.type]: action.payload };
};

const allReducers = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducer,
  global: glovalVariableReducer
});

export default allReducers;
