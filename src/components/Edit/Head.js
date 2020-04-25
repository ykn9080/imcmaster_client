import React, { useEffect, useMemo, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import $ from "jquery";
import _ from "lodash";
import cloneDeep from "lodash/cloneDeep";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { currentsetting } from "components/functions/config";
import { globalVariable } from "actions";
import { makeStyles } from "@material-ui/core/styles";
import { directChild } from "components/functions/findChildrens";
import PageHeadEdit from "components/Edit/PageHeadEdit";
import AntMenu from "components/Common/Menu";
import DenseAppBar from "components/Common/AppBar";
import { Tooltip, Button, Row, Col, Spin } from "antd";
import IconButton from "@material-ui/core/IconButton";
import { PlusSquareOutlined, SaveOutlined } from "@ant-design/icons";
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
  let menu = useSelector((state) => state.global.menu);
  const control = useSelector((state) => state.global.control);
  let selectedKey = useSelector((state) => state.global.selectedKey);
  let login = useSelector((state) => state.global.login);
  let menuList = directChild(tempMenu, "", "seq");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
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

  const saveHandler = () => {
    setLoading(true);
    //remove '/edit' from path
    tempMenu.map((a, i) => {
      a.path = a.path.replace("/edit", "");
    });
    //update tempMenu to menu
    dispatch(globalVariable({ menu: tempMenu }));
    let temp = cloneDeep(tempMenu);
    let deleteLog = [],
      changeLog = [];
    //deleted obj find &  axios.delete
    menu.map((a, i) => {
      if (!_.find(temp, { _id: a._id })) {
        console.log("deleted:", a);
        let config = {
          method: "delete",
          url: `${currentsetting.webserviceprefix}menu/${a._id}`,
        };
        deleteLog.push(config);
      }
    });
    //loop axios put
    temp.map((a, i) => {
      if (a.pid === "") delete a.pid; //prevent mongodb error when ObjectId is ""
      let config = {
        method: "put",
        url: `${currentsetting.webserviceprefix}menu/${a._id}`,
        data: a,
      };

      //post execution
      if (!_.find(menu, { _id: a._id })) {
        config = {
          ...config,
          method: "post",
          url: `${currentsetting.webserviceprefix}menu`,
        };
        changeLog.push(config);
      }
      //find same _id object from original menu
      let obj = {};
      const array = _.filter(menu, ["_id", a._id]);
      if (array.length === 1) obj = array[0];
      if (!_.isEqual(a, obj)) changeLog.push(config);
    });
    if (deleteLog.length > 0) {
      deleteLog.map((k, i) => {
        axios(k).then((r) => {
          console.log(r);
        });
      });
    }
    changeLog.map((k, i) => {
      axios(k).then((r) => {
        console.log(r);
      });
    });
    history.push("/");
  };

  const saveBtn = (
    <Button ghost onClick={saveHandler}>
      Save
    </Button>
  );
  return (
    <>
      <DenseAppBar title={"PageBuild"} right={saveBtn}>
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
      <Spin spinning={loading} size="large" />
    </>
  );
};
