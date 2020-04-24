import React, { useEffect, useMemo, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import $ from "jquery";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Cancel from "@material-ui/icons/Cancel";
import AddCircle from "@material-ui/icons/AddCircle";
import AntMenu from "components/Common/Menu";
import DenseAppBar from "components/Common/AppBar";
import { Sortable } from "./MenuSortable";
import { directChild } from "components/functions/findChildrens";
import PageHeadEdit from "components/Edit/PageHeadEdit";
import { Tooltip, Button, Row, Col } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import "components/Common/Antd.css";
import { SubMenu } from "./SubMenu";
import { ObjectID } from "bson"; //_id maker for MongoDB

import useForceUpdate from "use-force-update";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(10),
  },
  sortable: {
    margin: 0,
  },
}));

export const HeadEdit = (props) => {
  let topMenu,
    title = props.title;
  const forceUpdate = useForceUpdate();
  let tempMenu = useSelector((state) => state.global.tempMenu);
  const control = useSelector((state) => state.global.control);
  let selectedKey = useSelector((state) => state.global.selectedKey);
  let login = useSelector((state) => state.global.login);
  let menuList = directChild(tempMenu, "", "seq");
  const dispatch = useDispatch();

  const onSave = () => {
    //setState의 모든 내용을 redux에 반영한후 display page로 이동
    dispatch(globalVariable({ menu: tempMenu }));
  };

  const classes = useStyles();
  const history = useHistory();
  // const selectedmenu = (id) => {
  //   console.log(id, control, tempMenu);
  //   dispatch(globalVariable({ selectedKey: id }));
  //   $(".dropli").removeClass("selectli");
  //   $("#" + id).addClass("selectli");
  //   forceUpdate();
  // };
  const findMenu = (tempMenu, pid) => {
    return tempMenu
      .filter((item, itemIndex) => item.pid === pid)
      .sort(function (a, b) {
        return a.seq < b.seq ? -1 : 1;
      });
  };
  const findControl = (tempMenu, id) => {
    const ctr = tempMenu.filter((item, itemIndex) => item.id === id);
    if (ctr) {
      return ctr[0].layout.sort(function (a, b) {
        return a.rowseq < b.rowseq ? -1 : 1;
      });
    }
  };
  const selectedmenu = (path) => {
    const curr = _.filter(tempMenu, function (o) {
      return o.path == path;
    });
    if (curr.length > 0) selectedKey = curr[0]._id;
    dispatch(globalVariable({ selectedKey: selectedKey }));

    // const sub = findMenu(tempMenu, id);
    // const ctr = findControl(tempMenu, id);
    // console.log("it's from index", sub);
    //dispatch(globalVariable({ control: ctr }));
    //dispatch(globalVariable({ subMenu: sub }));
    // markTab(id);
    // setForchg("");
  };
  const addTopMenu = () => {
    if (
      _.filter(menuList, function (o) {
        return o.path == "/edit/NewMenu";
      }).length > 0
    )
      return false;

    let obj = _.maxBy(menuList, "seq");
    let type = "user";
    const findtype = _.filter(menuList, function (o) {
      return o.hasOwnProperty("type");
    });
    if (findtype.length > 0) type = findtype[0].type;
    let newobj = {
      _id: new ObjectID(),
      comp: login.comp,
      creator: login.user,
      desc: "",
      pid: "",
      type: type,
      seq: obj.seq + 1,
      title: "New Menu",
      layout: [],
      path: "/edit/NewMenu",
    };

    tempMenu.push(newobj);
    dispatch(globalVariable({ tempMenu: tempMenu }));
    forceUpdate();
  };
  return (
    <>
      <DenseAppBar title={"PageBuild"}>
        <Row>
          <Col>
            <AntMenu menuList={menuList} handleClick={selectedmenu} />
          </Col>
          <Col>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <PlusSquareOutlined
                style={{ fontSize: 18, paddingTop: 3 }}
                onClick={addTopMenu}
              />
            </IconButton>
          </Col>
        </Row>
      </DenseAppBar>
      <PageHeadEdit title={title} />
    </>
  );
};
