import React, { useEffect } from "react";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, globalVariable } from "../actions";
import MultiDispatch from "../reducers/multipleDispatch";
import { menuHead } from "../fromImc/Common_menu";

const Head1 = () => {
  const counter = useSelector(state => state.counter);
  const global = useSelector(state => state.global);
  const dispatch = useDispatch();
  MultiDispatch({ fast: "slow", ugly: "handsom" });
  return (
    <>
      <h3>Counter: {counter}</h3>
      <Button onClick={() => dispatch(increment())}>+</Button>
      <Button onClick={() => dispatch(decrement())}>-</Button>
      <Button
        onClick={() => dispatch(globalVariable({ good: "low", happy: "girl" }))}
      >
        init
      </Button>
      <Button onClick={() => dispatch(globalVariable({ four: "b123ad" }))}>
        chg
      </Button>
      <Button onClick={() => console.log(global, global.three)}>chg</Button>
    </>
  );
};
const Head = () => {
  useEffect(() => {
    menuHead();
  }, []);
};
export default Head;
