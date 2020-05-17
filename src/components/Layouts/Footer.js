import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  footer: {
    textAlign: "center",
    // position: "absolute",
    bottom: 0,
    // width: "100% !important",
    height: "30px !important"
    // backgroundColor: "#3F51B5"
  }
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <Container className={classes.footer}>
      <Typography variant="title">Footer Text</Typography>
    </Container>
  );
};

export default Footer;
