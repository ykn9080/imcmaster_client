import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Button, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useConfirm } from "material-ui-confirm";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: 2
  }
}));

const BootFormElement = props => {
  const classes = useStyles();
  const confirm = useConfirm();
  const [values, setValues] = useState({ name: "bill" });
  //radio의 target.name을 인식하지 못하여
  const [ctrlname, setCtrlname] = useState({});

  const handleChange = event => {
    console.log(values);
    let val = event.target.value;
    let name = event.target.name;
    // console.log(val, name);
    event.persist();
    setCtrlname(val);
    setValues(values => ({
      ...values,
      [name]: val
    }));
  };
  const testHandle = e => {
    console.log(values);
  };
  const [formsave, setFormsave] = useState({});

  let edit = useSelector(state => state.global.formEdit);

  const dispatch = useDispatch();

  let open = useSelector(state => state.global.openDialog);

  const FormControl = props => {
    const EditDel = props => {
      const deleteHandler = id => {
        confirm({ description: "This action is permanent!" }).then(() => {
          console.log(id);
        });
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
                onChange={e => {
                  e.persist();
                  setValues(values => ({
                    ...values,
                    [props.name]: !values[props.name]
                  }));
                  console.log(values[props.name], props.name, values);
                }}
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
                e.persist();
                setValues(values => ({
                  ...values,
                  [props.name]: !values[props.name]
                }));
                console.log(values[props.name], props.name, values);
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
                      e.persist();
                      setValues(values => ({
                        ...values,
                        [props.name]: k.value
                      }));
                      console.log(
                        k.value,
                        values[props.name],
                        props.name,
                        values
                      );
                    }}
                  />
                );
              })}
            </Col>
          );
        // case "range":case "color": case "datetime-local":
        //   return (
        //     <>
        //       <Form.Control
        //         //type={props.controlType}
        //         type="color"
        //         placeholder={props.placeholder}
        //         name={props.labelText}
        //         value={val}
        //         onChange={handleChange}
        //       />
        //     </>
        //   );
        default:
          return (
            <>
              <Form.Control
                //type={props.controlType}
                type="text"
                placeholder={props.placeholder}
                name={props.labelText}
                value={values[props.labelText]}
                onBlur={handleChange}
              />
              {/* <input
                type="text"
                class="form-control"
                placeholder={props.placeholder}
                name={props.labelText}
                value={values[props.labelText]}
                onBlur={handleChange}
              /> */}
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
            return (
              <>
                <FormGroup {...props} edit={props.edit} />
                <Button onClick={testHandle}>test</Button>
              </>
            );
        }
      })()}
    </>
  );
};

export default BootFormElement;
