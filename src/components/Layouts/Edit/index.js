import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import _ from "lodash";
import { Button } from "react-bootstrap";
import { HeadEdit } from "./Head";
import { Body } from "./Body";
import { Sortable } from "./MenuSortable";
import { makeStyles } from "@material-ui/core/styles";
import { globalVariable } from "../../../actions";
import Grid from "@material-ui/core/Grid";

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
const findMenu = (menuData, comp, pid) => {
  return menuData
    .filter((item, itemIndex) => item.comp === comp && item.pid === pid)
    .sort(function(a, b) {
      return a.seq < b.seq ? -1 : 1;
    });
};
const findControl = (menuData, comp, id) => {
  const ctr = menuData.filter(
    (item, itemIndex) => item.comp === comp && item.id === id
  );

  if (ctr) {
    return ctr[0].layout.sort(function(a, b) {
      return a.rowseq < b.rowseq ? -1 : 1;
    });
  }
};
const Edit = props => {
  const [forchg, setForchg] = useState("");
  const dispatch = useDispatch();
  let menuData = useSelector(state => state.global.menu);
  if (!menuData) menuData = JSON.parse(localStorage.getItem("menu"));
  let topMenu, subMenu, control;
  topMenu = findMenu(menuData, "1", "");
  subMenu = findMenu(menuData, "1", topMenu[0].id);
  useEffect(() => {
    dispatch(globalVariable({ subMenu: subMenu }));
    //$(".dropli:first-child").click();
  }, []);

  subMenu = useSelector(state => state.global.subMenu);
  const ctr = useSelector(state => state.global.control);

  // let topMenu = findMenu("1", "");
  // console.log(topMenu);
  // subMenu = findMenu("1", topMenu[0].id);
  // console.log(subMenu);

  const selectedmenu = id => {
    const sub = findMenu(menuData, "1", id);

    if (sub.length == 0) {
      const ctr = findControl(menuData, "1", id);
      dispatch(globalVariable({ control: ctr }));
      return false;
    }
    dispatch(globalVariable({ selectedKey: id }));
    dispatch(globalVariable({ subMenu: sub }));
    markTab(id);
    //console.log(id, findMenu("1", id));
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
      if (
        e.id === removeObj.id ||
        (e.rowseq === removeObj.rowseq && e.colseq === removeObj.colseq)
      )
        ctrList.splice(i, 1);
    });
    addControl(ctrList);
  };

  // const submenu = findMenu("1", topmenu[0].id);
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <HeadEdit topdata={topMenu} selectedmenu={selectedmenu} />
          </Grid>
          <Grid item xs={3}>
            <Sortable
              opacity={0.1}
              data={menuData}
              // topdata={subMenu}
              liclass={"dropli"}
              selectedmenu={selectedmenu}
            />
            <Button>Add</Button>
            {/*<SubMenu topdata={submenu} data={menuData} pid={topmenu[0].id} /> */}
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
