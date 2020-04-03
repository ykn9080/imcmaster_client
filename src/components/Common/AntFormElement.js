import React, { useState } from "react";
import "antd/dist/antd.css";

import {
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  Radio,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Cascader
} from "antd";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

const AntFormElement = props => {
  let ruleset = {};
  if (rules in props) ruleset = props.rules;
  return (
    <Form.Item label={props.label} name={props.name} rules={[ruleset]}>
      {(() => {
        switch (props.controlType) {
          case "input":
            <Input />;
            break;
          case "input.password":
            <Input.Password />;
            break;
        }
      })()}
    </Form.Item>
  );
};
