import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { currentsetting } from "components/functions/config";
import { Link } from "react-router-dom";
import { globalVariable } from "actions";
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
import AntForm from "components/Common/AntForm";
import AntFormBuild from "components/Common/AntFormBuild";
import BootFormDisplay from "components/Common/BootFormDisplay";
import DenseAppBar from "components/Common/AppBar";
import IconBtn from "components/Common/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";

const formData = {
  setting: {
    formItemLayout: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    },
    layout: "vertical",
    size: "middle",
    initialValues: { name: "hhh" },
    onFinish: values => {
      console.log("Received values of form: ", values);
    },
    onFinishFailed: (values, errorFields, outOfDate) => {
      console.log(values, errorFields, outOfDate);
    }
  },
  list: [
    { label: "Name", name: "name", type: "input", seq: 1 },
    {
      label: "Pass",
      name: "password",
      type: "input.password",
      rules: [{ required: true, message: "enter!!!" }],
      seq: 2
    },
    {
      type: "button",
      seq: 1000,
      tailLayout: {
        wrapperCol: { offset: 8, span: 16 }
      },
      btnArr: [
        {
          btnLabel: "Submit",
          btnStyle: "secondary",
          htmlType: "submit",
          seq: 0
        },
        {
          btnLabel: "Cancel",
          btnStyle: "primary",
          htmlType: "button",
          seq: 1
        }
      ]
    },

    {
      label: "Date",
      name: "date",
      type: "datepicker",
      rules: [
        { type: "object", required: true, message: "Please select time!" }
      ],
      seq: 0
    }
  ]
};

const EditTab = props => {
  const [activeTab, setActiveTab] = useState("1");
  const [formArray, setFormArray] = useState([]);
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
  const dispatch = useDispatch();
  const pathname = encodeURIComponent(window.location.pathname);
  useEffect(() => {
    console.log(pathname);
    axios
      .get(`${currentsetting.webserviceprefix}bootform/id?pathname=${pathname}`)
      .then(function(response) {
        setFormArray(response.data[0].data);
        //dispatch(globalVariable({ formData: response.data[0].data }));
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);
  //for right icon at DenseAppBar for edit BootFormDisplay

  let edit = useSelector(state => state.global.formEdit);
  const handleEdit = () => {
    dispatch(globalVariable({ formEdit: !edit }));
  };
  const right = (
    <IconBtn tooltip={"Edit Page"} handleClick={handleEdit}>
      <SettingsIcon />
    </IconBtn>
  );

  return (
    <>
      <DenseAppBar title={"Control Edit"} right={right} />

      <div style={{ paddingLeft: 5, marginTop: 10 }}>
        <Nav tabs>
          <NItem indx={"1"} title={"Summary"} />
          <NItem indx={"2"} title={"DataSource"} />
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="6">
                <AntFormBuild {...formData} />
              </Col>
              <Col sm="6"></Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <DataSrc />
                {/* <BootFormDisplay edit={true} formArray={formArray} /> */}
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default EditTab;
