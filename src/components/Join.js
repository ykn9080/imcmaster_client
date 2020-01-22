import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { sweetmsgautoclose } from "../fromImc/Common_make";
import "../styles/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";

const Jstyle = {
  lb: { paddingTop: "10px", textAlign: "left", width: "60px" },
  join: { width: "60%", float: "right", marginRight: "20px" },
  join1: {
    width: "17%",
    float: "right",
    margin: { top: 0, right: "10px", bottom: 0, left: "20px" }
  },
  join2: { width: "40%", float: "right", marginRight: "22px" },
  join3: { width: "40%", float: "right", marginRight: "5px" }
  // Label join: { borderBottom:{"solid", "1.5px", "#B7B7B7"},textAlign:left,fontWeight:normal}
};
const Join = props => {
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
  //   const onSubmitHandler = event => {
  //     event.preventDefault();
  //     remotelogin(state.username, state.password);
  //   };

  const samePass = e => {
    if (e.target.value != state.password) {
      sweetmsgautoclose("Error", "password mismatch!!!");
    }
  };
  const checkExist = e => {
    console.log(e.target.value);
  };
  return (
    <div id="dvjoin">
      <h1>Join </h1>
      <Form id="dvjoin1">
        <FormGroup style={{ display: "none" }}>
          <Label for="lbSysid">SysID</Label>
          <Label id="lbSysid"></Label>
          <Label id="lbSvcprovider"></Label>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} for="inpComp" lang="en">
            CompCode
          </Label>

          <Col sm={5}>
            <input
              type="text"
              name="inpComp"
              lang="en"
              className="join3 form-control"
              id="inpComp"
              placeholder="CompCode"
            />
          </Col>
          <Col sm={2}>
            <button
              type="button"
              onClick="checkexist($('#inpComp'));"
              className="join1 btn btn-default btn-primary btn-block"
              lang="en"
            >
              Check
            </button>
          </Col>
          <Col sm={1}>
            <img
              src="../images/help-icon.png"
              title="Ask your administrator your company code"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} for="id">
            Id
          </Label>
          <Col sm={7}>
            <Input type="text" name="id" id="exampleEmail" placeholder="ID" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} for="password">
            Password
          </Label>
          <Col sm={7}>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Password"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} for="passagain">
            Password Again
          </Label>
          <Col sm={7}>
            <Input
              type="password"
              name="passagain"
              id="passagain"
              placeholder="Password Again"
            />{" "}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} for="exampleSelect">
            Select
          </Label>
          <Col sm={7}>
            <Input type="select" name="select" id="exampleSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>{" "}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label className="lb"></Label>

          <div
            lang="en"
            //onclick="$('#dvcomp').toggle();$('#dvjoin1').toggle();$('#inpComp').prop('disabled', false);"
            className="join linkbtn"
          >
            or register new company
          </div>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} for="email">
            Email
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="email"
              placeholder="with a placeholder"
              //onBlur={onChangeEmail}
            />{" "}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} for="inpId">
            ID{" "}
          </Label>
          <Col sm={7}>
            <input
              name="inpId"
              type="text"
              onBlur={checkExist}
              placeholder="Email or id"
            />{" "}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} for="inpPass">
            Password
          </Label>
          <Col sm={7}>
            <input
              type="password"
              name="inpPass"
              placeholder="Password"
              onBlur={changeState}
            />{" "}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} for="inpPass1">
            PassAgain
          </Label>
          <Col sm={7}>
            <input
              type="password"
              name="inpPass1"
              className="join form-control"
              id="inpPass1"
              onBlur={samePass}
              placeholder="Password"
            />{" "}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} for="inpName">
            Name/Nic
          </Label>
          <Col sm={7}>
            <input
              type="text"
              name="inpName"
              id="inpName"
              placeholder="Name or nickname"
              onBlur={changeState}
            />{" "}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} for="inpEmail">
            Email
          </Label>
          <Col sm={7}>
            <input
              type="email"
              name="inpEamil"
              id="inpEmail"
              placeholder="Email"
              onBlur={changeState}
            />{" "}
          </Col>
        </FormGroup>
        <div
          className="join"
          style={{ textAlign: "right", marginRight: "20px" }}
        >
          <h5>
            Want log in? &nbsp;&nbsp;
            <button
              type="button"
              onclick="tabclick('login')"
              className="btn btn-success btn-xs"
            >
              Log In
            </button>
          </h5>
        </div>
        <FormGroup row>
          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block"
            // onclick={registration}
            id="btnRegister"
          >
            Register
          </button>
        </FormGroup>
      </Form>
      <Form id="dvcomp" style={{ display: "none", marginTop: "15px" }}>
        <FormGroup row>
          <Label sm={3} for="inpCompname">
            CompName
          </Label>
          <Col sm={7}>
            <span
              style={{
                color: "red",
                fontSize: "large",
                verticalAlign: "bottom"
              }}
            >
              *
            </span>
            <input
              className="join form-control"
              name="inpCompname"
              id="inpCompname"
              placeholder="Company Name"
            />{" "}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} for="inp">
            Language
          </Label>
          <Col sm={7}>
            {/* <select
            name="selLanguage"
            className="join form-control"
            id="selLanguage"
          >
            <option disabled="disabled">Select language!</option>
            <option value="korean">Korean</option>
            <option value="english">English</option>
          </select> */}
          </Col>
        </FormGroup>
        <FormGroup row>
          <button
            type="button"
            onclick="$('#dvcomp').hide();$('#dvjoin1').show();"
            className="btn btn-default"
            lang="en"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-default"
            onclick="$('#dvcomp').hide();$('#dvjoin1').show();tempsave();"
            lang="en"
          >
            OK
          </button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Join;
