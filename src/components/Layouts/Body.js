import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import MultiDispatch, { gb } from "../../reducers/multipleDispatch";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 250,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  icon: {
    alignItems: "bottom"
  }
}));

export const CenteredGrid = props => {
  const classes = useStyles();
  const rowdt = useSelector(state => state.rowdt);

  MultiDispatch({ rowdt: "vvvvvv" });

  const [rowdt, setRowdt] = useState([2, 1, 3, 4]);
  const [editMode, setEditMode] = useState(false);

  const removeGridHandler = e => {
    return null;
  };
  let newArr = [];
  _.each(rowdt, (val, key) => {
    let i;
    for (i = 0; i < val; i++) {
      newArr.push({ row: key, col: i, val: val - 1, xs: 12 / val });
    }
  });

  const IconBtn = props => {
    const classes = useStyles();
    const addGridHandler = (row, val) => {
      //e.preventDefault();
      let newState = [...rowdt]; // clone the array
      newState[row] = val;
      setRowdt(newState);
    };
    return (
      <Grid item xs={0.5} style={{ alignItem: "bottom" }}>
        <span>
          <Fab color="primary" aria-label="add" className={classes.icon}>
            <AddIcon
              id={props.dt.row + "n" + (props.dt.val + 1)}
              onClick={() => {
                addGridHandler(props.dt.row, props.dt.val + 2);
              }}
            />
          </Fab>
        </span>
      </Grid>
    );
  };
  return (
    <Grid container justify="center" className={classes.root} spacing={2}>
      {newArr.map((dt, index) => {
        return dt.col != dt.val ? (
          <Grid item xs={dt.xs}>
            <Paper className={classes.paper}>xs={dt.xs}</Paper>
          </Grid>
        ) : (
          <>
            <Grid item xs={dt.xs - 1}>
              <Paper className={classes.paper}>xs={dt.xs - 1}</Paper>
            </Grid>
            <IconBtn dt={dt} />
          </>
        );
      })}
    </Grid>
  );
};