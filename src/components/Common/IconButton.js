import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const IconBtn = props => {
  return (
    <Tooltip title={props.tooltip}>
      <IconButton
        aria-label="Edit page"
        aria-controls="menu-appbar"
        onClick={props.handleClick}
        color="inherit"
      >
        {props.children}
      </IconButton>
    </Tooltip>
  );
};

export default IconBtn;
