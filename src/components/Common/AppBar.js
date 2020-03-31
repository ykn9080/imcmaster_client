import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import Tooltip from "@material-ui/core/Tooltip";
import IconBtn from "./IconButton";

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: "none",
    backgroundColor: "#cccccc",
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function DenseAppBar(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let showEdit = props.showEdit;
  let edit = useSelector(state => state.global.formEdit);
  const handleEdit = () => {
    dispatch(globalVariable({ formEdit: !edit }));
  };
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#161313", height: 50 }}
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" color="inherit" className={classes.title}>
            Photos
          </Typography>
          {showEdit && (
            <IconBtn tooltip={"Edit Page"} handleClick={handleEdit}>
              <SettingsIcon />
            </IconBtn>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
