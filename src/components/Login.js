import React, { Component, useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "../styles/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { currentsetting } from "../functions/config";
import { remotelogin } from "../functions/api";
import Join from "./Join";
import NavLogin from "./NavLogin";
import useForm from "../functions/useForm";

const Login = props => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [state, setState] = useState({
  //   username: "",
  //   password: ""
  // });
  // const handleChange = e => {
  //   const { name, value } = e.target;
  //   setState(prevState => {
  //     return {
  //       ...prevState,
  //       [name]: value
  //     };
  //   });
  // };
  // const handleSubmit = event => {
  //   event.preventDefault();
  //   remotelogin(state.username, state.password);
  // };
  const { values, handleChange, handleSubmit } = useForm(remotelogin);
  function login() {
    console.log(values);
  }

  // const onChangeEmail = event => {
  //   //setUsername(event.target.value);
  //   handleChange(state.username, event.target.value);
  //   setState(prevState => {
  //     return {
  //       ...prevState,
  //       username: event.target.value
  //     };
  //   });
  //   //this.setState({username: event.target.value});
  // };
  // const onChangePass = event => {
  //   handleChange(event.target.name, event.target.value);
  //   setState(prevState => {
  //     return {
  //       ...prevState,
  //       password: event.target.value
  //     };
  //   });
  //   //setPassword(event.target.value);
  //   //this.setState({password: event.target.value});
  // };
  return (
    <div style={{ padding: 5 }}>
      <Form>
        <FormGroup>
          <Label for="username">Email</Label>
          <Input
            type="text"
            name="username"
            placeholder="with a placeholder"
            onBlur={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="password placeholder"
            onBlur={handleChange}
          />
        </FormGroup>
        <FormGroup className="container_nomargin">
          <Button color="primary" size="lg" block>
            Cancel
          </Button>
          <Button color="secondary" size="lg" onClick={handleSubmit}>
            Submit
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Login;
