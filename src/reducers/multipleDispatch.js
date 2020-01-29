import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { globalVariable } from "../actions";
import { createStore } from "redux";
import { glovalVariableReducer } from "./";
const store = createStore(glovalVariableReducer);
export const gb = store.getState();

const MultiDispatch = obj => {
  /* 
for setting global variable easily
ex) MultiDispatch({name:"ykn", pass:"9080"})
*/
  const dispatch = useDispatch();
  useEffect(() => {
    const typelist = Object.keys(obj);
    typelist.map(async typ => {
      await dispatch(globalVariable({ [typ]: obj[typ] }));
    });
  }, []);
};
export default MultiDispatch;
