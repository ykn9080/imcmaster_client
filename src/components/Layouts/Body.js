import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 250,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export const CenteredGrid = props => {
  const classes = useStyles();
  const [rowdt, setRowdt] = useState([2, 1, 3, 4]);
  const addGridHandler = e => {
    e.preventDefault();
    console.log(e.target.id);
    return null;
  };
  const removeGridHandler = e => {
    return null;
  };
  let newArr = [];
  _.each(rowdt, (val, key) => {
    let i;
    for (i = 0; i < val; i++) {
      newArr.push({ row: key, col: i, xs: 12 / val });
    }
  });
  return (
    <Grid container justify="center" className={classes.root} spacing={2}>
      {newArr.map((dt, index) => {
        return (
          <Grid item xs={dt.xs}>
            <Paper className={classes.paper}>xs={dt.xs}</Paper>
            <span id={dt.row + "n" + dt.col} onClick={addGridHandler}>
              +
            </span>
            <span id={dt.row + "n" + dt.col} onClick={removeGridHandler}>
              -
            </span>
          </Grid>
        );
      })}
    </Grid>
  );
};
