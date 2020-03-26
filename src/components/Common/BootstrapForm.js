import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { Form, Button, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const BootstrapForm = () => {
  const formArray = [
    {
      labelText: "Email",
      controlType: "email",
      placeholder: "test placeholder",
      formText: "We'll never share your email with anyone else."
    }
  ];
  const [values, setValues] = useState({});
  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };
  const dispatch = useDispatch();
  const handleSubmit = async e => {
    e.preventDefault();
    // axios
    //   .post(`${currentsetting.webserviceprefix}login`, values)
    //   .then(function(response) {
    //     const dt = response.data;
    //     dispatch(globalVariable({ token: dt.token }));
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  };
  const FormGroup = props => {
    const FormControlSwitch = props => {
      console.log(props);
      switch (props.type) {
        case "select":
          return (
            <Form.Control as="select" value={props.formControlValue}>
              {props.optionArray.map((k, index) => {
                return <option value={k.value}>{k.text}</option>;
              })}
            </Form.Control>
          );
        case "checkbox":
          return <Form.Check type="checkbox" label={props.formCheckLabel} />;
        case "radio":
          return (
            <Col sm={10}>
              {props.radioArray.map((k, index) => {
                return (
                  <Form.Check
                    type="radio"
                    label={k.label}
                    name={k.name}
                    id={k.name + index}
                  />
                );
              })}
            </Col>
          );
        default:
          return (
            <Form.Control
              type={props.controlType}
              placeholder={props.placeholder}
            />
          );
      }
    };
    const formText = ({ message }) => {
      return <Form.Text className="text-muted">{message}</Form.Text>;
    };
    console.log(props.formText, typeof props.formText);
    return (
      <Form.Group controlId={props.controlId}>
        <Form.Label>{props.labelText}</Form.Label>
        <FormControlSwitch
          type={props.controlType}
          placeholder={props.placeholder}
        />
        {typeof props.formText != "undefined" ? (
          <Form.Text className="text-muted">{props.formText}</Form.Text>
        ) : (
          ""
        )}
      </Form.Group>
    );
  };
  return (
    <>
      <Form>
        {formArray.map((k, i) => {
          console.log(k);
          return <FormGroup {...k} />;
        })}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit1
        </Button>
      </Form>
      <Form>
        <Form.Row>
          <Col>
            <Form.Group controlId="formBasicPassword1">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Control placeholder="Last name" />
          </Col>
          <Col>
            <Form.Control placeholder="Last name" />
          </Col>
          <Col>
            <Form.Control placeholder="Last name" />
          </Col>
          <Col>
            <Form.Control placeholder="Last name" />
          </Col>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control as="select" value="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Form.Row>
      </Form>

      <Form>
        <Form.Group>
          <Form.Row>
            <Form.Label column="lg" lg={4}>
              Large Text
            </Form.Label>
            <Col>
              <Form.Control size="lg" type="text" placeholder="Large text" />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Label column lg={2}>
              Normal Text
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Normal text" />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Label column="sm" lg={2}>
              Small Text
            </Form.Label>
            <Col>
              <Form.Control size="sm" type="text" placeholder="Small text" />
            </Col>
          </Form.Row>
        </Form.Group>
        */}
      </Form>
    </>
  );
};

export default BootstrapForm;
