import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import ControlList from "./ControlList";
import { BasicQuery } from "graphQuery";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    color: "white",
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Controls = ({ id, type, status, status1 }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  console.log("imin");
  const myparam = location.state.data;
  console.log(myparam);
  const [open, setOpen] = useState(false);
  let contents = <h1>default</h1>;
  //status: for open/close, status1: just for reload purpose
  useEffect(() => {
    setOpen(status);
    switch (type) {
      case "table":
        break;
      case "chart":
        break;
      default:
        break;
    }
  }, [status, status1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(globalVariable({ selectedKey: "m2" }));
    history.push("/Edit");
  };

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Control Type
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      {contents}
      <ControlList />
      <BasicQuery />
    </div>
  );
};

export default Controls;
