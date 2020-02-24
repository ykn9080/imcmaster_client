import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import {
  getTreeFromFlatData,
  getFlatDataFromTree
} from "components/functions/dataUtil";
import { getChildren } from "components/functions/findChildrens";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import "antd/dist/antd.css";
import { Tree } from "antd";
import useForceUpdate from "use-force-update";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));
const initialState = {
  mouseX: null,
  mouseY: null
};

export const SubMenu = () => {
  const forceUpdate = useForceUpdate();
  const dispatch = useDispatch();
  const [key, setKey] = useState("");

  //for context
  const [state, setState] = React.useState(initialState);
  const handleContext = (id, event) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4
    });
    console.log(id);
  };
  const handleClose = () => {
    setState(initialState);
  };

  let tempMenu = useSelector(state => state.global.tempMenu);
  let selectedKey = useSelector(state => state.global.selectedKey);
  if (selectedKey !== key) setKey(selectedKey);
  const { TreeNode } = Tree;
  const [expandedKeys, setExpendedKeys] = useState([]);

  // 1. convert flatarray to children style
  let treeDt = getTreeFromFlatData({
    flatData: tempMenu.map(node => ({ ...node, title: node.title })),
    getKey: node => node.id, // resolve a node's key
    getParentKey: node => node.pid, // resolve a node's parent's key
    rootKey: "" // The value of the parent key when there is no parent (i.e., at root level)
  });
  //2. select part of treeDt auto converted to flat style again
  const subList = getChildren(treeDt, selectedKey);
  //3. revconvert subList to children style
  treeDt = getTreeFromFlatData({
    flatData: subList.map(node => ({ ...node, title: node.title })),
    getKey: node => node.id, // resolve a node's key
    getParentKey: node => node.pid, // resolve a node's parent's key
    rootKey: selectedKey // The value of the parent key when there is no parent (i.e., at root level)
  });
  //append  0-0-0 type key
  const addKey = (_tns, _preKey) => {
    const preKey = _preKey || "0";
    const tns = _tns || treeDt;
    tns.map((v, i) => {
      const key = `${preKey}-${i}`;
      v.key = key;
      if (v.hasOwnProperty("children")) {
        addKey(v.children, key);
      }
    });
  };
  addKey();
  localStorage.setItem("subList", JSON.stringify(treeDt));
  const [gData, setgData] = useState(treeDt);
  // const contextmenu = (
  //   <Menu>
  //     <Menu.Item key="1">1st menu item</Menu.Item>
  //     <Menu.Item key="2">2nd menu item</Menu.Item>
  //     <Menu.Item key="3">3rd menu item</Menu.Item>
  //   </Menu>
  // );
  const mm = (
    <Menu
      keepMounted
      open={state.mouseY !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        state.mouseY !== null && state.mouseX !== null
          ? { top: state.mouseY, left: state.mouseX }
          : undefined
      }
    >
      <MenuItem onClick={handleClose}>Copy</MenuItem>
      <MenuItem onClick={handleClose}>Print</MenuItem>
      <MenuItem onClick={handleClose}>Highlight</MenuItem>
      <MenuItem onClick={handleClose}>Email</MenuItem>
    </Menu>
  );

  const findControl = (tempMenu, comp, id) => {
    const ctr = tempMenu.filter(
      (item, itemIndex) => item.comp === comp && item.id === id
    );

    if (ctr) {
      return ctr[0].layout.sort(function(a, b) {
        return a.rowseq < b.rowseq ? -1 : 1;
      });
    }
  };

  /* #region anttree eventhandler collection */
  const onDragEnter = info => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };
  const onSelect = (selectedKeys, info) => {
    //find id from key
    let key = "";
    if (selectedKeys.length === 1) key = selectedKeys[0];
    const dt = JSON.parse(localStorage.getItem("subList"));
    const flatData = getFlatDataFromTree({
      treeData: dt,
      getNodeKey: ({ node }) => node.id, // This ensures your "id" properties are exported in the path
      ignoreCollapsed: false // Makes sure you traverse every node in the tree, not just the visible ones
    });
    const rtn1 = _.map(flatData, "node"); //select node from each object
    rtn1.map(v => {
      console.log(v, key);
      if (v.key === key) {
        const ctr = findControl(tempMenu, "1", v.id);
        dispatch(globalVariable({ control: ctr }));
      }
    });
  };
  const onDrop = info => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };

    const data = gData; //[...this.state.gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    console.log(data);
    localStorage.setItem("subList", JSON.stringify(data));
    setgData(data);

    setTimeout(function() {
      forceUpdate();
    }, 0);
    // this.setState({
    //   gData: data,
    // });
  };
  const onRightClick = ({ event, node }) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4
    });
    console.log("imin", event);
    return { mm };
  };
  /* #endregion */

  const loop = data => {
    console.log(data, JSON.parse(localStorage.getItem("subList")));
    return data.map(item => {
      if (item.children && item.children.length) {
        return (
          <TreeNode key={item.key} title={item.title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={item.title} />;
    });
  };

  return (
    <Tree
      className="draggable-tree"
      defaultExpandedKeys={expandedKeys}
      draggable
      blockNode
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      onSelect={onSelect}
      onRightClick={onRightClick}
    >
      {/* {loop(gData)} */}
      {loop(JSON.parse(localStorage.getItem("subList")))}
    </Tree>
  );
};
