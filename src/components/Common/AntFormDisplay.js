import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import $ from "jquery";
import axios from "axios";
import { currentsetting } from "components/functions/config";
import "antd/dist/antd.css";
import "./Antd.css";
import { Form, Row, Col } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import AntFormElement from "./AntFormElement";

const formData = {
  setting: {
    formItemLayout: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    },
    layout: "horizontal",
    //colnum: 1,
    size: "middle",
    initialValues: { name: "hhh" },
    onFinish2: (values) => {
      console.log("Received values of form: ", values);
    },
    onFinishFailed2: (values, errorFields, outOfDate) => {
      console.log(values, errorFields, outOfDate);
    },
  },
  list: [
    { label: "Name", name: "name", type: "input", seq: 1 },
    {
      label: "Pass",
      name: "password",
      type: "input.password",
      rules: [{ required: true, message: "enter!!!" }],
      seq: 2,
    },
    {
      type: "button",
      seq: 1000,
      tailLayout: {
        wrapperCol: { offset: 8, span: 16 },
      },
      btnArr: [
        {
          btnLabel: "Submit",
          btnStyle: "secondary",
          htmlType: "submit",
          seq: 0,
        },
        {
          btnLabel: "Cancel",
          btnStyle: "primary",
          htmlType: "button",
          seq: 1,
        },
      ],
    },

    {
      label: "Date",
      name: "date",
      type: "datepicker",
      rules: [
        { type: "object", required: true, message: "Please select time!" },
      ],
      seq: 0,
    },
  ],
};

const AntFormDisplay = (props) => {
  let editable = true;
  if (typeof props.editable != "undefined") editable = props.editable;
  const [formArray, setFormArray] = useState(props.formArray);
  const [form] = Form.useForm();

  let list = _.orderBy(formArray.list, ["seq"]);

  let layout = "",
    colnum = 1,
    formItemLayout = {},
    onFinish2,
    onFinishFailed2,
    initial = {},
    size = "middle";
  if (typeof formArray.setting != "undefined") {
    let st = formArray.setting;
    layout = st.layout;
    layout = "horizontal";
    colnum = st.colnum;
    formItemLayout = layout === "horizontal" ? st.formItemLayout : null;

    onFinish2 = st.onFinish2;
    onFinishFailed2 = st.onFinishFailed2;
    initial = st.initialValues;
    size = st.size;
  }

  const Element = (props) => {
    return list.map((k, i) => {
      return <AntFormElement {...k} {...props} />;
    });
  };
  const onFinish1 = (values) => {
    console.log(values);
  };
  const onFinishFailed1 = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        name="validate_other"
        className="SortForm"
        {...formItemLayout}
        layout={layout}
        form={form}
        onFinish={onFinish2}
        onChange={() => console.log("onchange")}
        onFinishFailed={onFinishFailed2}
        initialValues={initial}
        size={size}
      >
        {colnum == 1 ? (
          <Element
            col={colnum}
            layout={layout}
            formItemLayout={formItemLayout}
            editable={editable}
          />
        ) : (
          <Row gutter={24}>
            <Element
              col={colnum}
              layout={layout}
              formItemLayout={formItemLayout}
              editable={editable}
            />
          </Row>
        )}
      </Form>
    </>
  );
};

export default AntFormDisplay;
