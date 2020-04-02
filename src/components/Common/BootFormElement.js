import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Button, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: 2
  }
}));

const BootFormElement = props => {
  const classes = useStyles();
  const [values, setValues] = useState({});

  const handleChange = event => {
    let val = event.target.value;
    let name = event.target.name;
    setCtrlname(val);
    event.preventDefault();
    setValues(values => ({
      ...values,
      [name]: val
    }));
  };
  let edit = useSelector(state => state.global.formEdit);

  //radio의 target.name을 인식하지 못하여
  const [ctrlname, setCtrlname] = useState({});
  const dispatch = useDispatch();

  let open = useSelector(state => state.global.openDialog);

  const FormControl = props => {
    const EditDel = props => {
      const deleteHandler = id => {
        console.log(id);
      };
      const editHandler = id => {
        dispatch(globalVariable({ openDialog: true }));
        dispatch(globalVariable({ elementData: props }));
        open = true;
        console.log(id);
      };

      return (
        edit && (
          <>
            <EditOutlined
              className={classes.icon}
              onClick={() => editHandler(props.controlId)}
            />
            <DeleteOutlined
              className={classes.icon}
              onClick={() => deleteHandler(props.controlId)}
            />
          </>
        )
      );
    };

    const FormLabel = props => {
      if (props.as === "row" && props.labelText !== "undefined")
        return (
          <>
            <Form.Label column sm="2">
              <EditDel {...props} />
              {props.labelText}
            </Form.Label>
          </>
        );
      else if (props.labelText !== "undefined") {
        return (
          <>
            <Form.Label>
              <EditDel {...props} />
              {props.labelText}
            </Form.Label>
          </>
        );
      } else return null;
      // <>
      //   <EditDel {...props} />
      // </>
    };
    const FormControlSwitch = props => {
      let val = "";
      if (typeof props.value !== "undefined") val = props.value;
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
                <option value="" defaultValue disabled hidden>
                  {optph}
                </option>
                {props.optionArray.map((k, index) => {
                  return val === k.value ? (
                    <option key={k.value} value={k.value} selected>
                      {k.text}
                    </option>
                  ) : (
                    <option key={k.value} value={k.value}>
                      {k.text}
                    </option>
                  );
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
          if (typeof values[props.name] === "undefined")
            setValues(values => ({
              ...values,
              [props.name]: false
            }));
          return (
            <Form.Check
              custom
              type={props.type}
              label={props.label}
              checked={values[props.name]}
              onChange={e => {
                e.preventDefault();
                setValues(values => ({
                  ...values,
                  [props.name]: !values[props.name]
                }));
              }}
            />
          );
        case "radio":
          return (
            <Col sm={10}>
              {props.optionArray.map((k, index) => {
                let inlinee = k.inline;
                return (
                  <Form.Check
                    key={k.value}
                    custom={true}
                    inline={inlinee}
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
                value={val}
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
          return (
            <FormGroup {...k} key={k.controlId} as={Col} edit={props.edit} />
          );
        })}
      </Form.Row>
    );
  };
  const FormGroup = props => {
    //if (props.as === "row") props = { ...props, as: { Row } };
    return props.as === "row" ? (
      <Form.Group key={props.controlId} controlId={props.controlId} as={Row}>
        <FormControl {...props} />
        <FormText text={props.formText} />
      </Form.Group>
    ) : (
      <Form.Group key={props.controlId} controlId={props.controlId}>
        <FormControl {...props} />
        <FormText text={props.formText} />
      </Form.Group>
    );
  };
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
  let type = props.controlType;
  if (props.as == "row") type = "row";

  return (
    <>
      {(() => {
        switch (type) {
          case "button":
            return <Btn {...props} edit={props.edit} />;
          case "formRow":
            return <FormRow {...props} edit={props.edit} />;
          case "row":
            return <FormGroup {...props} edit={props.edit} as="row" />;
          default:
            return <FormGroup {...props} edit={props.edit} />;
        }
      })()}
    </>
  );
};

export default BootFormElement;
