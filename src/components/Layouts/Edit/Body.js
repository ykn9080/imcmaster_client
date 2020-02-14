import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Fab from "@material-ui/core/Fab";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { globalVariable } from "../../../actions";

import CardForm from "./CardForm";

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
  console.log(props);
  const classes = useStyles();
  let keyval = "BreadCrumb";
  let ctrlist;
  const dispatch = useDispatch();
  //const [rowdt, setRowdt] = useState([2, 1, 3, 4]);

  const [editMode, setEditMode] = useState(false);
  const [expanded, setExpanded] = useState(false);
  //keyval = useSelector(state => state.global.selectedKey);
  ctrlist = useSelector(state => state.global.control);
  if (typeof ctrlist == "undefined") ctrlist = [];
  // useEffect(() => {
  //   setRowdt(ctrlist);
  //   console.log(rowdt);
  // });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const IconBtn = props => {
    const classes = useStyles();
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
              id={props.dt.rowseq + "n" + (props.dt.total + 1)}
              onClick={() => {
                ctrlist.push({
                  ctrid: "",
                  rowseq: props.dt.rowseq,
                  colseq: props.dt.total + 1
                });
                props.addControl(addAcc(ctrlist));
              }}
            />
          </Fab>
        </span>
      </Grid>
    );
  };

  const GridRow = props => {
    //const [hoverEffect, setHoverEffect] = useState(false);
    // const removeGridHandler = () => {
    //   let newState = [...rowdt]; // clone the array
    //   newState[props.dt.row] = props.dt.val;
    //   setRowdt(newState);
    // };

    return (
      <Grid item xs={props.xssize}>
        <CardForm
          removeControl={props.removeControl}
          data={props.dt}
          ctrlist={ctrlist}
        />
      </Grid>
    );
  };
  const addAcc = ctrlist => {
    const numByrow = _.countBy(ctrlist, "rowseq");
    ctrlist.map((val, key) => {
      val.total = numByrow[val.rowseq] - 1;
      val.xs = 12 / numByrow[val.rowseq];
    });
    ctrlist = _.sortBy(ctrlist, ["rowseq", "colseq"]);
    return ctrlist;
  };

  // _.each(rowdt, (val, key) => {
  //   let i;
  //   for (i = 0; i < val; i++) {
  //     newArr.push({ row: key, col: i, val: val - 1, xs: 12 / val });
  //   }
  // });
  return (
    <>
      <p className={classes.primary}>This page is keyval</p>
      <Grid container justify="center" className={classes.root} spacing={2}>
        {addAcc(ctrlist).map((dt, index) => {
          return dt.colseq != dt.total ? (
            <GridRow
              dt={dt}
              xssize={dt.xs}
              key={dt.rowseq + "_" + dt.colseq}
              removeControl={props.removeControl}
              ctrlist={addAcc(ctrlist)}
            />
          ) : (
            <>
              <GridRow
                dt={dt}
                xssize={dt.xs - 1}
                key={dt.rowseq + "_" + dt.colseq}
                removeControl={props.removeControl}
                ctrlist={addAcc(ctrlist)}
              />
              <IconBtn
                addControl={props.addControl}
                removeControl={props.removeControl}
                dt={dt}
                ctrlist={addAcc(ctrlist)}
              />
            </>
          );
        })}
      </Grid>
    </>
  );
};
