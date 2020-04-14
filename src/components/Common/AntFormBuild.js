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
import AntFormElementNoEdit from "./AntFormElementNoEdit";
import SpeedDialButton from "./SpeedDial";
import ElementInput from "Admin/ElementInput";
import DialogFull from "./DialogFull";
import AntFormEdit from "./AntFormEdit";

const formData = {
  setting: {
    formItemLayout: {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    },
    layout: "horizontal",
    colnum: 1,
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

const AntFormBuild = () => {
  const [formArray, setFormArray] = useState(formData);
  const [form] = Form.useForm();
  let edit = useSelector((state) => state.global.formEdit);
  //let elData = useSelector(state => state.global.elementData);
  let open = useSelector((state) => state.global.openDialog);
  let list = _.orderBy(formArray.list, ["seq"]);
  //let layout = formArray.setting.layout;
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
    colnum = 2; //st.colnum;
    formItemLayout = layout === "horizontal" ? st.formItemLayout : null;

    onFinish2 = st.onFinish2;
    onFinishFailed2 = st.onFinishFailed2;
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
      _.forEach(list, function (value, key) {
        if (value.type !== "button") {
          if (value.seq <= end_pos && value.seq > start_pos) value.seq--;
          else if (value.seq === start_pos) value.seq = end_pos;
        }
        newArr.push(value);
      });
    if (start_pos > end_pos)
      _.forEach(list, function (value, key) {
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
      .then((r) => console.log(r));
    //st>ed -> st prev +1 st->ed
  };
  const pathname = encodeURIComponent(window.location.pathname);
  useEffect(() => {
    // const result = await axios.get(
    //   `${currentsetting.webserviceprefix}bootform/id?pathname=${pathname}`
    // );
    // setFormArray(result.data[0].data);
    // localStorage.setItem("formData", JSON.stringify(result.data[0]));

    //$(refs.sortable);
    const $node = $(".SortForm>div:first-child");
    $node.sortable({
      opacity: 0.8,
      placeholder: "ui-state-highlight",
      start: function (event, ui) {
        var start_pos = ui.item.index();
        ui.item.data("start_pos", start_pos);
      },
      update: function (event, ui) {
        var start_pos = ui.item.data("start_pos");
        var end_pos = ui.item.index();
        //$('#sortable li').removeClass('highlights');
        ReOrder(start_pos, end_pos);
      },
    });
    return () => {
      $node.sortable({
        placeholder: "ui-state-highlight",
      });
    };
  }, []);
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
      {edit ? <AntFormEdit /> : null}
      <Form
        name="validate_other"
        className="SortForm"
        {...formItemLayout}
        layout={layout}
        form={form}
        onFinish={onFinish2}
        onFinishFailed={onFinishFailed2}
        initialValues={initial}
        size={size}
      >
        {/* <Element col={colnum} layout={layout} formItemLayout={formItemLayout} /> */}
        <Row gutter={24}>
          <Element
            col={colnum}
            layout={layout}
            formItemLayout={formItemLayout}
            editable={true}
          />
        </Row>
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
