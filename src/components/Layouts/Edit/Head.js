import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "../../../actions";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Cancel from "@material-ui/icons/Cancel";
import AddCircle from "@material-ui/icons/AddCircle";
import { Sortable } from "./MenuSortable";
import { directChild } from "../../functions/findChildrens";

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

export const HeadEdit = props => {
  // const list = ["ReactJS", "JSX", "JavaScript", "jQuery", "jQuery UI"];
  // const [isEnabled, setIsEnabled] = useState(true);
  // const toggleEnableability = () => {
  //   setIsEnabled(!isEnabled);
  // };
  let tempMenu = useSelector(state => state.global.tempMenu);
  // if (!menuData) menuData = JSON.parse(localStorage.getItem("menu"));
  const dispatch = useDispatch();
  // useEffect(() => {
  //   //login후 /function/api.js의 remotelogin callback에서 dispatch를 못해서
  //   //일단 localStorage에 저장한후 메뉴로 historyback할때 globalVariable로 dispatch시킴
  //   let menu = JSON.parse(localStorage.getItem("menu"));
  //   menuData = menu;
  //   dispatch(globalVariable({ menu: menu }));
  // }, []);

  // const topmenu = menuData
  //   .filter((item, itemIndex) => item.comp === "1" && item.pid === "")
  //   .sort(function(a, b) {
  //     return a.seq < b.seq ? -1 : 1;
  //   });

  const addMenu = () => {
    console.log("add menu");
  };
  // const onCancel = () => {
  //   //display page로 이동
  //   useHistory().goBack();
  //   //props.history.push(`/`);
  // };

  const onSave = () => {
    //setState의 모든 내용을 redux에 반영한후 display page로 이동
  };
  const colors = ["Red", "Green", "Blue", "Yellow", "Black", "White", "Orange"];
  const classes = useStyles();
  const history = useHistory();
  const selectedmenu = id => {
    dispatch(globalVariable({ selectedKey: id }));
    const sub = directChild(tempMenu, id, "seq");
    //const ctr = findControl(tempMenu, "1", id);

    //dispatch(globalVariable({ control: ctr }));
    dispatch(globalVariable({ subMenu: sub }));
    $(".dropli").removeClass("selectli");
    $("#" + id).addClass("selectli");
    console.log(sub);
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Edit</Typography>
          <Sortable
            className={classes.sortable}
            ulclass={"dropul"}
            liclass={"dropli"}
            opacity={0.8}
            pid={""}
            depth={1}
            selectedmenu={props.selectedmenu}
            onChange={(event, ui) => console.log("DOM changed!!!!", event, ui)}
          />
          {/* <button type="button" onClick={toggleEnableability}>
            Toggle enable/disable
          </button> */}
          <div className={classes.title}></div>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={addMenu}
          >
            <AddCircle />
          </IconButton>

          <Button color="inherit" onClick={onSave}>
            Save
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              history.goBack();
            }}
          >
            Cancel
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};
