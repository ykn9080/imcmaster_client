import React from "react";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../actions";

const Head = () => {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  return (
    <>
      <h3>Counter: {counter}</h3>
      <Button onClick={() => dispatch(increment())}>+</Button>
      <Button onClick={() => dispatch(decrement())}>-</Button>
    </>
  );
};

export default Head;
