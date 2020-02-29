import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import _ from "lodash";
import {
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
  Button,
  Form,
  FormControl
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActiveLastBreadcrumb } from "./BreadCrumb";
import { MultiDispatch, GlobalDispatch } from "reducers/multipleDispatch";
import logo from "images/logo/imc1_1.png";
import Signin from "components/Login/Login1";
import imclogo from "images/logo/imcmaster.png";
import { directChild } from "components/functions/findChildrens";

const element = <FontAwesomeIcon icon="user" size="lg" />;
let myData = [
  {
    access: [],
    _id: "5e3a92713858701652b09292",
    id: "s1",
    pid: "m1",
    comp: "1",
    title: "Sub1",
    desc: "sub1페이지1111",
    creator: "ykn",
    seq: 0,
    private: false,
    layout: [
      {
        _id: "5e3a94873858705598b09294",
        rowseq: 0,
        colseq: 0,
        ctrid: ""
      }
    ],
    __v: 0
  },
  // {
  //   access: [],
  //   _id: "5e3bc558069da0e31aa6d891",
  //   id: "s3",
  //   comp: "1",
  //   creator: "ykn",
  //   desc: "sub3페이지",
  //   pid: "m2",
  //   private: false,
  //   seq: 0,
  //   title: "Sub3",
  //   layout: []
  // },
  {
    access: [],
    _id: "5e3bcb7f069da0e31aa6eb91",
    id: "m1",
    comp: "1",
    creator: "ykn",
    desc: "첫페이지소개",
    layout: [
      {
        rowseq: 0,
        colseq: 0,
        ctrid: ""
      }
    ],
    pid: "",
    private: false,
    seq: 0,
    title: "FristMenu"
  }
  // {
  //   access: [],
  //   _id: "5e3bcb7f069da0e31aa6eb92",
  //   id: "m2",
  //   comp: "1",
  //   creator: "ykn",
  //   desc: "second페이지소개",
  //   pid: "",
  //   private: false,
  //   seq: 1,
  //   title: "SecondMenu",
  //   layout: []
  // },
  // {
  //   access: [],
  //   _id: "5e3bcb7f069da0e31aa6eb93",
  //   id: "s2",
  //   comp: "1",
  //   creator: "ykn",
  //   desc: "sub2페이지",
  //   pid: "m1",
  //   private: false,
  //   seq: 0,
  //   title: "Sub2",
  //   layout: []
  // },
  // {
  //   access: [],
  //   _id: "5e3bcb7f069da0e31aa6eb94",
  //   id: "s2-1",
  //   comp: "1",
  //   creator: "ykn",
  //   desc: "sub2-1페이지",
  //   pid: "s2",
  //   private: false,
  //   seq: 0,
  //   title: "Sub2-1",
  //   layout: []
  // }
];
const menulist = (dt, itemid, compareid) => {
  console.log(dt);
  dt.filter(
    (item, itemIndex) => item.comp === "1" && item.itemid === compareid
  ).sort(function(a, b) {
    return a.seq < b.seq ? -1 : 1;
  });
  return dt;
};
const Topmenu = () => {
  const dispatch = useDispatch();
  function handleSelect(selectedKey) {
    const ctrlist = myData.filter((item, itemIndex) => item.id === selectedKey);
    dispatch(globalVariable({ controls: ctrlist.layout }));
  }
  //const menulist = JSON.parse(localStorage.getItem("imctable")).menu;

  useEffect(() => {
    //login후 /function/api.js의 remotelogin callback에서 dispatch를 못해서
    //일단 localStorage에 저장한후 메뉴로 historyback할때 globalVariable로 dispatch시킴
    let menu = myData;
    if (localStorage.getItem("menu"))
      menu = JSON.parse(localStorage.getItem("menu"));
    // else{
    //   //openmenu를 fetch해서 가져옴
    // }
    dispatch(globalVariable({ menu: menu }));
  }, []);
  let menuData = useSelector(state => state.global.menu);

  if (!menuData) menuData = myData;
  //const topmenu = menulist(menuData, "");
  const topmenu = menuData
    .filter((item, itemIndex) => item.comp === "1" && item.pid === "")
    .sort(function(a, b) {
      return a.seq < b.seq ? -1 : 1;
    });
  console.log(menuData, topmenu);
  return (
    <Nav className="mr-auto" onSelect={handleSelect}>
      {topmenu.map((dt, i) => {
        //const ddList = menulist(dt, dt.id);
        const ddList = menuData
          .filter((item, itemIndex) => item.pid === dt.id)
          .sort(function(a, b) {
            return a.seq < b.seq ? -1 : 1;
          });
        return ddList.length === 0 ? (
          <Nav.Link key={dt.title + i}>{dt.title}</Nav.Link>
        ) : (
          <NavDropRecur
            myData={menuData}
            dt={ddList}
            title={dt.title}
            id={dt.id}
            key={dt.id}
          />
        );
      })}
    </Nav>
  );
};

const NavDropRecur = props => {
  {
    /*make menu recursive, */
  }
  const subfilter = id => {
    return props.myData
      .filter((item, itemIndex) => id === item.pid)
      .sort(function(a, b) {
        return a.seq < b.seq ? -1 : 1;
      });
  };

  return (
    <NavDropdown title={props.title} id={props.id}>
      {props.dt.map((dtt, index) => {
        //let subdata = menulist(props.myData, dtt.id);
        let subdata = subfilter(dtt.id);
        console.log(subdata);
        return subdata.length === 0 ? (
          <NavDropdown.Item eventKey={dtt.id} key={dtt.id + index}>
            {dtt.title}
          </NavDropdown.Item>
        ) : (
          <NavDropRecur
            dt={subdata}
            myData={props.myData}
            title={dtt.title}
            id={dtt.id}
            key={dtt.id}
          />
        );
      })}
    </NavDropdown>
  );
};

const Head1 = () => {
  let keyval;
  const dispatch = useDispatch();
  function handleSelect(selectedKey) {
    console.log("selected123 " + selectedKey);
    keyval = selectedKey;
    switch (selectedKey) {
      case "edit":
        const menu = JSON.parse(localStorage.getItem("menu"));
        //const submenu = directChild(menu, "", "seq");
        dispatch(globalVariable({ tempMenu: menu }));
        //dispatch(globalVariable({ subMenu: submenu }));
        break;
    }
  }
  const topbrand = (
    <Navbar.Brand href="#home">
      <img src={logo} className="d-inline-block align-top" width="40" />{" "}
      IMCMaster
    </Navbar.Brand>
  );

  const navDropdownTitle = <FontAwesomeIcon icon="user" size="lg" />;
  const navCog = <FontAwesomeIcon icon="cog" size="lg" />;
  const notyet = () => {
    alert("comming soon!!!");
  };
  const topright = (
    <Nav onSelect={handleSelect}>
      <Nav.Link>
        <NavDropdown title={navDropdownTitle} id="basic-nav-dropdown1">
          <NavDropdown.Item>
            <Link to="/Login">Log In</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/Join">Join</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/Login1">Log1 In</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/Join1">Join1 In</Link>
          </NavDropdown.Item>
        </NavDropdown>
      </Nav.Link>
      <Nav.Link>
        <NavDropdown title={navCog} id="basic-nav-dropdown2">
          <NavDropdown.Item eventKey={"edit"}>
            <Link to="/Edit">Edit</Link>
          </NavDropdown.Item>
          <NavDropdown.Item eventKey={"admin"}>Admin</NavDropdown.Item>
        </NavDropdown>
      </Nav.Link>

      <Nav.Link href="#link" onClick={notyet}>
        <FontAwesomeIcon
          icon="question-circle"
          size="lg"
          style={{ marginTop: "10" }}
        />
      </Nav.Link>
    </Nav>
  );

  return (
    <>
      <Navbar bg="dark" variant="dark">
        {topbrand}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Topmenu />
          <Form inline style={{ paddingRight: "40" }}>
            {topright}
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <ActiveLastBreadcrumb keyval={keyval} />
    </>
  );
};

export default Head1;
