import React, { useEffect } from "react";
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
  return menuData
    .filter((item, itemIndex) => item.comp === comp && item.id === id)
    .layout.sort(function(a, b) {
      return a.seq < b.seq ? -1 : 1;
    });
};
const Edit = props => {
  const dispatch = useDispatch();
  let menuData = useSelector(state => state.global.menu);
  if (!menuData) menuData = JSON.parse(localStorage.getItem("menu"));
  console.log(menuData);
  let topMenu, subMenu;
  topMenu = findMenu(menuData, "1", "");
  subMenu = findMenu(menuData, "1", topMenu[0].id);
  useEffect(() => {
    dispatch(globalVariable({ subMenu: subMenu }));
    //$(".dropli:first-child").click();
    console.log(topMenu, subMenu);
  }, []);

  subMenu = useSelector(state => state.global.subMenu);
  console.log(subMenu);

  // let topMenu = findMenu("1", "");
  // console.log(topMenu);
  // subMenu = findMenu("1", topMenu[0].id);
  // console.log(subMenu);

  const selectedmenu = id => {
    const sub = findMenu(menuData, "1", id);
    console.log(sub);
    if (sub.length == 0) {
      selectedSubmenu(id);
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
  const selectedSubmenu = id => {
    const ctr = findControl(menuData, "1", id);
    dispatch(globalVariable({ control: ctr }));
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
            <Body />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Edit;
