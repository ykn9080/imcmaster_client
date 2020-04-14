import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { List, Avatar, Button, Skeleton } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const AntList = (props) => {
  const loading = props.loading ? props.loading : false;

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
    let actlist = [];
    if (props.editHandler)
      actlist.push(<EditOutlined onClick={() => props.editHandler(item)} />);
    if (props.deleteHandler)
      actlist.push(
        <DeleteOutlined onClick={() => props.deleteHandler(item)} />
      );

    let itemAttr = { actions: actlist };
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

    let metaAttr = {};
    if (item.size) metaAttr = { ...metaAttr, size: item.size };
    if (item.description)
      metaAttr = { ...metaAttr, description: item.description };
    if (item.title) {
      if (item.href)
        metaAttr = {
          ...metaAttr,
          //title: <a href={item.href}>{item.title}</a>,
          title: <Link to={item.href}>{item.title}</Link>,
        };
      else metaAttr = { ...metaAttr, title: item.title };
    }
    if (item.avatar) {
      const av = item.avatar;
      let av1 = {};
      if (av.size) av1 = { ...av1, size: av.size };
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
