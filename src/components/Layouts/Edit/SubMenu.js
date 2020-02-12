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
import Sortable from "./MenuSortable";

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
let menuChildern = [];
const makeChildren = (menu, pid) => {
  {
    /* change data format like below
        let data = [
            {
            title: "Top level 1",
            slug: "top-level-1",
            children: [
                {
                title: "Sub level 1",
                slug: "sub-level-1",
                children: []
                }
            ]
        }
        ] 
    */
  }
  const siblingList = _.filter(menu, { pid: pid }).sort(function(a, b) {
    return a.seq < b.seq ? -1 : 1;
  });
  const childList = id => {
    return;
    _.filter(menu, { pid: id });
  };

  siblingList.map((i, dt) => {
    menuChildern.push(
      childList(dt.id)
        ? (dt.children = makeChildren(childList(dt.id), dt.id))
        : dt
    );
  });
};
export const SubMenu = props => {
  let menuData = props.submenu;
  let pid = props.pid;
  const findSub = props => {
    const sideMenu = menuData
      .filter((item, itemIndex) => item.pid === props.pid)
      .sort(function(a, b) {
        return a.seq < b.seq ? -1 : 1;
      });
    return (
      <Sortable
        opacity={0.1}
        data={sideMenu}
        enable={false}
        onChange={(event, ui) => console.log("DOM changed!!!!", event, ui)}
      />
    );
  };
  const addSubMenu = () => {
    console.log("add menu");
  };
  const classes = useStyles();
  return (
    <>
      <findSub pid={pid} />
      <Button onClick={addSubMenu}>Add</Button>
    </>
  );
};
