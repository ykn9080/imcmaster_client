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
import { useSelector } from "react-redux";
import {
  getFlatDataFromTree,
} from "components/functions/dataUtil";

import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import "antd/dist/antd.css";
import { Tree } from "antd";
import useForceUpdate from "use-force-update";
import ContextMenu from "./ContextMenu";

const TreeAnt = (props) => {
  const forceUpdate = useForceUpdate();

  let treeData = useSelector((state) => state.global.treeData);
  const [reload, setReload] = useState(false); //for reload from child
  const [gData, setgData] = useState(treeData);
  const [nodeVal, setNodeVal] = useState("");
  const { TreeNode } = Tree;
  const [expandedKeys, setExpendedKeys] = useState([]);
  useEffect(() => {
    //console.log("run", props.initData);
    //setgData(props.initData);
    setgData(treeData);
  }, [props, reload]);

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
      //getNodeKey: ({ node }) => node._id, // This ensures your "id" properties are exported in the path
      getNodeKey: ({ node }) => node._id, // This ensures your "id" properties are exported in the path
      ignoreCollapsed: false, // Makes sure you traverse every node in the tree, not just the visible ones
    });
    const rtn1 = _.map(flatData, "node"); //select node from each object
    rtn1.map((v) => {
      //console.log(v, key);
      if (v.key === key) {
        // const ctr = findControl(tempMenu, v._id, "control");
        // const cData = findControl(tempMenu, v._id, "currentData");
        // console.log(ctr);
        // dispatch(globalVariable({ control: ctr }));
        // dispatch(globalVariable({ selectedKey: v._id }));

        if (props.onSelect) props.onSelect(v);
      }
    });
    //dispatch(globalVariable({ menuedit: false })); //for hide menu input display in Body.js
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

    let data = gData; //[...this.state.gData];
    if (data === "") data = [];
    // console.log(data);
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

  const onRightClick = ({ event, node }) => {
    setNodeVal(node);
  };

  let items = [
    { label: "Item 1" },
    { label: "Menu item 2" },
    { label: "Apple" },
    { label: "This is orange" },
    { label: "Conetxt menu is fun" },
    { label: "Cool" },
  ];

  const itemCallback = (index, node) => {
    console.log(
      `you clicked ${index}, ${items[index].label} and node is ${node}`
    );
    console.log(node);
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
        {gData !== "" && loop(gData)}
      </Tree>
      <ContextMenu
        items={items}
        callback={itemCallback}
        node={nodeVal}
      ></ContextMenu>
    </div>
  );
};

export default TreeAnt;
