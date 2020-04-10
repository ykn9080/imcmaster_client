import React from "react";
import BootFormDisplay from "components/Common/BootFormDisplay";
import ElementList from "Admin/ElementList";
import AntMenu from "components/Common/Menu";
import DenseAppBar from "components/Common/AppBar";

const formArray1 = [
  {
    controlId: "formEmail",
    labelText: "Email",
    name: "email",
    controlType: "email",
    placeholder: "test placeholder",
    formText: "We'll never share your email with anyone else.",
  },
];
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
  },
];
const Admin = () => {
  // const pathname = encodeURIComponent(window.location.pathname);

  // return <ElementList eltype={["password", "email"]} />;
  return (
    <DenseAppBar title={"Admin"}>
      <AntMenu menuList={adminMenu} />
    </DenseAppBar>
  );
};

export default Admin;
