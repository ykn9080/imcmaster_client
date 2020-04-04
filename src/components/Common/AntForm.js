import React, { useState } from "react";
import "antd/dist/antd.css";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

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
  Cascader,
  Slider,
  Upload,
  Icon,
  Rate,
  Row,
  Col
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

const AntForm = props => {
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
  const normFile = e => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };
  const onGenderChange = value => {
    console.log(value);
  };
  return (
    <Form
      {...formItemLayout}
      layout="horizontal"
      name="basic"
      form={form}
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="small"
    >
      <Form.Item label="Plain Text">
        <span className="ant-form-text">China</span>
      </Form.Item>
      <Form.Item
        name="select"
        label="Select"
        hasFeedback
        rules={[{ required: true, message: "Please select your country!" }]}
      >
        <Select placeholder="Please select a country">
          <Option value="china">China</Option>
          <Option value="usa">U.S.A</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="select-multiple"
        label="Select[multiple]"
        rules={[
          {
            required: true,
            message: "Please select your favourite colors!",
            type: "array"
          }
        ]}
      >
        <Select mode="multiple" placeholder="Please select favourite colors">
          <Option value="red">Red</Option>
          <Option value="green">Green</Option>
          <Option value="blue">Blue</Option>
        </Select>
      </Form.Item>
      <Form.Item label="InputNumber">
        <Form.Item name="input-number" noStyle>
          <InputNumber min={1} max={10} />
        </Form.Item>
        <span className="ant-form-text"> machines</span>
      </Form.Item>
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
      <Form.Item name="radio-group" label="Radio.Group">
        <Radio.Group>
          <Radio value="a">item 1</Radio>
          <Radio value="b">item 2</Radio>
          <Radio value="c">item 3</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="radio-button" label="Radio.Button">
        <Radio.Group>
          <Radio.Button value="a">item 1</Radio.Button>
          <Radio.Button value="b">item 2</Radio.Button>
          <Radio.Button value="c">item 3</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="rate" label="Rate">
        <Rate />
      </Form.Item>
      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="longgggggggggggggggggggggggggggggggggg"
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button>
            <UploadOutlined /> Click to upload
          </Button>
        </Upload>
      </Form.Item>

      <Form.Item name="checkbox-group" label="Checkbox.Group">
        <Checkbox.Group>
          <Row>
            <Col span={8}>
              <Checkbox
                value="A"
                style={{
                  lineHeight: "32px"
                }}
              >
                A
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                value="B"
                style={{
                  lineHeight: "32px"
                }}
                disabled
              >
                B
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                value="C"
                style={{
                  lineHeight: "32px"
                }}
              >
                C
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                value="D"
                style={{
                  lineHeight: "32px"
                }}
              >
                D
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                value="E"
                style={{
                  lineHeight: "32px"
                }}
              >
                E
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                value="F"
                style={{
                  lineHeight: "32px"
                }}
              >
                F
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
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
