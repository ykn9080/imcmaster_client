import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "../../actions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    alignItems: "flex-end"
  }
}));

export const ActiveLastBreadcrumb = props => {
  console.log(props.keyval);
  const classes = useStyles();
  let keyval = "BreadCrumb";
  const dispatch = useDispatch();
  keyval = useSelector(state => state.global.selectedKey);
  console.log(keyval);
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.", event.href);
    dispatch(globalVariable({ selectedKey: event.href }));
  }
  return (
    <div style={{ textAlign: "right" }}>
      <Breadcrumbs aria-label="breadcrumb" className={classes.root}>
        <Link color="inherit" href="/">
          Material-UI
        </Link>
        <Link
          color="inherit"
          href="/getting-started/installation/"
          onClick={handleClick}
        >
          Core
        </Link>
        <Link
          color="textPrimary"
          href="/components/breadcrumbs/"
          onClick={handleClick}
          aria-current="page"
        >
          {keyval}
        </Link>
      </Breadcrumbs>
    </div>
  );
};
