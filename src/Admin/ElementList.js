import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { currentsetting } from "components/functions/config";
import BootFormElement from "components/Common/BootFormElement";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      minWidth: theme.spacing(40),
      minHeight: theme.spacing(20)
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
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <div className={classes.root}>
          {elArray.map((k, i) => {
            return (
              <Paper key={i}>
                <Grid container spacing={1}>
                  <Grid item xs={2}>
                    <Radio
                      checked={selectedValue.toString() === i.toString()}
                      onChange={handleChange}
                      value={i}
                      name="radio-button-demo"
                      inputProps={{ "aria-label": i }}
                    />
                  </Grid>

                  <Grid item xs>
                    <BootFormElement {...k} />
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
        </div>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
};

export default ElementList;
