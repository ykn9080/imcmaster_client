import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import DataSrc from "./DataSrc";
import Summary from "./Summary";
import DynamicForm from "components/Common/DynamicForm";
import BootFormBuilder from "components/Common/BootFormBuilder";
import BootFormDisplay from "components/Common/BootFormDisplay";
import DenseAppBar from "components/Common/AppBar";

const EditTab = props => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const NItem = ({ indx, title }) => {
    return (
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === indx })}
          onClick={() => {
            toggle(indx);
          }}
        >
          {title}
        </NavLink>
      </NavItem>
    );
  };
  const pathname = encodeURIComponent(window.location.pathname);

  return (
    <>
      <DenseAppBar showEdit={true} />
      <div style={{ paddingLeft: 5, marginTop: 10 }}>
        <Nav tabs>
          <NItem indx={"1"} title={"Summary"} />
          <NItem indx={"2"} title={"DataSource"} />
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="6">
                <BootFormBuilder pathname={pathname} edit={true} />
              </Col>
              <Col sm="6">
                <Button>Go somewhere</Button>
              </Col>
              {/* <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <Summary />
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>

                <Button>Go somewhere</Button>
              </Card>
            </Col> */}
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <DataSrc />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default EditTab;
