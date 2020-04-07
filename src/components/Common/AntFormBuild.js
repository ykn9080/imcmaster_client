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
import SpeedDialButton from "./SpeedDial";
import ElementInput from "Admin/ElementInput";
import DialogFull from "./DialogFull";

const formData = {
  setting: {
    formItemLayout: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    },
    layout: "horizontal",
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

const AntFormBuild = () => {
  const [formArray, setFormArray] = useState("");
  const [form] = Form.useForm();
  let edit = useSelector(state => state.global.formEdit);
  //let elData = useSelector(state => state.global.elementData);
  let open = useSelector(state => state.global.openDialog);
  let list = formArray.list;
  //let layout = formArray.setting.layout;
  let layout = "",
    formItemLayout = {},
    onFinish,
    onFinishFailed,
    initial = {},
    size = "middle";
  if (typeof formArray.setting != "undefined") {
    let st = formArray.setting;
    layout = st.layout;
    formItemLayout = st.formItemLayout;
    onFinish = st.onFinish;
    onFinishFailed = st.onFinishFailed;
    initial = st.initialValues;
    size = st.size;
  }
  const ReOrder = (start_pos, end_pos) => {
    let arr = localStorage.getItem("formData");
    arr = JSON.parse(arr);
    const _id = arr._id;
    let newArr = [];
    let list = _.sortBy(arr.data.list, ["seq"]);
    if (start_pos < end_pos)
      _.forEach(list, function(value, key) {
        if (value.type !== "button") {
          if (value.seq <= end_pos && value.seq > start_pos) value.seq--;
          else if (value.seq === start_pos) value.seq = end_pos;
        }
        newArr.push(value);
      });
    if (start_pos > end_pos)
      _.forEach(list, function(value, key) {
        if (value.type !== "button") {
          if (value.seq >= end_pos && value.seq < start_pos) value.seq++;
          else if (value.seq === start_pos) value.seq = end_pos;
        }
        newArr.push(value);
      });
    arr.data.list = newArr;
    localStorage.setItem("formData", JSON.stringify(arr));
    setFormArray(arr.data);
    axios
      .put(`${currentsetting.webserviceprefix}bootform/${_id}`, arr)
      .then(r => console.log(r));
    //st>ed -> st prev +1 st->ed
  };
  const pathname = encodeURIComponent(window.location.pathname);
  useEffect(async () => {
    const result = await axios.get(
      `${currentsetting.webserviceprefix}bootform/id?pathname=${pathname}`
    );
    setFormArray(result.data[0].data);
    localStorage.setItem("formData", JSON.stringify(result.data[0]));

    //$(refs.sortable);
    const $node = $(".SortForm");
    $node.sortable({
      opacity: 0.8,
      placeholder: "ui-state-highlight",
      start: function(event, ui) {
        var start_pos = ui.item.index();
        ui.item.data("start_pos", start_pos);
      },
      update: function(event, ui) {
        var start_pos = ui.item.data("start_pos");
        var end_pos = ui.item.index();
        //$('#sortable li').removeClass('highlights');
        ReOrder(start_pos, end_pos);
      }
    });
    return () => {
      $node.sortable({
        placeholder: "ui-state-highlight"
      });
    };
  }, []);

  // if (typeof initial === "undefined") initial = {};

  return (
    <>
      <Form
        name="validate_other"
        className="SortForm"
        {...formItemLayout}
        layout={layout}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={initial}
        size={size}
      >
        {_.orderBy(list, ["seq"]).map((k, i) => {
          return <AntFormElement {...k} />;
        })}
      </Form>
      {edit && (
        <>
          <SpeedDialButton />
          <DialogFull open={open}>
            <ElementInput />
          </DialogFull>
        </>
      )}
    </>
  );
};

export default AntFormBuild;
