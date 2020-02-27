import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";

export const EditForm = () => {
  let show = useSelector(state => state.global.menuedit);
  return show ? <h1>input form</h1> : "";
};
