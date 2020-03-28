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
      name: "email",
      controlType: "email",
      placeholder: "test placeholder",
      formText: "We'll never share your email with anyone else."
    },
    {
      controlId: "formPass",
      as: "row",
      name: "password",
      labelText: "Password",
      controlType: "password",
      placeholder: "passwordr"
    },
    {
      labelText: "Email",
      as: "row",
      controlId: "formPlaniText",
      defaultValue: "email@example.com",
      controlType: "plaintext"
    },
    {
      controlId: "radi",
      labelText: "formRadio",
      as: "row",
      controlType: "radio",
      name: "formctlname",
      optionArray: [
        { text: "korea", value: 0 },
        { text: "China", value: 1 },
        { text: "usa", value: 2 }
      ],
      formText: "Please select your favorite country"
    },
    {
      controlId: "radi1",
      labelText: "formRadio1",
      as: "row",
      controlType: "radio",
      name: "formctlname1",
      optionArray: [
        { text: "korea1", value: 10 },
        { text: "China1", value: 11 },
        { text: "usa1", value: 12 }
      ]
    },
    {
      controlId: "formCheckbox",
      name: "formcheckbox",
      label: "Check me out",
      controlType: "checkbox",
      formText: "This for testing checkbox"
    },
    {
      controlId: "formSelect",
      labelText: "Country",
      name: "country",
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
    console.log(event.target.value, event.target.name);
    let val = event.target.value;
    let name = event.target.name;
    setCtrlname(val);
    event.preventDefault();
    setValues(values => ({
      ...values,
      [name]: val
    }));
  };

  //radio의 target.name을 인식하지 못하여
  const [ctrlname, setCtrlname] = useState({});
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
    console.log(values);
  };

  const FormControl = props => {
    const FormLabel = props => {
      if (props.as === "row" && props.labelText !== "undefined")
        return (
          <Form.Label column sm="2">
            {props.labelText}
          </Form.Label>
        );
      else if (props.labelText !== "undefined")
        return <Form.Label>{props.labelText}</Form.Label>;
      else return null;
    };
    const FormControlSwitch = props => {
      switch (props.controlType) {
        case "select":
          let optph = props.placeholder;
          if (optph === "undefined") optph = "Select...";
          return (
            <>
              <Form.Control
                as="select"
                name={props.name}
                value={props.formControlValue}
                onChange={handleChange}
              >
                <option value="" selected disabled hidden>
                  {optph}
                </option>
                {props.optionArray.map((k, index) => {
                  return <option value={k.value}>{k.text}</option>;
                })}
              </Form.Control>
            </>
          );
        case "plaintext":
          return (
            <Form.Control
              plaintext
              readOnly
              defaultValue={props.defaultValue}
            />
          );
        case "checkbox":
          return (
            <Form.Check
              custom
              type={props.type}
              label={props.label}
              onChange={(this, e) => {
                console.log(this, e);
                e.preventDefault();
                setValues(values => ({
                  ...values,
                  [props.name]: k.value
                }));
              }}
            />
          );
        case "radio":
          return (
            <Col sm={10}>
              {props.optionArray.map((k, index) => {
                return (
                  <Form.Check
                    custom={true}
                    inline={true}
                    type="radio"
                    label={k.text}
                    id={props.name + index}
                    checked={k.value === values[props.name]}
                    onChange={e => {
                      e.preventDefault();
                      setValues(values => ({
                        ...values,
                        [props.name]: k.value
                      }));
                    }}
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
                name={props.labelText}
                value={values[props.labelText]}
                onBlur={handleChange}
              />
            </>
          );
      }
    };
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

  const FormText = ({ text }) => {
    return typeof text === "undefined" ? null : (
      <Form.Text className="text-muted">{text}</Form.Text>
    );
  };

  const FormRow = props => {
    return (
      <Form.Row>
        {props.rowArray.map((k, i) => {
          return <FormGroup {...k} as={Col} />;
        })}
      </Form.Row>
    );
  };
  const FormGroup = props => {
    //if (props.as === "row") props = { ...props, as: { Row } };
    return props.as === "row" ? (
      <Form.Group controlId={props.controlId} as={Row}>
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
      <Button variant={variant} type={type} onClick={handleSubmit}>
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
      </Form>
      <Form>
        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Radios
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="first radio"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
            />
            <Form.Check
              type="radio"
              label="second radio"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
            />
            <Form.Check
              type="radio"
              label="third radio"
              name="formHorizontalRadios"
              id="formHorizontalRadios3"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Remember me" />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Sign in</Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default BootstrapForm;
