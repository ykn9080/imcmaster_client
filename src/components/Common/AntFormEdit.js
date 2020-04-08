import React from "react";
import _ from "lodash";
import "antd/dist/antd.css";
import "./Antd.css";
import { Form } from "antd";
import AntFormElementNoEdit from "./AntFormElementNoEdit";

const formArray = {
  setting: {
    formItemLayout: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    },
    layout: "horizontal",
    size: "middle",
    initialValues: { name: "hhh" },
    onFinish: (values) => {
      console.log("Received values of form: ", values);
    },
    onFinishFailed: (values, errorFields, outOfDate) => {
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

const AntFormEdit = () => {
  const [form] = Form.useForm();
  const list = formArray.list;
  const st = formArray.setting;
  const layout = st.layout;
  const formItemLayout = st.formItemLayout;
  const onFinish = st.onFinish;
  const onFinishFailed = st.onFinishFailed;
  const initial = st.initialValues;
  const size = st.size;

  return (
    <>
      <Form
        name="Form_Edit"
        className="FormEdit"
        {...formItemLayout}
        layout={layout}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={initial}
        size={size}
      >
        {_.orderBy(list, ["seq"]).map((k, i) => {
          return <AntFormElementNoEdit {...k} />;
        })}
      </Form>
    </>
  );
};

export default AntFormEdit;
