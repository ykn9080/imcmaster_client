import React, { useEffect } from "react";
import $ from "jquery";
import {
  Nav,
  Navbar,
  NavDropdown,
  Button,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, globalVariable } from "actions";
import MultiDispatch, { gb } from "reducers/multipleDispatch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "images/logo/imc1_1.png";

const element = <FontAwesomeIcon icon="user" size="lg" />;
class topright extends React.Component {
  render() {
    return (
      <div>
        <Nav>
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">{element}</Nav.Link>
        </Nav>
      </div>
    );
  }
}
const Head1 = () => {
  const counter = useSelector(state => state.counter);
  const global = useSelector(state => state.global);
  const dispatch = useDispatch();
  MultiDispatch({ vv: "vvvvvv" });
  console.log(gb);
  const brandStyle = { maxWidth: "300px !important" };

  const topbrand = (
    <Navbar.Brand href="#home">
      <img src={logo} className="d-inline-block align-top" width="40" />{" "}
      IMCMaster
    </Navbar.Brand>
  );
  const topmenu = (
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
      <NavDropdown title="2ndopt" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">{element}</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>

        <NavDropdown
          style={{ marginLeft: "14px" }}
          title="2ndopt-1"
          id="basic-nav-dropdown1"
          drop={"right"}
          variant="secondary"
        >
          <NavDropdown.Item href="#action/3.1">Action1</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">
            Another action1
          </NavDropdown.Item>
        </NavDropdown>
      </NavDropdown>
    </Nav>
  );
  const repeat = <span>good</span>;
  const showme = () => {
    console.log("hhh");
  };
  const topright = (
    <Nav>
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#home">{repeat}</Nav.Link>
      <Nav.Link href="#link" onClick={showme}>
        {element}
      </Nav.Link>
    </Nav>
  );
  const topNav = (
    <Navbar bg="dark" variant="dark">
      {topbrand}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {topmenu}
        <Form inline>{topright}</Form>
      </Navbar.Collapse>
    </Navbar>
  );
  const Animal = ({ name }) => (
    <li>
      <span>{name}</span>
    </li>
  );

  const topnav = (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {topmenu}
      <Form inline>
        {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button> */}
        {topmenu}
      </Form>
    </Navbar>
  );

  useEffect(() => {
    //$("#dvHead").append($("<ul/>").append($("<li> hi</li>")));
    $(".navbar-brand").css("max-width", "300px");
    // $("#dvHead").append(
    //   $('<Navbar bg="light" expand="lg"/>').append(
    //     $('<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>')
    //   )
    // );
  }, []);
  return (
    <>
      <h3>Counter: {counter}</h3>
      <Button onClick={() => dispatch(increment())}>+</Button>
      <Button onClick={() => dispatch(decrement())}>-</Button>
      <Button
        onClick={() => dispatch(globalVariable({ good: "low", happy: "girl" }))}
      >
        init
      </Button>
      <Button onClick={() => dispatch(globalVariable({ four: "b123ad" }))}>
        chg
      </Button>
      <Button onClick={() => console.log(global, global.three)}>chg</Button>
      <FontAwesomeIcon icon={["fal", "faBoxingGlove"]} size="sm" />
      <FontAwesomeIcon icon="check-square" />
      <div id="dvHead" />
      {topNav}
      <topright />
      {/* <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                </NavDropdown.Item>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar> */}

      {/* <ul
        id="main-top"
        style={{marginBottom: 2, zIndex: 10, border: "none", backgroundColor: "rgb(255, 255, 255)"}}
        class="sm sm-clean"
        data-smartmenus-id="15798366308853345"
      >
        <div
          id="splogo"
          onClick={menuHome}
          style={{marginTop:8, marginLeft:10, float:"left"}}
        >
          <img style={{width:50}} src="/images/logo/imc1_1.png" />
          <img style={{width:120}} src="/images/logo/imcmaster.png" />
        </div>
        <li style={{float: "right"}}>
          <a className="imdim">
            <i className="fa fa-question-circle"></i>
          </a>
        </li>
        <li class="language" style="float: right;">
          <a class="imdim">
            <i class="fa fa-globe"></i>
          </a>
        </li>
        <li style="float: right;">
          <a
            class="imdim has-submenu"
            id="sm-15798366308853345-1"
            aria-haspopup="true"
            aria-controls="sm-15798366308853345-2"
            aria-expanded="false"
          >
            <span class="sub-arrow">+</span>
            <i class="fa fa-user"></i>
          </a>
          <ul
            id="sm-15798366308853345-2"
            role="group"
            aria-hidden="true"
            aria-labelledby="sm-15798366308853345-1"
            aria-expanded="false"
            class="sm-nowrap"
            style="width: auto; display: none; top: auto; left: 0px; margin-left: -1px; margin-top: 4px; min-width: 10em; max-width: 20em;"
          >
            <li>
              <a id="alog" lang="en" onClick="toggleLogin('login')">
                Log In
              </a>
            </li>
            <li></li>
            <li>
              <a lang="en" onClick="toggleLogin('join')">
                Join
              </a>
            </li>
            <li></li>
          </ul>
        </li>
      </ul> */}
    </>
  );
};
// const Head = () => {
//   useEffect(() => {
//     menuHead();
//   }, []);
// };
export default Head1;
