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

// const submenulist = [
//   {
//     comp: "1",
//     menuid: "open5",
//     subid: "j170105124935",
//     text: "plshelp",
//     parent: "open5",
//     icon: "fa-align-justify",
//     permissionname: "",
//     permission: "",
//     table: [
//       [
//         {
//           id: 0,
//           style: "vertical-align:top;:",
//           dv: [
//             {
//               id: "ac170105125118",
//               clas: "drag orange1 jqgrid",
//               style: "border-style: solid; cursor: move; width: 246px;",
//               txt: "Grid"
//             }
//           ]
//         },
//         { id: 1, style: ":;vertical-align:top;:" },
//         { id: 2, style: ":;vertical-align:top;:" }
//       ]
//     ],
//     width: "256px,248px,248px"
//   },
//   {
//     comp: "1",
//     menuid: "open5",
//     subid: "j170105124955",
//     text: "goodsense",
//     parent: "open5",
//     icon: "fa-align-justify",
//     permissionname: "",
//     permission: "",
//     table: [
//       [
//         {
//           id: 0,
//           style: "vertical-align:top;:",
//           dv: [
//             {
//               id: "dc170105125334",
//               clas: "drag yellow1 googlechart",
//               style: "border-style: solid; cursor: move; width: 412px;",
//               txt: "Chart"
//             }
//           ]
//         },
//         { id: 1, style: ":;vertical-align:top;:" }
//       ]
//     ],
//     width: "422px,330px"
//   },
//   {
//     comp: "1",
//     menuid: "open4",
//     subid: "j170101154713",
//     text: "2nd2nd",
//     parent: "open4",
//     icon: "fa-align-justify",
//     permissionname: "",
//     permission: "",
//     table: [
//       [
//         {
//           id: 0,
//           style: "vertical-align:top;:",
//           dv: [
//             {
//               id: "dc1701159358",
//               style: "border-style: solid; cursor: move; width: 262px;",
//               clas: "drag yellow1 googlechart",
//               txt: "Chart"
//             }
//           ]
//         },
//         {
//           id: 1,
//           rowspan: "3",
//           style: "vertical-align:top;text-align:left;:",
//           dv: [
//             {
//               id: "mc17011619938",
//               style: "border-style: solid; cursor: move; width: 499px;",
//               clas: "drag yellow1 rstat",
//               txt: "R"
//             }
//           ]
//         }
//       ],
//       [
//         {
//           id: 0,
//           style: "vertical-align:top;:",
//           dv: [
//             {
//               id: "ec170116185119",
//               style: "border-style: solid; cursor: move; width: 262px;",
//               clas: "drag yellow1 fullcalendar",
//               txt: "Calendar"
//             }
//           ]
//         },
//         { id: 1, style: "vertical-align:top;:" }
//       ],
//       [
//         {
//           id: 0,
//           style: "vertical-align:top;:",
//           dv: [
//             {
//               id: "gc17011616729",
//               style: "border-style: solid; cursor: move; width: 262px;",
//               clas: "drag green1 map",
//               txt: "Map"
//             }
//           ]
//         },
//         { id: 1, style: "vertical-align:top" }
//       ]
//     ],
//     width: "277px,514px"
//   },
//   {
//     comp: "1",
//     menuid: "open4",
//     subid: "j170122101759",
//     text: "open2-2",
//     parent: "open4",
//     icon: "fa-align-justify",
//     tab: "selected:selectedNone",
//     height: "",
//     permissionname: "",
//     permission: "",
//     table: [
//       [
//         {
//           id: 0,
//           style: "vertical-align:top;:",
//           dv: [
//             {
//               id: "bc170122101848",
//               clas: "drag green1 select",
//               style: "border-style: solid; cursor: move; width: 240px;",
//               txt: "Select"
//             }
//           ]
//         },
//         { id: 1, style: ":;vertical-align:top;:" },
//         { id: 2, style: ":;vertical-align:top;:" }
//       ]
//     ],
//     width: "252px,251px,249px"
//   }
// ];

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
