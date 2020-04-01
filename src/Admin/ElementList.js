import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { currentsetting } from "components/functions/config";
import { Card, Button, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CardSimple from "components/Common/CardSimple";
import BootFormElement from "components/Common/BootFormElement";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      width: theme.spacing(40),
      height: theme.spacing(30)
    }
  }
}));

const ElementList = props => {
  const classes = useStyles();

  const [elArray, setElArray] = useState([]);
  const [eltype, setEltype] = useState(props.eltype);
  const [selectedValue, setSelectedValue] = useState(0);

  const handleChange = event => {
    setSelectedValue(event.target.value);
    console.log(selectedValue, event.target.value);
  };

  const formrow = dt => {
    return dt;
  };
  useEffect(() => {
    let qrystr = "";
    eltype.map((k, i) => {
      qrystr += k + "&controlType=";
    });

    axios
      .get(
        `${currentsetting.webserviceprefix}formelement/id?controlType=${qrystr}`
      )
      .then(function(response) {
        // if (response.data.data != "undefined")
        console.log(response.data);
        if (response.data.length > 0) setElArray(formrow(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
  }, [eltype]);

  return (
    <div className={classes.root}>
      {elArray.map((k, i) => {
        return (
          <Paper elevation={3} key={i}>
            <Radio
              checked={selectedValue.toString() === i.toString()}
              onChange={handleChange}
              value={i}
              name="radio-button-demo"
              inputProps={{ "aria-label": i }}
            />
            <BootFormElement {...k} />
          </Paper>
        );
      })}
    </div>
  );
};

export default ElementList;
