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

const Example = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const remotelogin = () => {
    console.log("hhh");
  };
  const onSubmitHandler = event => {
    event.preventDefault();
    alert("You are submitting " + username + password);
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
    <div className="container">
      <div>
        <Table dark>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div>
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
    </div>
  );
};

class Counter extends Component {
  state = {
    value: 1
  };

  render() {
    return <div> hi {this.state.value} </div>;
  }
}
class login extends Component {
  constructor() {
    super();
    this.styles = {
      color: "white"
    };
  }
  render() {
    return (
      <div id="dvLogin" className="tab-pane active">
        <div>
          <h1>IMCMaster Login </h1>
        </div>
        <div className="form-group">
          <input
            ID="UserName"
            className="form-control input-lg textEntry"
            placeholder="User ID"
          />
        </div>
        <div className="form-group">
          <input
            ID="Password"
            type="password"
            className="form-control input-lg passwordEntry"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <input
            type="button"
            className="btn btn-primary btn-lg btn-block"
            value="Log In"
            ValidationGroup="LoginUserValidationGroup"
            onclick="remotelogin();"
          />
          <input
            type="button"
            className="btn btn-secondary btn-lg btn-block"
            value="Cancel"
            onclick="toggleLogin('cancel')"
          />
        </div>
        <div className="form-group">
          <label className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="RememberMe"
            />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">Remember</span>
          </label>
          <span className="pull-right">
            <a href="#" onclick="tabclick('join')">
              New Registration
            </a>
          </span>
        </div>
        <label id="lbError" style="color:Red;font-size:larger" />
      </div>
    );
  }
}

export default Example;
