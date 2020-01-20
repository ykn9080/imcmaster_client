import React, { useState } from "react";
import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Join from "./Join";

const NavLogin = () => {
  const [activeTab, setActiveTab] = useState("1");
  return (
    <div>
      {/* <div style="margin-bottom:30px">
        <img src="/images/logo/imc1_1.png" style="width:60px;" />
        <img src="/images/logo/imcmaster.png" style="width:150px" />
      </div> */}
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab == "1" ? "active" : ""}
            href="#dvLogin"
            onClick={() => {
              setActiveTab("1");
            }}
          >
            Login
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab == "2" ? "active" : ""}
            href="#dvJoin"
            onClick={() => {
              setActiveTab("2");
            }}
          >
            Join
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Login />
        </TabPane>
        <TabPane tabId="2">Join!!!</TabPane>
      </TabContent>
    </div>
    // <script>
    //     $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    //         $(e.target).closest("ul").find("a").removeClass("active")
    //         $(e.target).addClass("active") // newly activated tab
    //     });
    // </script>
  );
};
export default NavLogin;
