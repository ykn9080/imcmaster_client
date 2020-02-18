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

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";
import CardForm from "./CardForm";
import useForceUpdate from "use-force-update";

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
  const forceUpdate = useForceUpdate();
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
                  ctrid: "imsi" + Math.random().toString(),
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
          removeControl={removeControl}
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

  const removeControl = (ctrList, ctrid) => {
    ctrList.map((e, i) => {
      console.log(e, ctrid);
      if (e.ctrid === ctrid) ctrList.splice(i, 1);
    });
    dispatch(globalVariable({ control: ctrList }));
    forceUpdate();
  };
  return (
    <>
      <Grid container justify="center" className={classes.root} spacing={2}>
        {addAcc(ctrlist).map((dt, index) => {
          return dt.colseq != dt.total ? (
            <GridRow
              dt={dt}
              xssize={dt.xs}
              key={dt.ctrid}
              removeControl={removeControl}
              ctrlist={addAcc(ctrlist)}
            />
          ) : (
            <>
              <GridRow
                dt={dt}
                xssize={dt.xs - 1}
                key={dt.ctrid}
                removeControl={removeControl}
                ctrlist={addAcc(ctrlist)}
              />
              <IconBtn
                addControl={props.addControl}
                removeControl={removeControl}
                dt={dt}
                ctrlist={addAcc(ctrlist)}
              />
            </>
          );
        })}
      </Grid>
      <Grid
        container
        alignItems="flex-start"
        justify="flex-end"
        direction="row"
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Grid>
      <div class="row end-xs">
        <div class="col-xs-6">
          <div class="box">
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </div>
        </div>
      </div>
    </>
  );
};
