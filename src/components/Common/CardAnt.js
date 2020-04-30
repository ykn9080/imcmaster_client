import React from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { Link, useHistory } from "react-router-dom";
import useForceUpdate from "use-force-update";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Skeleton, Avatar } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
  ControlOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
const useStyles = makeStyles((theme) => ({
  card: {
    //maxWidth: "100%"
    maxHeight: 400,
    minHeight: 300,
  },
}));
const CardAnt = (props) => {
  const resizeControl = (ctrList, _id, direction) => {
    console.log(_id, direction);
    _.each(ctrList, function (value, key) {
      if (value._id === _id) {
        console.log(value.size);
        switch (direction) {
          case "left":
            if (value.size > 3) value.size = value.size - 1;
            break;
          case "right":
            if (value.size < 12) value.size = value.size + 1;
            break;
        }
        console.log(value, value.size);
      }
    });
    props.resizeItemHandler(ctrList);
  };
  return (
    <Card
      style={{ minWidth: "50%", marginRight: 5 }}
      actions={[
        <EditOutlined
          key="edit"
          onClick={() => props.editItemHandler(props.data)}
        />,
        <DeleteOutlined
          key="delete"
          onClick={() => props.removeItemHandler(props.key)}
        />,
        <LeftOutlined
          key="left"
          onClick={() => resizeControl(props.dtList, props.data._id, "left")}
        />,
        <RightOutlined
          key="right"
          onClick={() => resizeControl(props.dtList, props.data._id, "right")}
        />,
      ]}
    >
      <Skeleton loading={true} avatar active>
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title="Card title"
          description="This is the description"
        />
      </Skeleton>
    </Card>
  );
};

export default CardAnt;
