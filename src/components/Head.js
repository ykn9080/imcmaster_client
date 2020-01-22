import React from "react";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, gvar } from "../actions";

const Head = () => {
  const counter = useSelector(state => state.counter);
  const gvar = useSelector(state => state.gvar);
  const dispatch = useDispatch();

  return (
    <>
      <h3>Counter: {counter}</h3>
      <Button onClick={() => dispatch(increment())}>+</Button>
      <Button onClick={() => dispatch(decrement())}>-</Button>
      <Button onClick={() => dispatch(gvar("one", "hi"))}>-</Button>
    </>
  );
};

export default Head;
