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
  getFlatDataFromTree
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
  },
  tmpStyle: {
    position: "absolute",
    // left: `${pageX}px`,
    // top: `${pageY}px`,
    boxShadow: "2px 2px 10px #333333"
  }
}));
const initialState = {
  mouseX: null,
  mouseY: null
};
const makeSubMenu = (tempMenu, selectedKey) => {
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
  return treeDt;
};

export const SubMenu = props => {
  const forceUpdate = useForceUpdate();
  const dispatch = useDispatch();
  //selectedKey
  const [key, setKey] = useState("");
  const [rightClickNodeTreeItem, setRightClickNodeTreeItem] = useState({});
  let selectedKey = useSelector(state => state.global.selectedKey);
  let showSidebar = useSelector(state => state.global.showSidebar);
  if (selectedKey !== key) setKey(selectedKey);
  //subMenu data
  let tempMenu = useSelector(state => state.global.tempMenu);
  //let tempMenu = props.tempMenu;
  let initData = makeSubMenu(tempMenu, selectedKey);

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

  // /* #region  Context Menu for Tree */
  // //Tree node right click event
  // const treeNodeonRightClick = ({ event, node }) => {
  //   event.persist();
  //   console.log("iiii");
  //   //const { offsetLeft, _isCollapsed } = this.props;
  //   const offsetLeft = 10;
  //   const menuWidth = 200; //_isCollapsed ? 80 : 200;
  //   const { favorites, favoritesDetail } = node.props;
  //   //this.changefavorites(favorites);
  //   const hasChild = !!(favorites && favorites.scjId); // 收藏夹
  //   setRightClickNodeTreeItem({
  //     pageX: event.pageX - offsetLeft - 16 - menuWidth,
  //     pageY: event.target.offsetTop + 28,
  //     key: node.props.eventKey,
  //     id: node.props.eventKey,
  //     title: node.props.title,
  //     favorites,
  //     favoritesDetail,
  //     hasChild
  //   });
  // };
  // //Right node page display
  // const getNodeTreeRightClickMenu = () => {
  //   //const { rightClickNodeTreeItem } = this.state;
  //   const { pageX, pageY, hasChild, key } = { ...rightClickNodeTreeItem };
  //   const tmpStyle = {
  //     position: "absolute",
  //     left: `${pageX}px`,
  //     top: `${pageY}px`,
  //     boxShadow: "2px 2px 10px #333333"
  //   };
  //   const handleMenuClick = () => {
  //     console.log("context menu clicked");
  //   };
  //   const menuHasNode = (
  //     <Menu
  //       onClick={handleMenuClick}
  //       // style={tmpStyle}

  //       // className={styles.categs_tree_rightmenu}
  //     >
  //       <Menu.Item key="1">自动巡查</Menu.Item>
  //       <Menu.Item key="2">重命名</Menu.Item>
  //       <Menu.Item key="3">添加同级目录</Menu.Item>
  //       <Menu.Item key="4">添加子目录</Menu.Item>
  //       <Menu.Item key="5">删除</Menu.Item>
  //     </Menu>
  //   );
  //   const menuRoot = (
  //     <Menu
  //       onClick={handleMenuClick}
  //       // style={tmpStyle}
  //       // className={styles.categs_tree_rightmenu}
  //     >
  //       <Menu.Item key="1">自动巡查</Menu.Item>
  //       <Menu.Item key="2">重命名</Menu.Item>
  //       <Menu.Item key="4">添加子目录</Menu.Item>
  //     </Menu>
  //   );
  //   const menuNoNode = (
  //     <Menu
  //       onClick={handleMenuClick}
  //       // style={tmpStyle}
  //       // className={styles.categs_tree_rightmenu}
  //     >
  //       <Menu.Item key="6">取消收藏</Menu.Item>
  //     </Menu>
  //   );

  //   const menu = hasChild
  //     ? key === "-1"
  //       ? menuRoot
  //       : menuHasNode
  //     : menuNoNode;

  //   //return rightClickNodeTreeItem == null ? "" : menu;
  //   return <h1>hi</h1>;
  // };

  // //Hide right-click menu
  // const hideTreeRight = () => {
  //   setRightClickNodeTreeItem(null);
  // };

  // const renderCm=(info)=> {
  //   if (this.toolTip) {
  //     ReactDOM.unmountComponentAtNode(this.cmContainer);
  //     this.toolTip = null;
  //   }
  //   this.toolTip = (
  //     <Tooltip
  //       trigger="click" placement="bottomRight" prefixCls="rc-tree-contextmenu"
  //       defaultVisible overlay={<h4>{info.node.props.title}</h4>}
  //     >
  //       <span />
  //     </Tooltip>
  //   );

  //   const container = this.getContainer();
  //   Object.assign(this.cmContainer.style, {
  //     position: 'absolute',
  //     left: `${info.event.pageX}px`,
  //     top: `${info.event.pageY}px`,
  //   });

  //   ReactDOM.render(this.toolTip, container);
  // }

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
  // /* #endregion */

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
    dispatch(globalVariable({ menuedit: false }));//for hide menu input display in Body.js
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
    console.log(data);
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
    setgData(data);
    forceUpdate();
  };

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
  /* #endregion */

  const loop = data => {
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
    <div>
      {showSidebar ? <SubMenuHead callBack={setReload} /> : null}
      {showSidebar ? (
        <>
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
        </>
      ) : null}
    </div>
  );
};
