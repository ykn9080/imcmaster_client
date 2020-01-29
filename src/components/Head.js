import React, { useEffect, useMemo } from "react";
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

import { useSelector } from "react-redux";
import { globalVariable } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../images/logo/imc1_1.png";
import imclogo from "../images/logo/imcmaster.png";
import { Topmenu } from "./Head2";
//import { getlogin } from "../fromImc/core";

const element = <FontAwesomeIcon icon="user" size="lg" />;

let menulist = [
  {
    menuid: "open4",
    comp: "1",
    title: "2ndopen",
    page: "",
    default: "",
    width: "150",
    menuopen: true,
    keepopen: false,
    position: "left",
    backcolor: "#4a6184",
    fontsize: "14px",
    theme: "cupertino",
    permissionname: "",
    permission: "",
    odr: 1
  },
  {
    menuid: "open5",
    comp: "1",
    title: "firstopen",
    page: "",
    default: "",
    width: "150",
    menuopen: false,
    keepopen: false,
    position: "left",
    backcolor: "#4a6184",
    fontsize: "14px",
    theme: "cupertino",
    permissionname: "",
    permission: "",
    odr: 0
  }
];

const submenulist = [
  {
    comp: "1",
    menuid: "open5",
    subid: "j170105124935",
    text: "plshelp",
    parent: "open5",
    icon: "fa-align-justify",
    permissionname: "",
    permission: "",
    table: [
      [
        {
          id: 0,
          style: "vertical-align:top;:",
          dv: [
            {
              id: "ac170105125118",
              clas: "drag orange1 jqgrid",
              style: "border-style: solid; cursor: move; width: 246px;",
              txt: "Grid"
            }
          ]
        },
        { id: 1, style: ":;vertical-align:top;:" },
        { id: 2, style: ":;vertical-align:top;:" }
      ]
    ],
    width: "256px,248px,248px"
  },
  {
    comp: "1",
    menuid: "open5",
    subid: "j170105124955",
    text: "goodsense",
    parent: "open5",
    icon: "fa-align-justify",
    permissionname: "",
    permission: "",
    table: [
      [
        {
          id: 0,
          style: "vertical-align:top;:",
          dv: [
            {
              id: "dc170105125334",
              clas: "drag yellow1 googlechart",
              style: "border-style: solid; cursor: move; width: 412px;",
              txt: "Chart"
            }
          ]
        },
        { id: 1, style: ":;vertical-align:top;:" }
      ]
    ],
    width: "422px,330px"
  },
  {
    comp: "1",
    menuid: "open4",
    subid: "j170101154713",
    text: "2nd2nd",
    parent: "open4",
    icon: "fa-align-justify",
    permissionname: "",
    permission: "",
    table: [
      [
        {
          id: 0,
          style: "vertical-align:top;:",
          dv: [
            {
              id: "dc1701159358",
              style: "border-style: solid; cursor: move; width: 262px;",
              clas: "drag yellow1 googlechart",
              txt: "Chart"
            }
          ]
        },
        {
          id: 1,
          rowspan: "3",
          style: "vertical-align:top;text-align:left;:",
          dv: [
            {
              id: "mc17011619938",
              style: "border-style: solid; cursor: move; width: 499px;",
              clas: "drag yellow1 rstat",
              txt: "R"
            }
          ]
        }
      ],
      [
        {
          id: 0,
          style: "vertical-align:top;:",
          dv: [
            {
              id: "ec170116185119",
              style: "border-style: solid; cursor: move; width: 262px;",
              clas: "drag yellow1 fullcalendar",
              txt: "Calendar"
            }
          ]
        },
        { id: 1, style: "vertical-align:top;:" }
      ],
      [
        {
          id: 0,
          style: "vertical-align:top;:",
          dv: [
            {
              id: "gc17011616729",
              style: "border-style: solid; cursor: move; width: 262px;",
              clas: "drag green1 map",
              txt: "Map"
            }
          ]
        },
        { id: 1, style: "vertical-align:top" }
      ]
    ],
    width: "277px,514px"
  },
  {
    comp: "1",
    menuid: "open4",
    subid: "j170122101759",
    text: "open2-2",
    parent: "open4",
    icon: "fa-align-justify",
    tab: "selected:selectedNone",
    height: "",
    permissionname: "",
    permission: "",
    table: [
      [
        {
          id: 0,
          style: "vertical-align:top;:",
          dv: [
            {
              id: "bc170122101848",
              clas: "drag green1 select",
              style: "border-style: solid; cursor: move; width: 240px;",
              txt: "Select"
            }
          ]
        },
        { id: 1, style: ":;vertical-align:top;:" },
        { id: 2, style: ":;vertical-align:top;:" }
      ]
    ],
    width: "252px,251px,249px"
  }
];
const subfilter = menuid => {
  return submenulist.filter((item, itemIndex) => menuid === item.menuid);
};

// const Topmenu = ()=>{
//   function handleSelect(selectedKey) {
//     console.log("selected123 " + selectedKey);
//   }
//   return(
//   <Nav className="mr-auto" onSelect={handleSelect}>
//     {menulist.map((dt, i) =>{
//       return(

//       subfilter(dt.menuid).length === 0
//       ?<Nav.Link key={i}>{dt.title}</Nav.Link>
//       :<NavDropdown title={dt.title} id={dt.menuid} key={dt.menuid}>
//           {subfilter(dt.menuid).map(dtt => {
//             return(
//             <NavDropdown.Item eventKey={dtt.subid} key={dtt.subid}>
//               {dtt.text}
//             </NavDropdown.Item>
//             )}
//           )}
//         </NavDropdown>
//       )}
//     )}
//   </Nav>
//   );
// };

const Head = () => {
  const global = useSelector(state => state.global);

  const topbrand = (
    <Navbar.Brand href="#home">
      <img src={logo} className="d-inline-block align-top" width="40" />{" "}
      IMCMaster
    </Navbar.Brand>
  );

  const repeat = <span>good</span>;
  const showme = () => {
    console.log("hhh");
  };
  const navDropdownTitle = <FontAwesomeIcon icon="user" size="lg" />;
  const topright = (
    <Nav>
      <Nav.Link>
        <NavDropdown title={navDropdownTitle} id="basic-nav-dropdown">
          <NavDropdown.Item>
            <Link to="/login">Log In</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/join">Join</Link>
          </NavDropdown.Item>
        </NavDropdown>
      </Nav.Link>
      <Nav.Link href="#home">
        <FontAwesomeIcon icon="globe" size="lg" style={{ marginTop: "10" }} />
      </Nav.Link>

      <Nav.Link href="#link" onClick={showme}>
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
      {" "}
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
    </>
  );
};

export default Head;
