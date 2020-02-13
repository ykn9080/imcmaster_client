import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "../../../actions";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";
import Cancel from "@material-ui/icons/Cancel";
import { Sortable } from "./MenuSortable";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(10)
  },
  sortable: {
    paddingTop: 10
  }
}));

export const SubMenu = props => {
  let sideMenu = props.topdata;
  let menuData = props.data;
  let pid = props.pid;
  const dispatch = useDispatch();

  // const keyval = useSelector(state => state.global.selectedKey);
  // const menuData = useSelector(state => state.global.menu);

  // if (keyval !== props.pid) {
  //   pid = keyval;
  //   sideMenu = menuData
  //     .filter((item, itemIndex) => item.pid === pid)
  //     .sort(function(a, b) {
  //       return a.seq < b.seq ? -1 : 1;
  //     });
  //   console.log(pid, "changed!!!");
  //   console.log(sideMenu);
  // }

  const addSubMenu = () => {
    console.log("add menu");
  };
  const classes = useStyles();
  return (
    <>
      <Sortable opacity={0.1} data={menuData} topdata={sideMenu} />
      <Button onClick={addSubMenu}>Add</Button>
    </>
  );
};
