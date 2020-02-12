import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Fab from "@material-ui/core/Fab";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import CardForm from "../CardForm";

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
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  iconright: {
    alignItems: "bottom"
  },
  primary: {
    margin: theme.spacing(1)
  }
}));

export const Body = props => {
  const classes = useStyles();
  let keyval = "BreadCrumb";

  keyval = useSelector(state => state.global.selectedKey);
  const ctrlist = useSelector(state => state.global.controls);

  // const rowdt = useSelector(state => state.rowdt);
  // MultiDispatch({ rowdt: "vvvvvv" });

  //const [rowdt, setRowdt] = useState([2, 1, 3, 4]);
  const [rowdt, setRowdt] = useState(ctrlist);

  const [editMode, setEditMode] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const IconBtn = props => {
    const classes = useStyles();
    const addGridHandler = (row, val) => {
      //e.preventDefault();
      let newState = [...rowdt]; // clone the array
      newState[row] = val;
      setRowdt(newState);
    };
    return (
      <Grid item xs={"auto"}>
        <span>
          <Fab
            color="primary"
            size="small"
            aria-label="add"
            className={classes.iconright}
          >
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

  const GridRow = props => {
    //const [hoverEffect, setHoverEffect] = useState(false);
    const removeGridHandler = () => {
      let newState = [...rowdt]; // clone the array
      newState[props.dt.row] = props.dt.val;
      setRowdt(newState);
    };

    return (
      <Grid item xs={props.xssize}>
        <CardForm />
        {/* <Paper className={classes.paper}>
          xs={props.xssize}{" "}
          <div>
            <Fab color="primary" aria-label="add">
              <RemoveIcon
                onClick={() => {
                  removeGridHandler(props.dt);
                }}
              />
            </Fab>
            <Fab color="secondary" aria-label="edit">
              <EditIcon />
            </Fab>
          </div>
        </Paper> */}
      </Grid>
    );
  };

  let newArr = [];
  _.each(rowdt, (val, key) => {
    let i;
    for (i = 0; i < val; i++) {
      newArr.push({ row: key, col: i, val: val - 1, xs: 12 / val });
    }
  });

  return (
    <>
      <p className={classes.primary}>This page is {keyval}</p>
      <Grid container justify="center" className={classes.root} spacing={2}>
        {newArr.map((dt, index) => {
          return dt.col != dt.val ? (
            <GridRow dt={dt} xssize={dt.xs} key={dt.col + "_" + index} />
          ) : (
            <>
              <GridRow dt={dt} xssize={dt.xs - 1} key={dt.col + "_" + index} />
              <IconBtn dt={dt} />
            </>
          );
        })}
      </Grid>
    </>
  );
};
