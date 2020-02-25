import React, { useState, useEffect, useStyle } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import useForceUpdate from "use-force-update";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ViewColumn from "@material-ui/icons/ViewColumn";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import { ActiveLastBreadcrumb } from "components/Layouts/BreadCrumb";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));
export const BodyHead = () => {
  const classes = useStyles();
  let keyval = "BreadCrumb";
  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" p={1} bgcolor="background.paper">
        <Box p={1} flexGrow={1} bgcolor="grey.300">
          <ActiveLastBreadcrumb keyval={keyval} />
        </Box>
        <Box p={1} bgcolor="grey.300">
          ss
        </Box>
        <Box p={1} bgcolor="grey.300">
          ss
        </Box>
      </Box>
    </div>
  );
};
