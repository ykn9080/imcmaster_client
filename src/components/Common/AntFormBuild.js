import React, { useState, useEffect } from "react";
import _ from "lodash";
import $ from "jquery";
import axios from "axios";
import { currentsetting } from "components/functions/config";
import "antd/dist/antd.css";
import "./Antd.css";
import { Form, Row, Col } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import AntFormElement from "./AntFormElement";

const AntFormBuild = (props) => {
  const [form] = Form.useForm();
  const [formArray, setFormArray] = useState("");
  let initial = {};
  if (typeof formArray.setting != "undefined")
    initial = formArray.setting.initialValues;

  useEffect(() => {
    axios
      .get(
        `${currentsetting.webserviceprefix}bootform/id?pathname=${props.pathname}`
      )
      .then(function (response) {
        setFormArray(response.data[0].data);
        const formItemLayout =
          formArray.setting.layout === "horizontal"
            ? {
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
              }
            : null;

        const tailLayout =
          formArray.setting.layout === "horizontal"
            ? {
                wrapperCol: { span: 16, offset: 8 },
              }
            : null;
      })
      .catch(function (error) {
        console.log(error);
      });
    //if (props.formArray !== "undefined") setFormArray(props.formArray);

    //$(refs.sortable);
    const $node = $(".SortForm");

    $node.sortable({
      opacity: 0.8,
      start: function (event, ui) {
        var start_pos = ui.item.index();
        ui.item.data("start_pos", start_pos);
      },
      update: function (event, ui) {
        var start_pos = ui.item.data("start_pos");
        var end_pos = ui.item.index();
        //$('#sortable li').removeClass('highlights');
        console.log(start_pos, end_pos);
      },
    });
    return () => {
      $node.sortable();
    };
  }, []);
  console.log(formArray);
  // if (typeof initial === "undefined") initial = {};

  return (
    <Form
      name="validate_other"
      className="SortForm"
      // {...formItemLayout}
      // layout={formArray.setting.layout}
      form={form}
      // onFinish={formArray.setting.onFinish}
      // onFinishFailed={formArray.setting.onFinishFailed}
      // initialValues={initial}
      // size={formArray.setting.size}
    >
      {_.orderBy(formArray.list, ["seq"]).map((k, i) => {
        return <AntFormElement {...k} />;
      })}
    </Form>
  );
};

export default AntFormBuild;
