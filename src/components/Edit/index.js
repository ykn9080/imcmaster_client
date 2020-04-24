import React, { useEffect, useState, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import _ from "lodash";
import { HeadEdit } from "./Head";
import { Body, DragHandle } from "./Body";
import Footer from "components/Layouts/Footer";
import { SubMenu } from "./SubMenu";
import { globalVariable } from "actions";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { findChild } from "components/functions/findChildrens";
import { Container, Draggable } from "react-smooth-dnd";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const findMenu = (tempMenu, pid) => {
  return tempMenu
    .filter((item, itemIndex) => item.pid === pid)
    .sort(function (a, b) {
      return a.seq < b.seq ? -1 : 1;
    });
};
const findControl = (tempMenu, id) => {
  const ctr = tempMenu.filter((item, itemIndex) => item.id === id);

  if (ctr) {
    return ctr[0].layout.sort(function (a, b) {
      return a.rowseq < b.rowseq ? -1 : 1;
    });
  }
};

const Edit = (props) => {
  let title = props.match.params.name;
  if (typeof props.match.params.child != "undefined")
    title = props.match.params.child;

  let tempMenu, topMenu, control;
  const [forchg, setForchg] = useState("");
  const dispatch = useDispatch();
  tempMenu = useSelector((state) => state.global.tempMenu);
  console.log(tempMenu);
  let selectedKey = useSelector((state) => state.global.selectedKey);
  let showSidebar = useSelector((state) => state.global.showSidebar);

  if (!tempMenu) {
    tempMenu = JSON.parse(localStorage.getItem("openmenu"));
    topMenu = findMenu(tempMenu, "");
    // subMenu = findMenu(tempMenu, "1", topMenu[0].id);
    // dispatch(globalVariable({ subMenu: subMenu }));
    dispatch(globalVariable({ tempMenu: tempMenu }));
    if (!selectedKey && topMenu.length > 0) {
      selectedKey = topMenu[0]["_id"];

      dispatch(globalVariable({ selectedKey }));
    }
  }

  useEffect(() => {
    //console.log(tempMenu);
    //dispatch(globalVariable({ subMenu: subMenu }));
    //$(".dropli:first-child").click();
  }, []);

  //subMenu = useSelector(state => state.global.subMenu);
  //const ctr = useSelector(state => state.global.control);

  // let topMenu = findMenu("1", "");
  // console.log(topMenu);
  // subMenu = findMenu("1", topMenu[0].id);
  // console.log(subMenu);

  const selectedmenu = (id) => {
    dispatch(globalVariable({ selectedKey: id }));
    selectedKey = id;
    const sub = findMenu(tempMenu, id);
    const ctr = findControl(tempMenu, id);
    console.log("it's from index", sub);
    //dispatch(globalVariable({ control: ctr }));
    //dispatch(globalVariable({ subMenu: sub }));
    markTab(id);
    setForchg("");
  };

  const markTab = (id) => {
    $(".dropli").removeClass("selectli");
    $("#" + id).addClass("selectli");
  };

  const addControl = (newArr) => {
    dispatch(globalVariable({ control: newArr }));
    setForchg(newArr);
  };
  // const removeControl = (ctrList, removeObj) => {
  //   ctrList.map((e, i) => {
  //     console.log(e, removeObj);
  //     if (e.rowseq === removeObj.rowseq && e.colseq === removeObj.colseq)
  //       ctrList.splice(i, 1);
  //   });
  //   addControl(ctrList);
  // };
  console.log("reload");
  // const submenu = findMenu("1", topmenu[0].id);
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <HeadEdit selectedmenu={selectedmenu} title={title} />
          </Grid>

          {showSidebar ? (
            <Grid item xs={3}>
              <SubMenu selectedmenu={selectedmenu} tempMenu={tempMenu} />
            </Grid>
          ) : null}

          <Grid item xs>
            <Body addControl={addControl} />
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
};

export default Edit;
