import React, { useEffect, useState } from "react";
import axios from "axios";
import { currentsetting } from "components/functions/config";
import BootFormDisplay from "./BootFormDisplay";
import { Button } from "reactstrap";

const BootFormBuilder = () => {
  const pathname = encodeURIComponent(window.location.pathname);
  let [formArray, setFormArray] = useState([]);
  useEffect(() => {
    axios
      .get(`${currentsetting.webserviceprefix}bootform/id?pathname=${pathname}`)
      .then(function(response) {
        console.log(response.data[0].data);
        console.log(response.data[0].data);
        // if (response.data.data != "undefined")
        setFormArray(JSON.parse(response.data[0].data));
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);
  const run = () => {
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
    const tt = {
      name: "first",
      desc: "input form test",
      pathname: "/controledit1",
      seq: 1,
      comp: "5d37e3627fefc084e3f05e82",
      data: JSON.stringify(formArray1)
    };
    axios.put(
      `${currentsetting.webserviceprefix}bootform/5e8054063346b1dd6ce970aa`,
      tt
    );
  };
  return (
    <>
      <BootFormDisplay formArray={formArray} edit={true} />
      <Button onClick={run}>Click</Button>
    </>
  );
};

export default BootFormBuilder;
