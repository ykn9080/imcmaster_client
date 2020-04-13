import React, { useState, useEffect } from "react";
import { List, Avatar, Button, Skeleton } from "antd";
import { EditOutlined, DeleteOutlined, StarOutlined } from "@ant-design/icons";

const AntList = (props) => {
  let layout = "horizontal",
    listData = props.listData,
    loading = props.loading;

  if (typeof props.layout != "undefined") layout = props.layout;

  let listAttr = {
    className: "demo-loadmore-list",
    dataSource: listData,
    itemLayout: layout,
  };
  if (typeof props.size != "undefined")
    listAttr = { ...listAttr, size: props.size };
  if (typeof props.footer != "undefined")
    listAttr = { ...listAttr, footer: props.footer };
  if (typeof props.pagination != "undefined")
    listAttr = { ...listAttr, pagination: props.pagination };

  const ListItem = ({ item }) => {
    let editHandler = "",
      deleteHandler = "",
      actlist = [];
    if (typeof props.editHandler != "undefined")
      editHandler = props.editHandler;
    if (typeof props.deleteHandler != "undefined")
      deleteHandler = props.deleteHandler;

    editHandler != "" &&
      actlist.push(<EditOutlined onClick={() => editHandler(item)} />);
    deleteHandler != "" &&
      actlist.push(<DeleteOutlined onClick={() => deleteHandler(item)} />);

    let attr = { actions: actlist };
    if (typeof item.extra != "undefined") {
      const extra = (
        <img
          width={item.extra.width}
          alt={item.extra.alt}
          src={item.extra.src}
        />
      );
      attr = { ...attr, extra: extra };
    }
    return (
      <List.Item {...attr}>
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
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
