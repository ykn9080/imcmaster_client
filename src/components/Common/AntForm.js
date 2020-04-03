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

const AntForm = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 }
        }
      : null;

  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: { span: 14, offset: 4 }
        }
      : null;

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const onFinish = values => {
    console.log("Success:", values);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };
  const onGenderChange = value => {
    console.log(value);
  };
  return (
    <Form
      {...layout}
      layout="vertical"
      name="basic"
      form={form}
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="small"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!"
          }
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item label="Field A" name="fa">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Field B" name="fb">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Select" name="select">
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
          <Select.Option value="real">Real</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true
          }
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Form Layout" name="layout">
        <Radio.Group value={formLayout}>
          <Radio.Button value="horizontal">Horizontal</Radio.Button>
          <Radio.Button value="vertical">Vertical</Radio.Button>
          <Radio.Button value="inline">Inline</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Cascader" name="casc">
        <Cascader
          options={[
            {
              value: "zhejiang",
              label: "Zhejiang",
              children: [
                {
                  value: "hangzhou",
                  label: "Hangzhou"
                }
              ]
            }
          ]}
        />
      </Form.Item>
      <Form.Item label="DatePicker" name="datepicker">
        <DatePicker />
      </Form.Item>
      <Form.Item label="InputNumber" name="inputnum">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Switch" name="switch">
        <Switch />
      </Form.Item>
      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AntForm;
