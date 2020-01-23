import React, { useEffect } from "react";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, globalVariable } from "../actions";
import MultiDispatch from "../reducers/multipleDispatch";

const Head = () => {
  const counter = useSelector(state => state.counter);
  const gvar1 = useSelector(state => state.global);
  const dispatch = useDispatch();
  const gval = { good: "low", happy: "girl" };
  MultiDispatch({ fast: "slow", ugly: "handsom" });
  useEffect(() => {
    // Update the document title using the browser API
    // const typelist = Object.keys(gval);
    // typelist.map(typ => {
    //   dispatch(globalVariable({ [typ]: gval[typ] }));
    // });
  }, []);

  return (
    <>
      <h3>Counter: {counter}</h3>
      <Button onClick={() => dispatch(increment())}>+</Button>
      <Button onClick={() => dispatch(decrement())}>-</Button>
      <Button onClick={() => dispatch(globalVariable(gval))}>init</Button>
      <Button onClick={() => dispatch(globalVariable({ four: "b123ad" }))}>
        chg
      </Button>
      <Button onClick={() => console.log(gvar1, gvar1.three)}>chg</Button>
    </>
  );
};

export default Head;
