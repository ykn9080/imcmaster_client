import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "../../../actions";
import { makeStyles } from "@material-ui/core/styles";
import { Sortable } from "./MenuSortable";

import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { directChild, findChild } from "../../functions/findChildrens";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AddBox from "@material-ui/icons/AddBox";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));
const initialState = {
  mouseX: null,
  mouseY: null
};
export const SubMenu = props => {
  let subMenu = useSelector(state => state.global.subMenu);
  let tempMenu = useSelector(state => state.global.tempMenu);
  //let menuData = props.data;
  let pid = props.pid;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState({});
  const [state, setState] = React.useState(initialState);

  const handleContext = (id, event) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4
    });
    console.log(id);
  };

  const handleClose = () => {
    setState(initialState);
  };
  const handleClick = (id, e) => {
    // console.log(e.target.name);

    if (expanded === id) setExpanded([]);
    else setExpanded(id);

    setOpen(prevState => ({
      ...prevState,
      [id]: !open[id]
    }));

    console.log(open, open[id], id);
  };
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const [expanded, setExpanded] = React.useState([]);

  const handleChange = (event, nodes) => {
    setExpanded(nodes);
  };

  const addSubMenu = () => {
    console.log("add menu");
  };
  const menu = [
    {
      access: [],
      _id: "5e3bc558069da0e31aa6d891",
      id: "s3",
      comp: "1",
      creator: "ykn",
      desc: "sub3페이지",
      pid: "m2",
      private: false,
      seq: 0,
      title: "Sub3페이지임다다",
      layout: []
    },
    {
      access: [],
      _id: "5e3bcb7f069da0e31aa6eb91",
      id: "m1",
      comp: "1",
      creator: "ykn",
      desc: "첫페이지소개",
      layout: [
        {
          rowseq: 0,
          colseq: 0,
          ctrid: ""
        }
      ],
      pid: "",
      private: false,
      seq: 0,
      title: "FristMenu"
    },
    {
      access: [],
      _id: "5e3bcb7f069da0e31aa6eb92",
      id: "m2",
      comp: "1",
      creator: "ykn",
      desc: "second페이지소개",
      pid: "",
      private: false,
      seq: 1,
      title: "SecondMenu",
      layout: []
    },
    {
      access: [],
      _id: "5e3bcb7f069da0e31aa6eb93",
      id: "s2",
      comp: "1",
      creator: "ykn",
      desc: "sub2페이지",
      pid: "m1",
      private: false,
      seq: 1,
      title: "Sub2",
      layout: []
    },
    {
      access: [],
      _id: "5e3bcb7f069da0e31aa6eb94",
      id: "s2-1",
      comp: "1",
      creator: "ykn",
      desc: "sub2-1페이지",
      pid: "s2",
      private: false,
      seq: 0,
      title: "Sub2-1",
      layout: []
    },
    {
      access: [],
      _id: "5e3bcb7f069da0e31aa6eb94",
      id: "s2-2",
      comp: "1",
      creator: "ykn",
      desc: "sub2-2페이지",
      pid: "s2",
      private: false,
      seq: 0,
      title: "Sub2-2",
      layout: []
    },
    {
      access: [],
      _id: "5e3bcb7f069da0e31aa6eb94",
      id: "s2-2-1",
      comp: "1",
      creator: "ykn",
      desc: "sub2-1페이지",
      pid: "s2-2",
      private: false,
      seq: 0,
      title: "Sub2-2-1",
      layout: []
    },
    {
      access: [],
      _id: "5e3f6650069da0e31aa96369",
      id: "s1",
      comp: "1",
      creator: "ykn",
      desc: "sub1페이지1111",
      pid: "m1",
      private: false,
      seq: 0,
      title: "Sub1",
      layout: [
        {
          _id: "5e45f3d7df0eeb50f8ea1078",
          ctrid: "c1",
          rowseq: 0,
          colseq: 0
        },
        {
          _id: "5e45f3d7df0eeb50f8ea1077",
          ctrid: "c2",
          rowseq: 1,
          colseq: 0
        },
        {
          _id: "5e45f3d7df0eeb50f8ea1076",
          ctrid: "c3",
          rowseq: 1,
          colseq: 1
        }
      ]
    }
  ];
  const testmenu = directChild(menu, "m1", "seq");

  const selectedmenu = id => {
    dispatch(globalVariable({ selectedKey: id }));
    const ctr = findControl(tempMenu, "1", id);
    console.log("it's from submenu", ctr);
    dispatch(globalVariable({ control: ctr }));
  };
  const findControl = (tempMenu, comp, id) => {
    const ctr = tempMenu.filter(
      (item, itemIndex) => item.comp === comp && item.id === id
    );

    if (ctr) {
      return ctr[0].layout.sort(function(a, b) {
        return a.rowseq < b.rowseq ? -1 : 1;
      });
    }
  };
  const NestedList = props => {
    return (
      <>
        <ListItem
          button
          onClick={e => handleClick(props.id, e)}
          onContextMenu={e => handleContext(props.id, e)}
          style={{ cursor: "context-menu" }}
        >
          <ListItemText
            primary={props.title}
            style={{ paddingLeft: props.depth * 15 }}
          />
          {expanded === props.id ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open[props.id]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {props.data.map((sub, i) => {
              let subdata = directChild(menu, sub.id, "seq");
              return subdata.length > 0 ? (
                <NestedList
                  id={sub.id}
                  title={sub.title}
                  data={subdata}
                  depth={props.depth + 1}
                />
              ) : (
                <ListItem
                  onContextMenu={e => handleContext(sub.id, e)}
                  button
                  selected={selectedIndex === sub.id}
                  onClick={event => {
                    handleListItemClick(event, sub.id);
                    selectedmenu(sub.id);
                  }}
                  className={classes.nested}
                >
                  <ListItemText
                    primary={sub.title}
                    style={{ paddingLeft: props.depth * 15 }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  };

  return (
    <div>
      <List
        style={{ cursor: "context-menu" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <Grid
              container
              spacing={3}
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
              <Grid item xs={6}>
                Sub Menu List
              </Grid>
              <Grid item xs={6}>
                <IconButton
                  color="inherit"
                  aria-label="submenu"
                  onClick={addSubMenu}
                >
                  <AddBox color="primary" />
                </IconButton>
              </Grid>
            </Grid>
          </ListSubheader>
        }
        className={classes.root}
      >
        {subMenu.map((m, index) => {
          let subdata = directChild(menu, m.id, "seq");
          return subdata.length > 0 ? (
            <NestedList data={subdata} id={m.id} title={m.title} depth={0} />
          ) : (
            <ListItem
              onContextMenu={e => handleContext(e, m.id)}
              button
              selected={selectedIndex === m.id}
              onClick={event => {
                handleListItemClick(event, m.id);
                selectedmenu(m.id);
              }}
            >
              <ListItemText primary={m.title} />
            </ListItem>
          );
        })}

        <Menu
          keepMounted
          open={state.mouseY !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            state.mouseY !== null && state.mouseX !== null
              ? { top: state.mouseY, left: state.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={handleClose}>Copy</MenuItem>
          <MenuItem onClick={handleClose}>Print</MenuItem>
          <MenuItem onClick={handleClose}>Highlight</MenuItem>
          <MenuItem onClick={handleClose}>Email</MenuItem>
        </Menu>
      </List>
    </div>
  );
};
