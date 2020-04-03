import React, { useState, useEffect } from "react";
import _ from "lodash";
import $ from "jquery";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.min.css";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Button, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import AddBox from "@material-ui/icons/AddBox";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import "antd/dist/antd.css";
import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import BootFormElement from "components/Common/BootFormElement";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: 2
  }
}));

const ElementInput = props => {
  const formArray1 = [
    {
      controlId: "name",
      name: "name",
      labelText: "Name",
      controlType: "input",
      placeholder: "Name"
    },
    {
      controlId: "labelText",
      name: "labeltext",
      labelText: "labelText",
      controlType: "input",
      placeholder: "label text"
    },
    {
      controlId: "placeholder",
      name: "placeholder",
      labelText: "PlaceHolder",
      controlType: "input",
      placeholder: "Placeholder",
      value: "tsing"
    },
    {
      controlId: "controlType",
      name: "controltype",
      labelText: "Type",
      controlType: "select",
      placeholder: "Select type...",
      value: "email",
      optionArray: [
        { text: "Text", value: "text" },
        { text: "Email", value: "email" },
        { text: "Password", value: "password" },
        { text: "Datetime", value: "datetime-local" },
        { text: "Number", value: "number" },
        { text: "Color", value: "color" }
      ]
    }
  ];
  const dispatch = useDispatch();
  const [formArray, setFormArray] = useState([]);
  // let elementData = useSelector(state => state.global.elementData);
  useEffect(() => {
    setFormArray(formArray1);
  }, []);
  return (
    <Form>
      {formArray.map((k, i) => {
        return <BootFormElement {...k} key={i} />;
      })}
    </Form>
  );
  //return <h3>element input</h3>;
  // return (
  //   <Form>
  //     <Form.Group controlId="exampleForm.ControlInput1">
  //       <Form.Label>Email address</Form.Label>
  //       <Form.Control type="email" placeholder="name@example.com" />
  //     </Form.Group>
  //     <Form.Group controlId="exampleForm.ControlSelect1">
  //       <Form.Label>Example select</Form.Label>
  //       <Form.Control as="select">
  //         <option>1</option>
  //         <option>2</option>
  //         <option selected>3</option>
  //         <option>4</option>
  //         <option>5</option>
  //       </Form.Control>
  //     </Form.Group>
  //     <Form.Group controlId="exampleForm.ControlSelect2">
  //       <Form.Label>Example multiple select</Form.Label>
  //       <Form.Control as="select" multiple>
  //         <option>1</option>
  //         <option>2</option>
  //         <option>3</option>
  //         <option>4</option>
  //         <option>5</option>
  //       </Form.Control>
  //     </Form.Group>
  //     <Form.Group controlId="exampleForm.ControlTextarea1">
  //       <Form.Label>Example textarea</Form.Label>
  //       <Form.Control as="textarea" rows="3" />
  //     </Form.Group>
  //   </Form>
  // );
};

export default ElementInput;
