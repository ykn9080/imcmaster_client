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

const getNodeData = (allData, topNode, key, parentkey, rootkey, title) => {
  // 1. convert flatarray to children style
  let treeDt = getTreeFromFlatData({
    flatData: allData.map((node) => ({ ...node, title: node[title] })),
    getKey: (node) => node[key], // resolve a node's key
    getParentKey: (node) => node[parentkey], // resolve a node's parent's key
    rootKey: rootkey, // The value of the parent key when there is no parent (i.e., at root level)
  });

  //2. select part of treeDt auto converted to flat style again
  const subList = getChildren(treeDt, topNode);
  //3. revconvert subList to children style
  treeDt = getTreeFromFlatData({
    flatData: subList.map((node) => ({ ...node, title: node[title] })),
    getKey: (node) => node[key],
    getParentKey: (node) => node[parentkey],
    rootKey: topNode,
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
  return treeDt;
};

const TreeAnt = (props) => {
  const forceUpdate = useForceUpdate();
  const dispatch = useDispatch();
  //selectedKey
  const [key, setKey] = useState("");
  const [rightClickNodeTreeItem, setRightClickNodeTreeItem] = useState({});
  let selectedKey = useSelector((state) => state.global.selectedKey);
  if (props.selectedKey) selectedKey = props.selectedKey;

  const login = useSelector((state) => state.global.login);
  let showSidebar = useSelector((state) => state.global.showSidebar);
  if (selectedKey !== key) setKey(selectedKey);
  //subMenu data
  let tempMenu = useSelector((state) => state.global.tempMenu);
  //let tempMenu = props.tempMenu;
  let initData = getNodeData(tempMenu, selectedKey, "_id", "pid", "", "title");

  const [reload, setReload] = useState(false); //for reload from child
  const [anchorEl, setAnchorEl] = useState(false); //for open menu when rightclick tree
  const [gData, setgData] = useState([]);
  const { TreeNode } = Tree;
  const [expandedKeys, setExpendedKeys] = useState([]);

  //localStorage.setItem("subList", JSON.stringify(treeDt));

  useEffect(() => {
    console.log("run", initData);
    setgData(initData);
  }, [props, reload]);

  const handleClose = () => {
    setAnchorEl(false);
  };

  /* #region anttree eventhandler collection */
  const onDragEnter = (info) => {
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
    //const dt = JSON.parse(localStorage.getItem("subList"));
    const dt = gData;
    const flatData = getFlatDataFromTree({
      treeData: dt,
      getNodeKey: ({ node }) => node._id, // This ensures your "id" properties are exported in the path
      ignoreCollapsed: false, // Makes sure you traverse every node in the tree, not just the visible ones
    });
    console.log(dt, flatData);
    const rtn1 = _.map(flatData, "node"); //select node from each object
    rtn1.map((v) => {
      console.log(v, key);
      if (v.key === key) {
        const ctr = findControl(tempMenu, v._id, "control");
        const cData = findControl(tempMenu, v._id, "currentData");
        console.log(ctr);
        dispatch(globalVariable({ control: ctr }));
        dispatch(globalVariable({ selectedKey: v._id }));
        if (props.onSelect) props.onSelect(cData);
      }
    });
    dispatch(globalVariable({ menuedit: false })); //for hide menu input display in Body.js
  };
  const onDrop = (info) => {
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
    console.log(data);
    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
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
    setgData(data);
    forceUpdate();
  };

  const findControl = (tempMenu, id, type) => {
    const dt = tempMenu.filter((item, itemIndex) => item._id === id);

    if (dt) {
      switch (type) {
        case "control":
          return dt[0].layout.sort(function (a, b) {
            return a.rowseq < b.rowseq ? -1 : 1;
          });
          break;
        case "currentData":
          return dt;
          break;
      }
    }
  };

  /* #endregion */

  const loop = (data) => {
    return data.map((item) => {
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
  const onRightClick = () => {
    return null;
  };
  return (
    <div>
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
        {loop(gData)}
      </Tree>
    </div>
  );
};

export default TreeAnt;
