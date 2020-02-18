import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import _ from "lodash";
import { Button } from "react-bootstrap";
import { HeadEdit } from "./Head";
import { Body } from "./Body";
import { SubMenu } from "./SubMenu";
import { Sortable } from "./MenuSortable";
import { makeStyles } from "@material-ui/core/styles";
import { globalVariable } from "../../../actions";
import Grid from "@material-ui/core/Grid";
import { findChild } from "../../functions/findChildrens";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));
const findMenu = (tempMenu, comp, pid) => {
  return tempMenu
    .filter((item, itemIndex) => item.comp === comp && item.pid === pid)
    .sort(function(a, b) {
      return a.seq < b.seq ? -1 : 1;
    });
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
const Edit = props => {
  let subMenu, tempMenu, topMenu, control;
  const [forchg, setForchg] = useState("");
  const dispatch = useDispatch();
  let menuData = useSelector(state => state.global.menu);
  let selectedKey = useSelector(state => state.global.selectedKey);

  if (!menuData) menuData = JSON.parse(localStorage.getItem("menu"));

  topMenu = findMenu(menuData, "1", "");
  subMenu = findMenu(menuData, "1", topMenu[0].id);

  if (!selectedKey) selectedKey = topMenu[0].id;

  dispatch(globalVariable({ subMenu: subMenu }));
  dispatch(globalVariable({ tempMenu: menuData }));
  //$(".dropli:first-child").click();
  tempMenu = menuData;

  // useEffect(() => {
  //   //dispatch(globalVariable({ subMenu: subMenu }));
  //   dispatch(globalVariable({ tempMenu: menuData }));
  //   //$(".dropli:first-child").click();
  //   tempMenu = menuData;
  // });

  //subMenu = useSelector(state => state.global.subMenu);
  //const ctr = useSelector(state => state.global.control);

  // let topMenu = findMenu("1", "");
  // console.log(topMenu);
  // subMenu = findMenu("1", topMenu[0].id);
  // console.log(subMenu);

  const selectedmenu = id => {
    dispatch(globalVariable({ selectedKey: id }));
    selectedKey = id;
    const sub = findMenu(tempMenu, "1", id);
    if (sub.length == 0) {
      const ctr = findControl(tempMenu, "1", id);
      dispatch(globalVariable({ control: ctr }));
      return false;
    }
    markTab(id);
    //console.log(id, findMenu("1", id));
    setForchg("");
  };

  const markTab = id => {
    $(".dropli").removeClass("selectli");
    $("#" + id).addClass("selectli");
  };
  let simple = "";
  const addControl = newArr => {
    dispatch(globalVariable({ control: newArr }));
    setForchg(newArr);
  };
  const removeControl = (ctrList, removeObj) => {
    ctrList.map((e, i) => {
      console.log(e, removeObj);
      if (e.rowseq === removeObj.rowseq && e.colseq === removeObj.colseq)
        ctrList.splice(i, 1);
    });
    addControl(ctrList);
  };
  console.log("reload");
  // const submenu = findMenu("1", topmenu[0].id);
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <HeadEdit selectedmenu={selectedmenu} />
          </Grid>
          <Grid item xs={3}>
            <Sortable
              opacity={0.1}
              pid={selectedKey}
              depth={"all"}
              liclass={"dropli"}
              selectedmenu={selectedmenu}
            />
            <Button>Add</Button>
            <SubMenu selectedmenu={selectedmenu} />
          </Grid>
          <Grid item xs={9}>
            <Body addControl={addControl} removeControl={removeControl} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Edit;
