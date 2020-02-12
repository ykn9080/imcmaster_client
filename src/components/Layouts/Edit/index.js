import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { HeadEdit } from "./Head";
import { Body } from "./Body";
import { SubMenu } from "./SubMenu";
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

const Edit = props => {
  let menuData = useSelector(state => state.global.menu);
  if (!menuData) menuData = JSON.parse(localStorage.getItem("menu"));
  const dispatch = useDispatch();
  useEffect(() => {
    //login후 /function/api.js의 remotelogin callback에서 dispatch를 못해서
    //일단 localStorage에 저장한후 메뉴로 historyback할때 globalVariable로 dispatch시킴
    let menu = JSON.parse(localStorage.getItem("menu"));
    menuData = menu;
    dispatch(globalVariable({ menu: menu }));
  }, []);

  const topmenu = menuData
    .filter((item, itemIndex) => item.comp === "1" && item.pid === "")
    .sort(function(a, b) {
      return a.seq < b.seq ? -1 : 1;
    });
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <HeadEdit data={topmenu} />
          </Grid>
          <Grid item xs={3}>
            <SubMenu />
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
