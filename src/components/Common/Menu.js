import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { currentsetting } from "components/functions/config";
import { globalVariable } from "actions";
import { Menu, Breadcrumb } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { getTreeFromFlatData } from "components/functions/dataUtil";

const { SubMenu } = Menu;

const AntMenu = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let location = useLocation();
  const [current, setCurrent] = useState("");
  const [gData, setgData] = useState([]);
  useEffect(() => {
    setgData(treeDt);
  }, [props.menuList]);

  const routesMap = ({ path, breadcrumbName }) => {
    let newdt = [],
      links = "";
    path.split("/").filter((k, i) => {
      if (links.endsWith("/")) links += k;
      else {
        links += "/" + k;
      }

      if (i === 0) k = "Home";
      newdt.push({ path: links, breadcrumbName: k });
    });
    if (typeof breadcrumbName != "undefined") {
      breadcrumbName
        .split("/")
        .filter((k, i) => (newdt[i]["breadcrumbName"] = k));
    }
    return newdt;
  };
  const handleClick = (e) => {
    console.log("click ", e);
    console.log(location.pathname, window.location.pathname);
    history.push(e.item.props.path);
    // dispatch(
    //   globalVariable({
    //     currentPage: {
    //       title: e.item.props.children,
    //       key: e.key,
    //       routes: routesMap(e.item.props),
    //     },
    //   })
    // );
    setCurrent(e.key);
  };

  let treeDt = getTreeFromFlatData({
    flatData: props.menuList.map((node) => ({ ...node, title: node.title })),
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
      return (
        <Menu.Item key={item._id} path={item.path}>
          {item.title}
        </Menu.Item>
      );
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