import React from "react";
import AddBox from "@material-ui/icons/AddBox";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

const SubMenuHead = () => {
  const handleAddSubMenu = () => {
    return false;
  };
  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" p={1}>
        <Box p={1} flexGrow={1}>
          <Typography paragraph>Sub Menu</Typography>
        </Box>
        <Box p={1}>
          <Tooltip title="Add new SubMenu">
            <IconButton aria-label="add new SubMenu" onClick={handleAddSubMenu}>
              <AddBox />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </div>
  );
};

export default SubMenuHead;
