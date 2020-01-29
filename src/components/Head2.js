import React, { useEffect, useState } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
  Button,
  Form,
  FormControl
} from "react-bootstrap";

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

const NavDropRecur = props => {
  const [subList, setSubList] = useState(
    JSON.parse(localStorage.getItem("imctable")).submenu
  );
  const subfilter = id => {
    return subList.filter((item, itemIndex) => id === item.parent);
  };
  // useEffect(() => {
  //   subList = JSON.parse(localStorage.getItem("imctable")).submenu;
  // }, [subList]);

  console.log(props);
  return (
    <NavDropdown title={props.title} id={props.id} key={props.key}>
      {props.subList.map(dtt => {
        setSubList = subfilter(dtt.subid);
        return subList.length === 0 ? (
          <NavDropdown.Item eventKey={dtt.subid} key={dtt.subid}>
            {dtt.text}
          </NavDropdown.Item>
        ) : (
          <NavDropRecur title={dtt.title} id={dtt.subid} key={dtt.subid} />
        );
      })}
    </NavDropdown>
  );
};
export const Topmenu = () => {
  function handleSelect(selectedKey) {
    console.log("selected123 " + selectedKey);
  }

  return (
    <Nav className="mr-auto" onSelect={handleSelect}>
      {menulist.map((dt, i) => {
        const ddList = JSON.parse(
          localStorage.getItem("imctable")
        ).submenu.filter((item, itemIndex) => dt.menuid === item.parent);
        return ddList.length === 0 ? (
          <Nav.Link key={i}>{dt.title}</Nav.Link>
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
export const Menu = ({ data }) => {
  return (
    <ul>
      {data.map(m => {
        return (
          <li>
            {m.title}
            {m.children && <Menu data={m.children} />}
          </li>
        );
      })}
    </ul>
  );
};

const Recur = () => {
  return <Menu data={data} />;
};

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

let data = [
  {
    title: "Top level 1",
    slug: "top-level-1",
    children: [
      {
        title: "Sub level 1",
        slug: "sub-level-1",
        children: [
          {
            title: "Sub Sub Level 1",
            slug: "sub-sub-level-1",
            children: [
              {
                title: "Sub Sub Level 2",
                slug: "sub-sub-level-2",
                children: [
                  {
                    title: "Sub Sub Level 23",
                    slug: "sub-sub-level-23"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        title: "Sub level 2",
        slug: "sub-level-2"
      }
    ]
  },
  {
    title: "Top level 2",
    slug: "top-level 2"
  }
];
export default Recur;
