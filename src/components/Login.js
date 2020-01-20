import React, { Component, useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Table
} from "reactstrap";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { currentsetting } from "../functions/config";
import { remotelogin } from "../functions/api";
import axios from "axios";
import Join from "./Join";
import NavLogin from "./NavLogin";
const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = event => {
    event.preventDefault();
    console.log(currentsetting);
    remotelogin(username, password);
  };
  const onChangeEmail = event => {
    setUsername(event.target.value);
    //this.setState({username: event.target.value});
  };
  const onChangePass = event => {
    setPassword(event.target.value);
    //this.setState({password: event.target.value});
  };
  return (
    <div style={{ padding: 5 }}>
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="text"
            name="email"
            id="exampleEmail"
            placeholder="with a placeholder"
            onBlur={onChangeEmail}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="password placeholder"
            onChange={onChangePass}
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
