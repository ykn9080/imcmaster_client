import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "../../../actions";
import { makeStyles } from "@material-ui/core/styles";
import { Sortable } from "./MenuSortable";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import TextField from "@material-ui/core/TextField";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
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
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));
const initialState = {
  mouseX: null,
  mouseY: null
};
export const SubMenu = props => {
  let subMenu = useSelector(state => state.global.subMenu);
  let tempMenu = useSelector(state => state.global.tempMenu);
  const dispatch = useDispatch();
  const classes = useStyles();

  //for panel expansion
  const [panelExpanded, setPanelExpanded] = React.useState("panel2");
  const panelChange = panel => (event, isExpanded) => {
    setPanelExpanded(isExpanded ? panel : false);
  };

  //for context
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

  //for sub menu fold/unfold
  const [open, setOpen] = React.useState({});
  const [expanded, setExpanded] = React.useState([]);
  const handleChange = (event, nodes) => {
    setExpanded(nodes);
  };
  const handleClick = (id, e) => {
    if (expanded === id) setExpanded([]);
    else setExpanded(id);
    setOpen(prevState => ({
      ...prevState,
      [id]: !open[id]
    }));
  };
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const addSubMenu = () => {
    console.log("add menu");
  };
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
              let subdata = directChild(tempMenu, sub.id, "seq");
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

  const DragHandle = SortableHandle(() => (
    <ListItemIcon>
      <DragHandleIcon />
    </ListItemIcon>
  ));
  const SortableItem = SortableElement(({ text }) => (
    <ListItem ContainerComponent="div">
      <ListItemSecondaryAction>
        <DragHandle />
      </ListItemSecondaryAction>
      <ListItemText primary={text} />
    </ListItem>
  ));

  const SubList = (
    <List
      style={{ cursor: "context-menu" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {subMenu.map((m, index) => {
        let subdata = directChild(tempMenu, m.id, "seq");
        return subdata.length > 0 ? (
          <NestedList data={subdata} id={m.id} title={m.title} depth={0} />
        ) : (
          <ListItem
            onContextMenu={e => handleContext(m.id, e)}
            button
            selected={selectedIndex === m.id}
            onClick={event => {
              handleListItemClick(event, m.id);
              selectedmenu(m.id);
            }}
          >
            <ListItemSecondaryAction>
              <DragHandle />
            </ListItemSecondaryAction>
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
  );

  return (
    <div>
      <ExpansionPanel
        expanded={panelExpanded === "panel1"}
        onChange={panelChange("panel1")}
      >
        <ExpansionPanelSummary
          expandIcon={<ArrowDropDown />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Summary</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>space for menu edit</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={panelExpanded === "panel2"}
        onChange={panelChange("panel2")}
      >
        <ExpansionPanelSummary
          expandIcon={<ArrowDropDown />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.Heading}>Menu</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{SubList}</ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};
