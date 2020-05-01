import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { currentsetting } from "components/functions/config";
import { Link } from "react-router-dom";
import { globalVariable } from "actions";
import AntMenu from "components/Common/Menu";
import DenseAppBar from "components/Common/AppBar";
import { Button } from "antd";
import FormList from "Admin/Form/FormList";
import FormView from "Admin/Form/FormView";
import FormEdit from "Admin/Form/FormEdit";
import TableView from "Admin/Table/TableView";
import PageBuild from "Admin/Menu/PageBuild";
import PageHead from "components/Common/PageHeader";
import {
  addedmenu,
  emptyAddedmenu,
  addRootPid,
  addPath1,
} from "components/functions/dataUtil";

const adminMenu = [
  {
    access: [],
    _id: "5e8ed662bdb50363914263af",
    desc: "",
    layout: [],
    seq: 0,
    title: "Organization",
    type: "admin",
    pid: "",
    path: "/admin/organization",
  },
  {
    access: [],
    _id: "5e8ed662bdb50363914263b0",
    desc: "",
    layout: [],
    seq: 1,
    title: "Menu",
    pid: "",
    type: "admin",
    path: "/admin/menu",
  },
  {
    access: [],
    _id: "5e8ed662bdb50363914263b1",
    desc: "",
    layout: [],
    seq: 2,
    title: "Control",
    pid: "",
    type: "admin",
    path: "/admin/control",
    breadcrumbName: "/admin/control",
  },
  {
    access: [],
    _id: "5e8ed662bdb50363914263x1",
    desc: "",
    layout: [],
    seq: 0,
    title: "Form",
    pid: "5e8ed662bdb50363914263b1",
    type: "admin",
    path: "/admin/control/form",
    breadcrumbName: "/admin/Form Build",
  },
  {
    access: [],
    _id: "5e8ed662bdb50363914263x2",
    desc: "",
    layout: [],
    seq: 1,
    title: "Table",
    pid: "5e8ed662bdb50363914263b1",
    type: "admin",
    path: "/admin/control/table",
    breadcrumbName: "/admin/Table Build",
  },
  {
    access: [],
    _id: "5e8ed662bdb50363914263x3",
    desc: "",
    layout: [],
    seq: 2,
    title: "Chart",
    pid: "5e8ed662bdb50363914263b1",
    type: "admin",
    path: "/admin/control/chart",
  },
  {
    access: [],
    _id: "5e8ed662bdb50363914263x3",
    desc: "",
    layout: [],
    seq: 3,
    title: "List",
    pid: "5e8ed662bdb50363914263b1",
    type: "admin",
    path: "/admin/control/list",
  },
  {
    access: [],
    _id: "5e8ed662bdb50363914263x3",
    desc: "",
    layout: [],
    seq: 4,
    title: "Card",
    pid: "5e8ed662bdb50363914263b1",
    type: "admin",
    path: "/admin/control/card",
  },
  {
    access: [],
    _id: "5e8ed662bdb50363914263x3",
    desc: "",
    layout: [],
    seq: 5,
    title: "PageHead",
    pid: "5e8ed662bdb50363914263b1",
    type: "admin",
    path: "/admin/control/pagehead",
  },
  {
    access: [],
    _id: "5e8ed662bdb50363914263x3",
    desc: "",
    layout: [],
    seq: 6,
    title: "Tree",
    pid: "5e8ed662bdb50363914263b1",
    type: "admin",
    path: "/admin/control/tree",
  },
  {
    access: [],
    _id: "5e8ed662bdb50363914263b2",
    desc: "",
    layout: [],
    seq: 3,
    title: "System",
    pid: "",
    type: "admin",
    path: "/admin/system",
  },
  {
    access: [],
    _id: "5e8ed662bdb50363914263x1",
    desc: "",
    layout: [],
    seq: 0,
    title: "Data",
    pid: "5e8ed662bdb50363914263b2",
    type: "admin",
    path: "/admin/system/data",
  },
  {
    access: [],
    _id: "5e8ed71cbdb50363914263b3",
    desc: "",
    layout: [],
    pid: "5e8ed662bdb50363914263af",
    seq: 0,
    title: "Company",
    type: "admin",
    path: "/admin/organization/company",
  },
  {
    access: [],
    _id: "5e8ed71cbdb50363914263b4",
    desc: "",
    layout: [],
    pid: "5e8ed662bdb50363914263af",
    seq: 1,
    title: "User",
    type: "admin",
    path: "/admin/organization/user",
  },
  {
    access: [],
    _id: "5e8ed71cbdb50363914263b5",
    desc: "",
    layout: [],
    pid: "5e8ed662bdb50363914263af",
    seq: 2,
    title: "Group",
    type: "admin",
    path: "/admin/organization/group",
  },
  {
    access: [],
    _id: "5e8ed71cbdb50363914263b6",
    desc: "",
    layout: [],
    pid: "5e8ed662bdb50363914263af",
    seq: 3,
    title: "Organization",
    type: "admin",
    path: "/admin/organization/organization",
  },
  {
    access: [],
    _id: "5e8ed71cbdb50363914263b7",
    desc: "",
    layout: [],
    pid: "5e8ed662bdb50363914263af",
    seq: 4,
    title: "Product/Service",
    type: "admin",
    path: "/admin/organization/product & Service",
  },
  {
    access: [],
    _id: "5e8ed7adbdb50363914263b8",
    desc: "",
    layout: [],
    pid: "5e8ed662bdb50363914263b0",
    seq: 0,
    title: "MenuBuild",
    type: "admin",
    path: "/admin/menu/menubuild",
  },
  {
    access: [],
    _id: "5e8ed7adbdb50363914263b9",
    desc: "",
    layout: [],
    pid: "5e8ed662bdb50363914263b0",
    seq: 1,
    title: "PageBuild",
    type: "admin",
    path: "/admin/menu/pagebuild",
  },
];

const Admin = ({ match }) => {
  let title = match.params.name,
    titleUpper = "";
  if (typeof match.params.child != "undefined") title = match.params.child;
  if (typeof match.params.grandchild != "undefined")
    title = match.params.grandchild;
  console.log(match.params, title);
  if (title) titleUpper = title.charAt(0).toUpperCase() + title.slice(1);
  //const [adminMenu, setAdminMenu] = useState([]);
  useEffect(() => {}, []);
  return (
    <>
      <DenseAppBar title={"Admin"}>
        <AntMenu menuList={adminMenu} />
      </DenseAppBar>
      {/* formview, formedit은 독립적인 pagehead를 가짐 */}
      {["formview", "formedit", "form", "table", "chart", "data"].indexOf(
        title
      ) === -1 ? (
        <PageHead title={titleUpper} />
      ) : null}
      {(() => {
        switch (title) {
          case "form":
          case "table":
          case "chart":
          case "data":
            return <FormList type={title} />;
            break;
          case "formview":
            return <FormView />;
            break;
          case "formedit":
            return <FormEdit />;
            break;
          case "tableview":
            return <TableView />;
            break;
          // case "tableedit":
          //   return <TableEdit />;
          //   break;
          case "pagebuild":
            return <PageBuild />;
            break;
        }
      })()}
    </>
  );
};

export default Admin;
