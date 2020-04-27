/*
 * @Author: yknam
 * @Date: 2020-2-29 14:34
 * @Last Modified by: yknam
 * @Last Modified time: 2020-2-29 14:34
 * @Desc: Side Menu Bar Open when click top tab
 * Work on contextmenu 2-29
 */

import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { globalVariable } from "actions";
import {
  getTreeFromFlatData,
  getFlatDataFromTree,
} from "components/functions/dataUtil";
import { getChildren } from "components/functions/findChildrens";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import "antd/dist/antd.css";
import { Tree } from "antd";
import useForceUpdate from "use-force-update";
import SubMenuHead from "./SubMenuHead";
import TreeAnt from "components/Common/TreeAnt";
import { getNodeData } from "components/functions/dataUtil";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  tmpStyle: {
    position: "absolute",
    // left: `${pageX}px`,
    // top: `${pageY}px`,
    boxShadow: "2px 2px 10px #333333",
  },
}));

export const SubMenu = (props) => {
  const forceUpdate = useForceUpdate();
  const dispatch = useDispatch();
  const history = useHistory();
  //selectedKey
  const [key, setKey] = useState("");
  const [rightClickNodeTreeItem, setRightClickNodeTreeItem] = useState({});
  let selectedKey = useSelector((state) => state.global.selectedKey);
  const login = useSelector((state) => state.global.login);
  let showSidebar = useSelector((state) => state.global.showSidebar);
  if (selectedKey !== key) setKey(selectedKey);
  //subMenu data
  let tempMenu = useSelector((state) => state.global.tempMenu);

  let treeData = getNodeData(tempMenu, selectedKey, "_id", "pid", "", "title");
  const [reload, setReload] = useState(false); //for reload from child
  const [anchorEl, setAnchorEl] = useState(false); //for open menu when rightclick tree
  const [gData, setgData] = useState([]);
  const { TreeNode } = Tree;
  const [expandedKeys, setExpendedKeys] = useState([]);

  const handleClose = () => {
    setAnchorEl(false);
  };

  //not successful
  const onRightClick = ({ event, node }) => {
    console.log(event, node);
    setAnchorEl(true);
  };
  //not successful
  const editMenu = (
    <Menu
      id="editMenu"
      anchorEl={anchorEl}
      keepMounted
      open={true}
      onClose={handleClose}
    >
      <MenuItem>Edit</MenuItem>
      <MenuItem>Reset</MenuItem>
    </Menu>
  );

  const findControl = (tempMenu, id) => {
    const ctr = tempMenu.filter((item, itemIndex) => item._id === id);

    if (ctr) {
      return ctr[0].layout.sort(function (a, b) {
        return a.rowseq < b.rowseq ? -1 : 1;
      });
    }
  };
  const onSelect = (selectedObj) => {
    if (selectedObj) history.push(selectedObj.path);
    dispatch(globalVariable({ control: selectedObj.layout }));
    dispatch(globalVariable({ selectedKey: selectedObj._id }));
    dispatch(globalVariable({ currentData: selectedObj }));
  };
  return (
    <div>
      {showSidebar ? <SubMenuHead callBack={setReload} /> : null}
      {showSidebar ? (
        <>
          <TreeAnt onSelect={onSelect} id={"_id"} />
        </>
      ) : null}
    </div>
  );
};
