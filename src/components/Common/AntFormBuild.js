import React, { useState } from "react";
import _ from "lodash";
import "antd/dist/antd.css";

import { Form, Row, Col } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import AntFormElement from "./AntFormElement";

const AntFormBuild = ({ setting, list }) => {
  const [form] = Form.useForm();
  let initial = setting.initialValues;

  if (typeof initial === "undefined") initial = {};
  const formItemLayout =
    setting.layout === "horizontal"
      ? {
          labelCol: { span: 8 },
          wrapperCol: { span: 16 }
        }
      : null;

  const tailLayout =
    setting.layout === "horizontal"
      ? {
          wrapperCol: { span: 16, offset: 8 }
        }
      : null;

  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      layout={setting.layout}
      form={form}
      onFinish={setting.onFinish}
      onFinishFailed={setting.onFinishFailed}
      initialValues={initial}
      size={setting.size}
    >
      {_.orderBy(list, ["seq"]).map((k, i) => {
        return <AntFormElement {...k} />;
      })}
    </Form>
  );
};

export default AntFormBuild;
