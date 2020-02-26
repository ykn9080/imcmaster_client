import React, { useState, useEffect, useStyle } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import useForceUpdate from "use-force-update";
import _ from "lodash";
import $ from "jquery";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddBox from "@material-ui/icons/AddBox";
import Apps from "@material-ui/icons/Apps";
import MoreVert from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import { ActiveLastBreadcrumb } from "components/Layouts/BreadCrumb";
import Layout1 from "images/Layout/Layout1.png";
import Layout2 from "images/Layout/Layout2.png";
import Layout3 from "images/Layout/Layout3.png";
import Layout4 from "images/Layout/Layout4.png";
import Layout5 from "images/Layout/Layout5.png";
import Layout6 from "images/Layout/Layout6.png";
import Layout7 from "images/Layout/Layout7.png";
import Layout8 from "images/Layout/Layout8.png";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(0)
  }
}));
export const BodyHead = ({ctrList}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const handleClick = event => {
    const id = $(event.currentTarget).attr("aria-controls");
    switch (id) {
      case "editMenu":
        setAnchorEl(event.currentTarget);
        break;
      case "layoutMenu":
        setAnchorEl1(event.currentTarget);
        break;
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose1 = num => {
    console.log(num);
    const layout=[[1],[1],[2],[3],[1,2],[2,1],[1,3],[3,1]];
    LayoutControl(layout[num-1]);
    setAnchorEl1(null);
  };

  const LayoutControl = layout => {
if(ctrList.length>0){

}
else{

}
let addCtr=()=>{
  let _id = new ObjectID();
  {
    _id:  new ObjectID(),
    ctrid: "",
    type: "",
    seq: maxseq + 1,
    size: 6
  }
}
   
    dispatch(globalVariable({ control: ctrList }));
    forceUpdate();
  };


  const classes = useStyles();
  let keyval = "BreadCrumb";

  const layoutMenu = (
    <Menu
      id="layoutMenu"
      anchorEl={anchorEl1}
      keepMounted
      open={Boolean(anchorEl1)}
      onClose={handleClose1}
    >
      <MenuItem onClick={() => handleClose1(1)}>
        <ListItemIcon>
          <img src={Layout1} alt="img" width={25} />
        </ListItemIcon>
      </MenuItem>
      <MenuItem onClick={() => handleClose1(2)}>
        <ListItemIcon>
          <img src={Layout2} alt="img" width={25} />
        </ListItemIcon>
      </MenuItem>
      <MenuItem onClick={() => handleClose1(3)}>
        <ListItemIcon>
          <img src={Layout3} alt="img" width={25} />
        </ListItemIcon>
      </MenuItem>
      <MenuItem onClick={() => handleClose1(4)}>
        <ListItemIcon>
          <img src={Layout4} alt="img" width={25} />
        </ListItemIcon>
      </MenuItem>
      <MenuItem onClick={() => handleClose1(5)}>
        <ListItemIcon>
          <img src={Layout5} alt="img" width={25} />
        </ListItemIcon>
      </MenuItem>
      <MenuItem onClick={() => handleClose1(6)}>
        <ListItemIcon>
          <img src={Layout6} alt="img" width={25} />
        </ListItemIcon>
      </MenuItem>
      <MenuItem onClick={() => handleClose1(7)}>
        <ListItemIcon>
          <img src={Layout7} alt="img" width={25} />
        </ListItemIcon>
      </MenuItem>
      <MenuItem onClick={() => handleClose1(8)}>
        <ListItemIcon>
          <img src={Layout8} alt="img" width={25} />
        </ListItemIcon>
      </MenuItem>
    </Menu>
  );
  const editMenu = (
    <Menu
      id="editMenu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>
        {" "}
        <ListItemIcon>
          <AddBox fontSize="small" />
        </ListItemIcon>
        Edit
      </MenuItem>
      <MenuItem onClick={handleClose}>Delete</MenuItem>
    </Menu>
  );
  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" p={1}>
        <Box p={1} flexGrow={1}>
          <ActiveLastBreadcrumb keyval={keyval} />
        </Box>
        <Box p={1} className={classes.extendedIcon}>
          <IconButton
            aria-label="Edit Submenu"
            onClick={handleClick}
            aria-haspopup="true"
            aria-controls="editMenu"
          >
            <MoreVert />
          </IconButton>
          {editMenu}
        </Box>
        <Box p={1} className={classes.extendedIcon}>
          <IconButton
            aria-label="Layout Template"
            onClick={handleClick}
            aria-haspopup="true"
            aria-controls="layoutMenu"
          >
            <Apps />
          </IconButton>
          {layoutMenu}
        </Box>
        <Box p={1} className={classes.extendedIcon}>
          <IconButton aria-label="add new Control">
            <AddBox />
          </IconButton>
        </Box>
      </Box>
    </div>
  );
};
