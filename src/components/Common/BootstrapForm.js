import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { Form, Button, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const BootstrapForm = () => {
  const formArray = [
    {
      controlId: "formEmail",
      labelText: "Email",
      controlType: "email",
      placeholder: "test placeholder",
      formText: "We'll never share your email with anyone else."
    },
    {
      controlId: "formPass",
      as: "row",
      labelText: "Password",
      controlType: "password",
      placeholder: "passwordr"
    },
    {
      controlId: "formCheckbox",
      labelText: "Check me out",
      controlType: "checkbox",
      formText: "This for testing checkbox"
    },
    {
      controlId: "formSelect",
      labelText: "Country",
      controlType: "select",
      placeholder: "Choose please...",
      optionArray: [
        { text: "korea", value: 0 },
        { text: "China", value: 1 }
      ],
      formText: "Please select your favorite country"
    },
    {
      controlType: "formRow",
      rowArray: [
        {
          controlId: "formGridCity",
          labelText: "City",
          controlType: "input"
        },
        {
          controlId: "formSelect1",
          labelText: "Country1",
          controlType: "select",
          optionArray: [
            { text: "Japan", value: 0 },
            { text: "Spain", value: 1 }
          ]
        },
        {
          controlId: "formGridzip",
          labelText: "Zip",
          controlType: "input"
        }
      ]
    },
    {
      controlId: "formButton",
      labelText: "Enter",
      controlType: "button",
      variant: "secondary"
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
  const FormLabel = props => {
    if (props.as === "row" && props.labelText !== "undefined")
      return <Form.Label sm="2">{props.labelText}</Form.Label>;
    else if (props.labelText !== "undefined")
      return <Form.Label>{props.labelText}</Form.Label>;
    else return null;
  };
  const FormControl = props => {
    console.log(props);
    return (
      <>
        <FormLabel {...props} />
        {props.as === "row" ? (
          <Col sm="10">
            <FormControlSwitch {...props} />
          </Col>
        ) : (
          <FormControlSwitch {...props} />
        )}
      </>
    );
  };
  const FormControlSwitch = props => {
    switch (props.controlType) {
      case "select":
        let optph = props.placeholder;
        if (optph === "undefined") optph = "Select...";
        return (
          <>
            <Form.Control as="select" value={props.formControlValue}>
              <option value="" selected disabled hidden>
                {optph}
              </option>
              {props.optionArray.map((k, index) => {
                return <option value={k.value}>{k.text}</option>;
              })}
            </Form.Control>
          </>
        );
      case "checkbox":
        return <Form.Check type="checkbox" label={props.labelText} />;
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
          <>
            <Form.Control
              type={props.controlType}
              placeholder={props.placeholder}
            />
          </>
        );
    }
  };
  const FormText = ({ text }) => {
    return typeof text === "undefined" ? null : (
      <Form.Text className="text-muted">{text}</Form.Text>
    );
  };

  const FormRow = props => {
    console.log(props);
    return (
      <Form.Row>
        {props.rowArray.map((k, i) => {
          return <FormGroup {...k} as={Col} />;
        })}
      </Form.Row>
    );
  };
  const FormGroup = props => {
    // if (props.as === "row") props = { ...props, as: { Row } };
    return props.as !== "undefined" ? (
      <Form.Group controlId={props.controlId} as={props.as}>
        <FormControl {...props} />
        <FormText text={props.formText} />
      </Form.Group>
    ) : (
      <Form.Group controlId={props.controlId}>
        <FormControl {...props} />
        <FormText text={props.formText} />
      </Form.Group>
    );
  };
  const Btn = props => {
    let variant = "primary",
      type = "submit",
      label = "Submit";
    if (props.variant != "undefined") variant = props.varient;
    if (props.controlType != "undefined") type = props.controlType;
    if (props.labelText != "undefined") label = props.labelText;
    return (
      <Button variant={variant} type={type} onClick={props.onClick}>
        {label}
      </Button>
    );
  };
  return (
    <>
      <Form>
        {formArray.map((k, i) => {
          let type = k.controlType;
          if (k.as == "row") type = "row";
          switch (type) {
            case "button":
              return <Btn {...k} />;
            case "formRow":
              return <FormRow {...k} />;
            case "row":
              return <FormGroup {...k} as="row" />;
            default:
              return <FormGroup {...k} />;
          }
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
            <Form.Label>Large Text</Form.Label>
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
      </Form>

      <Form>
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue="email@example.com" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default BootstrapForm;
