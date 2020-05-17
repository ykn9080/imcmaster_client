import React, { useState } from "react";
import _ from "lodash";
import "antd/dist/antd.css";
import "./Antd.css";
import { Form, Row } from "antd";
import AntFormElement from "./AntFormElement";

// const formData = {
//   setting: {
//     formItemLayout: {
//       labelCol: { span: 8 },
//       wrapperCol: { span: 16 },
//     },
//     layout: "horizontal",
//     //formColumn: 1,
//     size: "middle",
//     initialValues: { name: "hhh" },
//     onFinish2: (values) => {
//       console.log("Received values of form: ", values);
//     },
//     onFinishFailed2: (values, errorFields, outOfDate) => {
//       console.log(values, errorFields, outOfDate);
//     },
//   },
//   list: [
//     { label: "Name", name: "name", type: "input", seq: 1 },
//     {
//       label: "Pass",
//       name: "password",
//       type: "input.password",
//       rules: [{ required: true, message: "enter!!!" }],
//       seq: 2,
//     },
//     {
//       type: "button",
//       seq: 1000,
//       tailLayout: {
//         wrapperCol: { offset: 8, span: 16 },
//       },
//       btnArr: [
//         {
//           btnLabel: "Submit",
//           btnStyle: "secondary",
//           htmlType: "submit",
//           seq: 0,
//         },
//         {
//           btnLabel: "Cancel",
//           btnStyle: "primary",
//           htmlType: "button",
//           seq: 1,
//         },
//       ],
//     },

//     {
//       label: "Date",
//       name: "date",
//       type: "datepicker",
//       rules: [
//         { type: "object", required: true, message: "Please select time!" },
//       ],
//       seq: 0,
//     },
//   ],
// };

const AntFormDisplay = (props) => {
  let editable = false,
    name = "antform";
  if (props.name) name = props.name;
  if (typeof props.editable != "undefined") editable = props.editable;
  const [formArray, setFormArray] = useState(props.formArray);
  const [form] = Form.useForm();

  let list = _.orderBy(formArray.list, ["seq"]);

  let layout = "",
    formColumn = 1,
    formItemLayout = {},
    tailLayout = {},
    onFinish,
    onFinishFailed,
    onValuesChange,
    onFieldsChange,
    initial = {},
    size = "middle";
  if (typeof formArray.setting != "undefined") {
    let st = formArray.setting;
    layout = st.layout;
    //layout = "horizontal";
    if (st.formColumn) formColumn = st.formColumn;
    formItemLayout = layout === "horizontal" ? st.formItemLayout : null;
    tailLayout =
      layout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: formItemLayout.labelCol.span },
          }
        : null;
    onFinish = st.onFinish;
    onFinishFailed = st.onFinishFailed;
    onValuesChange = st.onValuesChange;
    onFieldsChange = st.onFieldsChange;
    initial = st.initialValues;
    size = st.size;
  }

  const Element = (props) => {
    return list.map((k, i) => {
      return <AntFormElement key={i} {...k} {...props} />;
    });
  };
  // const onFinish1 = (values) => {
  //   console.log(values);
  // };
  // const onFinishFailed1 = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };
  // const propcontent={
  //   formColumn:formColumn
  // layout=:layout
  // formItemLayout=:formItemLayout
  // tailLayout=:tailLayout
  // editable:editable}
  return (
    <>
      <Form
        name={name}
        className="SortForm"
        {...formItemLayout}
        layout={layout}
        form={form}
        onValuesChange={onValuesChange}
        onFieldsChange={onFieldsChange}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={initial}
        size={size}
      >
        {formColumn > 1 ? (
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Element
              formColumn={formColumn}
              layout={layout}
              formItemLayout={formItemLayout}
              tailLayout={tailLayout}
              editable={editable}
            />
          </Row>
        ) : (
          <Element
            formColumn={formColumn}
            layout={layout}
            formItemLayout={formItemLayout}
            tailLayout={tailLayout}
            editable={editable}
          />
        )}
      </Form>
    </>
  );
};

export default AntFormDisplay;
