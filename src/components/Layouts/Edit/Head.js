import React, { useEffect, useMemo, useState } from "react";
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

export const HeadEdit = props => {
  const list = ["ReactJS", "JSX", "JavaScript", "jQuery", "jQuery UI"];
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleEnableability = () => {
    setIsEnabled(!isEnabled);
  };
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

  // const myData = [
  //   {
  //     access: [],
  //     _id: "5e3a92713858701652b09292",
  //     id: "s1",
  //     pid: "m1",
  //     comp: "1",
  //     title: "Sub1",
  //     desc: "sub1페이지1111",
  //     creator: "ykn",
  //     seq: 0,
  //     private: false,
  //     layout: [
  //       {
  //         _id: "5e3a94873858705598b09294",
  //         rowseq: 0,
  //         colseq: 0,
  //         ctrid: ""
  //       }
  //     ],
  //     __v: 0
  //   },
  //   {
  //     access: [],
  //     _id: "5e3bc558069da0e31aa6d891",
  //     id: "s3",
  //     comp: "1",
  //     creator: "ykn",
  //     desc: "sub3페이지",
  //     pid: "m2",
  //     private: false,
  //     seq: 0,
  //     title: "Sub3",
  //     layout: []
  //   },
  //   {
  //     access: [],
  //     _id: "5e3bcb7f069da0e31aa6eb91",
  //     id: "m1",
  //     comp: "1",
  //     creator: "ykn",
  //     desc: "첫페이지소개",
  //     layout: [
  //       {
  //         rowseq: 0,
  //         colseq: 0,
  //         ctrid: ""
  //       }
  //     ],
  //     pid: "",
  //     private: false,
  //     seq: 0,
  //     title: "FristMenu"
  //   },
  //   {
  //     access: [],
  //     _id: "5e3bcb7f069da0e31aa6eb92",
  //     id: "m2",
  //     comp: "1",
  //     creator: "ykn",
  //     desc: "second페이지소개",
  //     pid: "",
  //     private: false,
  //     seq: 1,
  //     title: "SecondMenu",
  //     layout: []
  //   },
  //   {
  //     access: [],
  //     _id: "5e3bcb7f069da0e31aa6eb93",
  //     id: "s2",
  //     comp: "1",
  //     creator: "ykn",
  //     desc: "sub2페이지",
  //     pid: "m1",
  //     private: false,
  //     seq: 0,
  //     title: "Sub2",
  //     layout: []
  //   },
  //   {
  //     access: [],
  //     _id: "5e3bcb7f069da0e31aa6eb94",
  //     id: "s2-1",
  //     comp: "1",
  //     creator: "ykn",
  //     desc: "sub2-1페이지",
  //     pid: "s2",
  //     private: false,
  //     seq: 0,
  //     title: "Sub2-1",
  //     layout: []
  //   }
  // ];
  // const menulist = myData.filter(
  //   (item, itemIndex) => item.comp === "1" && item.pid === ""
  // );
  const addMenu = () => {
    console.log("add menu");
  };
  const onCancel = () => {
    //display page로 이동
    props.history.push(`/`);
  };
  const onSave = () => {
    //setState의 모든 내용을 redux에 반영한후 display page로 이동
  };
  const colors = ["Red", "Green", "Blue", "Yellow", "Black", "White", "Orange"];
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Edit</Typography>
          <Sortable
            className={classes.sortable}
            ulclass={"dropul"}
            opacity={0.8}
            data={topmenu}
            enable={isEnabled}
            onChange={(event, ui) => console.log("DOM changed!", event, ui)}
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
          <Button color="inherit" onClick={onCancel}>
            Cancel
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Sortable
        opacity={0.8}
        data={topmenu}
        enable={isEnabled}
        onChange={(event, ui) => console.log("DOM changed!", event, ui)}
      />
    </div>
  );
};
