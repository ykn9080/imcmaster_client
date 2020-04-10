import React, { useState } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { getTreeFromFlatData } from "components/functions/dataUtil";

const { SubMenu } = Menu;

const AntMenu = ({ menuList }) => {
  const [current, setCurrent] = useState("mail");

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  let treeDt = getTreeFromFlatData({
    flatData: menuList.map((node) => ({ ...node, title: node.title })),
    getKey: (node) => node._id, // resolve a node's key
    getParentKey: (node) => node.pid, // resolve a node's parent's key
    rootKey: "", // The value of the parent key when there is no parent (i.e., at root level)
  });

  console.log(menuList, treeDt);
  const submenu=(dt)=>{
    return(
      <SubMenu title="hi">
          dt.children.map()
        </SubMenu>
    )
  }
  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      theme="dark"
    >
      {treeDt.map((k,i)=>{
        k.children.length>0?:
        
        <Menu.Item key={k._id}>
        {k.title}
      </Menu.Item>
      })}
      <Menu.Item key="mail">
        <MailOutlined />
        Navigation One
      </Menu.Item>
      <Menu.Item key="app">
        <AppstoreOutlined />
        Navigation Two
      </Menu.Item>
      <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <SettingOutlined />
            Navigation Three - Submenu
          </span>
        }
      >
        <Menu.Item key="setting:01">Option 01</Menu.Item>
        <Menu.Item key="setting:02">Option 02</Menu.Item>
        <Menu.ItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <SubMenu title="hi">
            <Menu.ItemGroup title="Item 11">
              <Menu.Item key="setting:11">Option 12</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item key="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Menu.Item>
    </Menu>
  );
};

export default AntMenu;
