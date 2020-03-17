import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { globalVariable } from "actions";
import useForceUpdate from "use-force-update";
import $ from "jquery";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CardForm from "components/Edit/CardForm";

import { ObjectID } from "bson"; //_id maker for MongoDB

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
  paper1: {
    padding: theme.spacing(1),
    minHeight: "100vh"
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
  }
}));

const CardList = props => {
  const forceUpdate = useForceUpdate();
  const classes = useStyles();
  const history = useHistory();
  let dtList = props.dtList;
  const dispatch = useDispatch();

  //   const [editMode, setEditMode] = useState(false);
  //   const [expanded, setExpanded] = useState(false);

  //ctrList = useSelector(state => state.global.control);
  //let selectedKey = useSelector(state => state.global.selectedKey);
  //   if (typeof ctrList == "undefined") ctrList = [];
  //   useEffect(() => {
  //     $(".MuiGrid-container").css({ overflow: "hidden" });
  //   }, [selectedKey]);
  //ctrList = _.sortBy(ctrList, ["seq"]);
  //   const handleExpandClick = () => {
  //     setExpanded(!expanded);
  //   };
  const makeNewControl = dtList => {
    let maxseq = _.maxBy(dtList, "seq");

    if (typeof maxseq === "undefined") maxseq = -1;
    else maxseq = maxseq.seq;
    const _id = new ObjectID();
    return {
      _id: _id,
      ctrid: "",
      type: "",
      seq: maxseq + 1,
      size: 6
    };
  };
  const addNewControl = dtList => {
    dtList.push(makeNewControl(dtList));
    dispatch(globalVariable({ control: dtList }));
    forceUpdate();
  };
  const removeControl = (dtList, _id) => {
    console.log(dtList, _id);
    dtList.map((e, i) => {
      console.log(e, _id);
      if (e._id === _id) dtList.splice(i, 1);
    });
    dispatch(globalVariable({ control: dtList }));
    forceUpdate();
  };
  return (
    <Paper variant="outlined" square className={classes.paper1}>
      <Grid container className={classes.root} spacing={1}>
        {dtList.map((dt, index) => {
          return (
            <Grid item xs={dt.size} key={dt._id} className="draggable-item">
              <CardForm
                removeControl={removeControl}
                data={dt}
                ctrList={dtList}
              />
            </Grid>
          );
        })}
        <Grid item xs={3} key={"add_new"} className="draggable-item">
          <CardForm data={makeNewControl(dtList)} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CardList;
