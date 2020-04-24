import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { globalVariable } from "actions";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import Tooltip from "@material-ui/core/Tooltip";
import IconBtn from "./IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backgroundColor: "#cccccc",
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  children: {
    flexGrow: 9,
  },
}));

export default function DenseAppBar(props) {
  const classes = useStyles();
  let left = props.left;

  let children = props.children;
  let right = props.right;
  if (typeof left === "undefined")
    left = (
      <>
        <Link to="/" style={{ color: "white" }}>
          <HomeIcon />
        </Link>
      </>
    );

  if (typeof children === "undefined") children = "";
  if (typeof right === "undefined") right = "";

  let showEdit = props.showEdit;

  return (
    <>
      <AppBar
        position="relative"
        style={{ backgroundColor: "#161313", height: 50 }}
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            {left}
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.title}>
            {props.title}
          </Typography>
          <span className={classes.children}>{children}</span>

          {right}
        </Toolbar>
      </AppBar>
    </>
  );
}
