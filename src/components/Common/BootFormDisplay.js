import React, { useState, useEffect } from "react";
import _ from "lodash";
import $ from "jquery";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.min.css";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import axios from "axios";
import { currentsetting } from "components/functions/config";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Button, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BootFormBuilder from "./BootFormBuilder";
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
import SpeedDialButton from "./SpeedDial";
import BootFormElement from "./BootFormElement";
import ElementInput from "Admin/ElementInput";
import DialogFull from "./DialogFull";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: 2
  }
}));

const BootFormDisplay = props => {
  const formArray1 = [
    // {
    //   controlId: "formEmail",
    //   labelText: "Email",
    //   name: "email",
    //   controlType: "email",
    //   placeholder: "test placeholder",
    //   formText: "We'll never share your email with anyone else."
    // },
    {
      controlId: "formPass",
      as: "row",
      name: "password",
      labelText: "Password",
      controlType: "password",
      placeholder: "passwordr"
    },
    // {
    //   labelText: "Email",
    //   as: "row",
    //   controlId: "formPlaniText",
    //   defaultValue: "email@example.com",
    //   controlType: "plaintext"
    // },
    // {
    //   controlId: "radi",
    //   labelText: "formRadio",
    //   as: "row",
    //   controlType: "radio",
    //   name: "formctlname",
    //   optionArray: [
    //     { text: "korea", value: 0 },
    //     { text: "China", value: 1 },
    //     { text: "usa", value: 2 }
    //   ],
    //   formText: "Please select your favorite country"
    // },
    // {
    //   controlId: "radi1",
    //   labelText: "formRadio1",
    //   as: "row",
    //   controlType: "radio",
    //   name: "formctlname1",
    //   optionArray: [
    //     { text: "korea1", value: 10 },
    //     { text: "China1", value: 11 },
    //     { text: "usa1", value: 12 }
    //   ]
    // },
    // {
    //   controlId: "formCheckbox",
    //   name: "formcheckbox",
    //   label: "Check me out",
    //   controlType: "checkbox",
    //   formText: "This for testing checkbox"
    // },
    // {
    //   controlId: "formSelect",
    //   labelText: "Country",
    //   name: "country",
    //   controlType: "select",
    //   placeholder: "Choose please...",
    //   optionArray: [
    //     { text: "korea", value: 0 },
    //     { text: "China", value: 1 }
    //   ],
    //   formText: "Please select your favorite country"
    // },
    {
      controlType: "formRow",
      rowArray: [
        {
          controlId: "formGridCity",
          name: "city",
          labelText: "City",
          controlType: "input"
        },
        {
          controlId: "formSelect1",
          labelText: "Country1",
          name: "country1",
          controlType: "select",
          optionArray: [
            { text: "Japan", value: 0 },
            { text: "Spain", value: 1 }
          ]
        },
        {
          controlId: "formGridzip",
          name: "zip",
          labelText: "Zip",
          controlType: "input"
        }
      ]
    }
    // {
    //   controlId: "formButton",
    //   labelText: "Enter",
    //   controlType: "button",
    //   variant: "secondary"
    // }
  ];
  console.log(props);
  //let formArray = useSelector(state => state.global.formData);

  // if (formArray === "undefined") formArray = [];
  const classes = useStyles();
  const [values, setValues] = useState({});
  //let [formArray, setFormArray] = useState([]);
  useEffect(() => {
    // axios
    //   .get(
    //     `${currentsetting.webserviceprefix}bootform/id?pathname=${props.pathname}`
    //   )
    //   .then(function(response) {
    //     setFormArray(response.data[0].data);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
    // console.log(props.formArray);
    // if (props.formArray !== "undefined")
    //setFormArray(props.formArray);

    //$(refs.sortable);
    const $node = $(".SortForm");

    $node.sortable({
      opacity: 0.8,
      start: function(event, ui) {
        var start_pos = ui.item.index();
        ui.item.data("start_pos", start_pos);
      },
      update: function(event, ui) {
        var start_pos = ui.item.data("start_pos");
        var end_pos = ui.item.index();
        //$('#sortable li').removeClass('highlights');
        console.log(start_pos, end_pos);
      }
    });
    return () => {
      $node.sortable();
    };
  }, []);

  let edit = useSelector(state => state.global.formEdit);
  //let elData = useSelector(state => state.global.elementData);
  let open = useSelector(state => state.global.openDialog);

  //radio의 target.name을 인식하지 못하여
  const dispatch = useDispatch();

  return (
    <>
      <Form className={"SortForm"}>
        {props.formArray.map((k, i) => {
          return <BootFormElement {...k} key={i} />;
        })}
      </Form>
      {edit && (
        <>
          <SpeedDialButton />
          <DialogFull open={open}>
            <ElementInput />
          </DialogFull>
        </>
      )}
    </>
  );
};

export default BootFormDisplay;
