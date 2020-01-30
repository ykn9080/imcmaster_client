import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "../styles/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { currentsetting } from "../functions/config";
import { remotelogin } from "../functions/api";
import Join from "./Join";
import NavLogin from "./NavLogin";
import useForm from "../functions/useForm";
import logo from "../images/logo/imc1_1.png";
import imclogo from "../images/logo/imcmaster.png";

const Login = props => {
  const { values, handleChange, handleSubmit } = useForm(remotelogin);

  const Style = {
    dv: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    fg: { width: "500px" }
  };
  return (
    <div style={Style.dv}>
      <img src={logo} className="d-inline-block align-top" width="40" />
      <img src={imclogo} className="d-inline-block align-top" />
      <Form>
        <FormGroup style={Style.fg}>
          <Label for="username">Email</Label>
          <Input
            type="text"
            name="username"
            placeholder="with a placeholder"
            onBlur={handleChange}
          />
        </FormGroup>
        <FormGroup style={Style.fg}>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="password placeholder"
            onBlur={handleChange}
          />
        </FormGroup>
        <FormGroup style={Style.fg} className="container_nomargin">
          <Link to="/" exact>
            <Button color="primary" size="lg" block>
              Cancel
            </Button>
          </Link>
          <Link to="/" exact></Link>
          <Button color="secondary" size="lg" onClick={handleSubmit}>
            Submit
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Login;
