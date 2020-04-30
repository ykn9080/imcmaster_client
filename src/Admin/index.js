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
import TableList from "Admin/Table/TableList";
import PageBuild from "Admin/Menu/PageBuild";
import PageHead from "components/Common/PageHeader";
import { addedmenu, addRootPid, addPath1 } from "components/functions/dataUtil";

const adminMenu1 = [
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
    title: "Form",
    pid: "",
    type: "admin",
    path: "/admin/form",
    breadcrumbName: "/admin/Form Build",
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
  let title = match.params.name;
  if (typeof match.params.child != "undefined") title = match.params.child;
  console.log(title);
  const [adminMenu, setAdminMenu] = useState([]);
  useEffect(() => {
    axios
      .get(`${currentsetting.webserviceprefix}menu/any?type=admin`)
      .then((response) => {
        console.log(response.data);

        let dt = addRootPid(response.data);
        addPath1(dt, "", "");
        setAdminMenu(addedmenu);
        addedmenu = [];
      });
  }, []);
  //let pagename = useSelector((state) => state.global.currentPage);
  // if (pagename != "") {
  //   title = pagename.title.toLowerCase();
  //   Title = title.charAt(0).toUpperCase() + title.slice(1);
  //   routes = pagename.routes;
  // }
  //const title = match.params.name;
  // let location = useLocation();
  // console.log(routes);
  console.log(adminMenu);
  return (
    <>
      <DenseAppBar title={"Admin"}>
        <AntMenu menuList={adminMenu} />
      </DenseAppBar>
      {/* formview, formedit은 독립적인 pagehead를 가짐 */}
      {["formview", "formedit", "form"].indexOf(title) === -1 ? (
        <PageHead title={title} />
      ) : null}
      {(() => {
        switch (title) {
          case "form":
            return <FormList />;
            break;
          case "formview":
            return <FormView />;
            break;
          case "formedit":
            return <FormEdit />;
            break;
          case "pagebuild":
            return <PageBuild />;
            break;
        }
      })()}
    </>
  );
};

export default Admin;
