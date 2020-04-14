import React from "react";
import _ from "lodash";
import "antd/dist/antd.css";
import "./Antd.css";
import { Form, Row, PageHeader } from "antd";
import AntFormElement, { FormItem } from "./AntFormElement";
import AntFormElementNoEdit from "./AntFormElementNoEdit";

const formArray = {
  setting: {
    formItemLayout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    },
    layout: "horizontal",
    col: 2,
    size: "middle",
    // initialValues: { name: "hhh" },
    onFinish: (values) => {
      console.log("Received values of form: ", values);
    },
    onFinishFailed: (values, errorFields, outOfDate) => {
      console.log(values, errorFields, outOfDate);
    },
  },
  list: [
    { label: "Title", name: "title", type: "input", seq: 0 },
    {
      label: "Desc",
      name: "desc",
      type: "input",
      seq: 1,
    },
    {
      label: "Column",
      name: "column",
      type: "input",
      seq: 2,
    },
    {
      label: "Layout",
      name: "layout",
      type: "radio.button",
      optionArray: [
        { text: "horizontal", value: "horizontal" },
        { text: "vertical", value: "vertical" },
        { text: "inline", value: "inline" },
      ],
      seq: 3,
    },
    {
      label: "Size",
      name: "size",
      type: "input",
      seq: 4,
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

    // {
    //   label: "Date",
    //   name: "date",
    //   type: "datepicker",
    //   rules: [
    //     { type: "object", required: true, message: "Please select time!" },
    //   ],
    //   seq: 0,
    // },
  ],
};

const AntFormEdit = () => {
  const [form] = Form.useForm();
  const list = formArray.list;
  const st = formArray.setting;
  const layout = st.layout;
  const col = st.col;
  const formItemLayout = st.formItemLayout;
  const onFinish = st.onFinish;
  const onFinishFailed = st.onFinishFailed;
  const initial = st.initialValues;
  const size = st.size;
  const Element = (props) => {
    return list.map((k, i) => {
      return <AntFormElement {...k} {...props} editable={false} />;
    });
  };
  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          className="site-page-header"
          title="Title"
          subTitle="This is a subtitle"
        >
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
            <Row gutter={24}>
              <Element
                col={col}
                layout={layout}
                formItemLayout={formItemLayout}
              />
            </Row>
            {/* {_.orderBy(list, ["seq"]).map((k, i) => {
          return <AntFormElement {...k} col={2} editable={false} />;
        })} */}
          </Form>
        </PageHeader>
      </div>
    </>
  );
};

export default AntFormEdit;
