import React, { Component, PropTypes, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { makeStyles } from "@material-ui/core/styles";
import { faHome, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";
import _ from "lodash";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.min.css";
import "./Head.css";
import { directChild, findChild } from "components/functions/findChildrens";
import IconButton from "@material-ui/core/IconButton";
import AddBox from "@material-ui/icons/AddCircle";
import useForceUpdate from "use-force-update";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginLeft: theme.spacing(1)
  }
}));
export const Sortable = props => {
  let tempMenu = useSelector(state => state.global.tempMenu);
  let keyval = props.pid;
  let selectedKey = useSelector(state => state.global.selectedKey);
  const dispatch = useDispatch();
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    //$(refs.sortable);
    const $node = $("#ulSortable");

    $node.sortable({
      opacity: props.opacity,
      // Get the incoming onChange function
      // and invoke it on the Sortable `change` event
      drop: function(event, ui) {
        props.onChange(event, ui);
      },
      change: (event, ui) => props.onChange(event, ui)
    });
    return () => {
      $node.sortable();
    };
    keyval = selectedKey;
  }, [selectedKey]);
  console.log("keyval:", keyval, "sel", selectedKey);
  const classes = useStyles();
  let menuList = directChild(tempMenu, keyval, "seq");
  // if (props.depth === "all") menuList = findChild(tempMenu, props.pid, "seq");
  const addTopMenu = () => {
    let obj = _.maxBy(menuList, "seq");
    let newobj = {
      id: "imsi" + Math.random().toString(),
      comp: "1",
      creator: "ykn",
      desc: "",
      pid: "",
      private: false,
      seq: obj.seq + 1,
      title: "New Menu",
      layout: []
    };
    tempMenu.push(newobj);
    dispatch(globalVariable({ tempMenu: tempMenu }));
    forceUpdate();
  };
  return (
    <ul className={props.ulclass} id="ulSortable">
      {menuList ? (
        <>
          <DropList
            menuList={menuList}
            tempMenu={tempMenu}
            depth={props.depth}
            liclass={props.liclass}
            selectedmenu={props.selectedmenu}
          />
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={addTopMenu}
          >
            <AddBox />
          </IconButton>
        </>
      ) : (
        <li
          className={["ui-state-default"]}
          onClick={() => props.selectedmenu("")}
          key={findmaxnum}
        >
          new menu
        </li>
      )}
    </ul>
  );
};

const DropList = props => {
  return props.menuList.map((item, i) => {
    let delicon = delbtn(item.id);
    let moduleicon = "";
    let subdata = [];
    const subMenu = directChild(props.tempMenu, item.id, "seq");
    const li = (
      <li
        key={"droplist" + item.id}
        id={item.id}
        className={[props.liclass, "ui-state-default"].join(" ")}
        onClick={() => props.selectedmenu(item.id)}
      >
        {item.title}
        {delicon}
      </li>
    );
    return subMenu.length > 0 && props.depth === "all" ? (
      <li
        key={"droplist" + item.id}
        id={item.id}
        className={[props.liclass, "ui-state-default"].join(" ")}
        onClick={() => props.selectedmenu(item.id)}
      >
        {item.title}
        <NestedList data={subMenu} tempMenu={props.tempMenu} />
        {delicon}
      </li>
    ) : (
      li
    );
  });
};

const markTab = id => {
  $(".dropli").removeClass("selectli");
  $("#" + id).addClass("selectli");
};
const NestedList = props => {
  return props.data ? (
    <ul>
      {props.data.map((item, i) => {
        let delicon = delbtn(item.id);
        let subdata = directChild(props.tempMenu, item.id, "seq");
        return subdata ? (
          <li
            key={"droplist" + item.id}
            id={item.id}
            className={["ui-state-default"].join(" ")}
            onClick={() => props.selectedmenu(item.id)}
          >
            {item.title}
            <NestedList data={subdata} tempMenu={props.tempMenu} />
            {delicon}
          </li>
        ) : (
          <li
            key={"droplist" + item.id}
            id={item.id}
            className={["ui-state-default"].join(" ")}
            onClick={() => props.selectedmenu(item.id)}
          >
            {item.title}
            {delicon}
          </li>
        );
      })}
    </ul>
  ) : (
    ""
  );
};

const findmaxnum = () => {
  return "test";
};
const delbtn = id => {
  //delete button at topmenu tab
  return (
    <React.Fragment>
      <FontAwesomeIcon
        style={{ float: "right", marginTop: 5, marginRight: 2, marginLeft: 5 }}
        icon={faTimes}
        key={"del" + id}
        onClick={() => console.log("deleled ud: ", id)}
      />
    </React.Fragment>
  );
};
