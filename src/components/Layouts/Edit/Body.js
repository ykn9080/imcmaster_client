import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { ActiveLastBreadcrumb } from "../BreadCrumb";
import ViewColumn from "@material-ui/icons/ViewColumn";
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
  },
  appBar: {
    top: "auto",
    bottom: 0
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -80,
    float: "right",
    right: 0,
    marginRight: 20
  },
  fabRight: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    float: "right",
    right: 0,
    marginRight: 20
  },
  breadcrumb: {
    textAlign: "right"
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
      <Grid item xs={1}>
        {/* <span>
          <Fab
            color="primary"
            size="small"
            aria-label="add"
            className={classes.iconright}
          >
            <ViewColumn
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
        </span> */}
        <IconButton aria-label="split" color="primary">
          <ViewColumn
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
        </IconButton>
      </Grid>
    );
  };

  const GridRow = props => {
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
  const addAcc = ctrList => {
    const numByrow = _.countBy(ctrList, "rowseq");
    const maxRowIndex = _.max(Object.keys(numByrow));
    console.log(numByrow, maxRowIndex);
    ctrList = _.sortBy(ctrList, ["rowseq", "colseq"]);
    for (let i = 0; i <= maxRowIndex; i++) {
      let colseq = 0;
      ctrList.map(val => {
        console.log(val, i, val.rowseq, numByrow[i]);
        if (val.rowseq === i) {
          val.colseq = colseq;
          colseq++;
        }
      });
    }
    console.log(ctrList);
    ctrList.map((val, key) => {
      val.total = numByrow[val.rowseq] - 1;
      val.xs = 12 / numByrow[val.rowseq];
    });
    ctrList = _.sortBy(ctrList, ["rowseq", "colseq"]);
    return ctrList;
  };
  const addNewControl = ctrList => {
    const maxrow = _.maxBy(ctrList, "rowseq");

    let maxrowseq = -1;

    if (typeof maxrow != "undefined") maxrowseq = maxrow.rowseq;
    ctrList.push({
      ctrid: "imsi" + Math.random().toString(),
      rowseq: maxrowseq + 1,
      colseq: 0
    });
    dispatch(globalVariable({ control: ctrList }));
    forceUpdate();
  };
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
      <ActiveLastBreadcrumb keyval={keyval} className={classes.breadcrumb} />
      <Grid container className={classes.root} spacing={2}>
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
              ></GridRow>

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
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Fab color="secondary" aria-label="add" className={classes.fabButton}>
          <AddIcon onClick={() => addNewControl(ctrlist)} />
        </Fab>
      </AppBar>
    </>
  );
};
