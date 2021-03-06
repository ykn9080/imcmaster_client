import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import axios from "axios";
import { currentsetting } from "components/functions/config";
import BootFormDisplay from "./BootFormDisplay";
import { Button } from "reactstrap";

import { PlusSquareOutlined } from "@ant-design/icons";
import DialogFull from "./DialogFull";
import Switchs from "./Switch";
import Grid from "@material-ui/core/Grid";

const BootFormBuilder = props => {
  const pathname = encodeURIComponent(window.location.pathname);
  let [formArray, setFormArray] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     setOpen(props.open);
  //   }, [props.open]);

  useEffect(() => {
    axios
      .get(
        `${currentsetting.webserviceprefix}bootform/id?pathname=${props.pathname}`
      )
      .then(function(response) {
        // if (response.data.data != "undefined")

        setFormArray(response.data[0].data);
        console.log(formArray);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const formArray1 = [
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
    },
    {
      controlId: "formButton",
      labelText: "Enter",
      controlType: "button",
      variant: "secondary"
    }
  ];

  return (
    <>
      {/* <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="flex-start"
      >
       
      </Grid> */}
      <BootFormDisplay formArray={formArray} />
    </>
  );
};

export default BootFormBuilder;
