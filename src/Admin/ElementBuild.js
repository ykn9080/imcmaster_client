import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { currentsetting } from "components/functions/config";
import ElementList from "./ElementList";
import ElementInput from "./ElementInput";
import Grid from "@material-ui/core/Grid";

const ElementBuild = props => {
  // const formArray1 = [
  //   {
  //     controlId: "name",
  //     name: "name",
  //     labelText: "Name",
  //     controlType: "input",
  //     placeholder: "Name"
  //   },
  //   {
  //     controlId: "labelText",
  //     name: "labeltext",
  //     labelText: "labelText",
  //     controlType: "input",
  //     placeholder: "label text"
  //   },
  //   {
  //     controlId: "placeholder",
  //     name: "placeholder",
  //     labelText: "PlaceHolder",
  //     controlType: "input",
  //     placeholder: "Placeholder"
  //   },
  //   {
  //     controlId: "controlType",
  //     name: "controltype",
  //     labelText: "Type",
  //     controlType: "select",
  //     placeholder: "Select type...",
  //     optionArray: [
  //       { text: "Text", value: "text" },
  //       { text: "Email", value: "email" },
  //       { text: "Password", value: "password" },
  //       { text: "Datetime", value: "datetime" },
  //       { text: "Number", value: "number" },
  //       { text: "Color", value: "color" }
  //     ]
  //   }
  // ];

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(globalVariable({ formData: formArray1 }));
  // }, []);
  //dispatch(globalVariable({ formData: formArray1 }));
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <ElementList eltype={["password", "email"]} />
      </Grid>
      <Grid item xs>
        <ElementInput />
      </Grid>
    </Grid>
  );
};

export default ElementBuild;
