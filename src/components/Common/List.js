import React, { useState, useEffect } from "react";
import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import { List, Avatar, Button, Skeleton } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const AntList = (props) => {
  const history = useHistory();

  //loading for skeleton
  const loading = props.loading ? props.loading : false;

  //layout,datasource,size,footer,pagination
  let listAttr = {
    className: "demo-loadmore-list",
    dataSource: props.listData,
    itemLayout: props.layout ? props.layout : "horizontal",
  };
  if (props.size) listAttr = { ...listAttr, size: props.size };
  if (props.footer) listAttr = { ...listAttr, footer: props.footer };
  if (props.pagination)
    listAttr = { ...listAttr, pagination: props.pagination };

  const ListItem = ({ item }) => {
    //action icon: edit/delete icon
    let actlist = [];
    if (props.editHandler)
      actlist.push(<EditOutlined onClick={() => props.editHandler(item)} />);
    if (props.deleteHandler)
      actlist.push(
        <DeleteOutlined onClick={() => props.deleteHandler(item)} />
      );
    let itemAttr = { actions: actlist };

    //extra for image
    if (item.extra) {
      const extra = (
        <img
          width={item.extra.width}
          alt={item.extra.alt}
          src={item.extra.src}
        />
      );
      itemAttr = { ...itemAttr, extra: extra };
    }

    //title,desc,size,avatar
    let metaAttr = {};
    if (item.size) metaAttr = { ...metaAttr, size: item.size };
    if (item.description)
      metaAttr = { ...metaAttr, description: item.description };
    if (item.name) {
      if (item.href)
        metaAttr = {
          ...metaAttr,
          //title: <a href={item.href}>{item.title}</a>,
          title: <Link to={item.href}>{item.name}</Link>,
        };
      // if (item.titleHandler)
      //   metaAttr = {
      //     ...metaAttr,
      //     title: (
      //       <a onClick={() => history.push(item.href, item.data)}>
      //         {item.title}
      //       </a>
      //     ),
      //   };
      else metaAttr = { ...metaAttr, title: item.name };
    }
    if (item.avatar) {
      const av = item.avatar;
      let av1 = {};
      if (av.size) av1 = { ...av1, size: av.size };
      if (av.shape) av1 = { ...av1, shape: av.shape };
      if (av.style) av1 = { ...av1, style: av.style };
      if (av.icon) av1 = { ...av1, icon: av.icon };
      metaAttr = {
        ...metaAttr,
        avatar: <Avatar {...av1} />,
      };
    }

    return (
      <List.Item {...itemAttr}>
        <List.Item.Meta {...metaAttr} />
        {item.content}
      </List.Item>
    );
  };

  return (
    <Skeleton loading={loading} active avatar>
      <List {...listAttr} renderItem={(item) => <ListItem item={item} />} />
    </Skeleton>
  );
};

export default AntList;

//sample data structure
// {
//   title: k.name,
//   href: "/admin/formview",
//   avatar: {
//     size: 32,
//     style: { backgroundColor: "#87d068" },
//     icon: <UserOutlined />,
//   },
//   description: k.desc,
//   content:k.desc,
//   extra :{
//     width:200,
//     alt:k.alt,
//     src:k.imgsrc
//   }
// };
