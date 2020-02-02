import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
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
import { globalVariable } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActiveLastBreadcrumb } from "./BreadCrumb";
import { MultiDispatch, GlobalDispatch } from "../../reducers/multipleDispatch";
import logo from "../../images/logo/imc1_1.png";
import Signin from "../Login/Login1";
import imclogo from "../../images/logo/imcmaster.png";
//import { getlogin } from "../fromImc/core";

const element = <FontAwesomeIcon icon="user" size="lg" />;

const Topmenu = () => {
  const dispatch = useDispatch();
  function handleSelect(selectedKey) {
    dispatch(globalVariable({ selectedKey: selectedKey }));
  }
  const menulist = JSON.parse(localStorage.getItem("imctable")).menu;
  return (
    <Nav className="mr-auto" onSelect={handleSelect}>
      {menulist.map((dt, i) => {
        const ddList = JSON.parse(
          localStorage.getItem("imctable")
        ).submenu.filter((item, itemIndex) => dt.menuid === item.parent);
        return ddList.length === 0 ? (
          <Nav.Link key={dt.title + i}>{dt.title}</Nav.Link>
        ) : (
          <NavDropRecur
            dt={ddList}
            title={dt.title}
            id={dt.menuid}
            key={dt.menuid}
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
  const [subList, setSubList] = useState(
    JSON.parse(localStorage.getItem("imctable")).submenu
  );
  const subfilter = id => {
    return subList.filter((item, itemIndex) => id === item.parent);
  };
  return (
    <NavDropdown title={props.title} id={props.id}>
      {props.dt.map((dtt, index) => {
        let subdata = subfilter(dtt.subid);
        return subdata.length === 0 ? (
          <NavDropdown.Item eventKey={dtt.subid} key={dtt.subid + index}>
            {dtt.text}
          </NavDropdown.Item>
        ) : (
          <NavDropRecur
            dt={subdata}
            title={dtt.title}
            id={dtt.subid}
            key={dtt.subid}
          />
        );
      })}
    </NavDropdown>
  );
};

const Head1 = () => {
  let keyval;
  function handleSelect(selectedKey) {
    console.log("selected123 " + selectedKey);
    keyval = selectedKey;
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
          <NavDropdown.Item eventKey={"edit"}>Edit</NavDropdown.Item>
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
