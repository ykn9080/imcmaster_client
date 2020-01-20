import React, { Component, useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { currentsetting } from "../functions/config";
import { remotelogin } from "../functions/api";
import Join from "./Join";
import NavLogin from "./NavLogin";
const Login = props => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [state, setState] = useState({
    username: "",
    password: ""
  });
  const changeState = e => {
    const { name, value } = e.target;
    setState(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };
  const onSubmitHandler = event => {
    event.preventDefault();
    remotelogin(state.username, state.password);
  };

  return (
    <div style={{ padding: 5 }}>
      <Form>
        <FormGroup>
          <Label for="username">Email</Label>
          <Input
            type="text"
            name="username"
            placeholder="with a placeholder"
            onBlur={changeState}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="password placeholder"
            onBlur={changeState}
          />
        </FormGroup>
        <FormGroup className="container_nomargin">
          <Button color="primary" size="lg" block>
            Cancel
          </Button>
          <Button color="secondary" size="lg" onClick={onSubmitHandler}>
            Submit
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Login;
