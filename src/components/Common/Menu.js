import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { currentsetting } from "components/functions/config";
import { Link } from "react-router-dom";
import { globalVariable } from "actions";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { getTreeFromFlatData } from "components/functions/dataUtil";

const { SubMenu } = Menu;

const AntMenu = ({ menuList }) => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("mail");
  const [gData, setgData] = useState([]);
  useEffect(() => {
    setgData(treeDt);
  }, [menuList]);

  const handleClick = (e) => {
    console.log("click ", e);
    dispatch(
      globalVariable({
        currentPage: { title: e.item.props.children, key: e.key },
      })
    );
    setCurrent(e.key);
  };
  let treeDt = getTreeFromFlatData({
    flatData: menuList.map((node) => ({ ...node, title: node.title })),
    getKey: (node) => node._id, // resolve a node's key
    getParentKey: (node) => node.pid, // resolve a node's parent's key
    rootKey: "", // The value of the parent key when there is no parent (i.e., at root level)
  });

  const loop = (data) => {
    return data.map((item) => {
      if (item.children && item.children.length) {
        return (
          <SubMenu title={item.title} key={item._id}>
            {loop(item.children)}
          </SubMenu>
        );
      }
      return <Menu.Item key={item._id}>{item.title}</Menu.Item>;
    });
  };
  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      theme="dark"
    >
      {loop(gData)}
    </Menu>
  );
};

export default AntMenu;
