import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import _ from "lodash";
import $ from "jquery";

import "antd/dist/antd.css";
import "./Antd.css";
import { Form, Row, Col } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import AntFormElement from "./AntFormElement";
import SpeedDialButton from "./SpeedDial";
import ElementInput from "Admin/ElementInput";
import DialogFull from "./DialogFull";
import AntFormDisplay from "./AntFormDisplay";
import SaveIcon from "@material-ui/icons/Save";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import DialogSelect from "components/Common/DialogSelect";

const AntFormBuild = (props) => {
  const [formArray, setFormArray] = useState(props.formdt.data);
  const [formdt, setFormdt] = useState(props.formdt);
  const dispatch = useDispatch();
  dispatch(globalVariable({ formEdit: true }));
  const [form] = Form.useForm();
  let open = useSelector((state) => state.global.openDialog);
  let open1 = useSelector((state) => state.global.openDialog1);

  const ReOrder = (start_pos, end_pos) => {
    let arr = formdt;
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
    setFormdt(arr);
    setFormArray(arr.data);
    dispatch(globalVariable({ currentData: arr }));
    //st>ed -> st prev +1 st->ed
  };
  useEffect(() => {
    let $node = $(".SortForm");
    if (formArray.setting.colnum > 1) $node = $(".SortForm>div:first-child");
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

  const optionArray = [
    { group: true, label: "input" },
    { value: "input" },
    { value: "input.password" },
    { value: "input.textarea" },
    { value: "inputnumber" },
    { group: true, label: "select" },
    { value: "select" },
    { value: "select.multiple" },
    { value: "radio.group" },
    { value: "radio.button" },
    { value: "chexkbox.group" },
    { group: true, label: "datetime" },
    { value: "datepicker" },
    { value: "datetimepicker" },
    { value: "monthpicker" },
    { value: "rangepicker" },
    { value: "rangetimepicker" },
    { value: "timepicker" },
    { group: true, label: "toggle" },
    { value: "checkbox" },
    { value: "switch" },
    { group: true, label: "level" },
    { value: "slider" },
    { value: "rate" },
    { group: true, label: "others" },
    { value: "plaintext" },
    { value: "button" },
  ];
  const actions = [
    {
      icon: <AddBoxIcon />,
      name: "New",
      handleClick: () => {
        console.log("sss");
        dispatch(globalVariable({ openDialog1: true }));
      },
    },
    { icon: <SaveIcon />, name: "Save" },
  ];
  const actbutton = (
    <Button
      color="primary"
      onClick={() => {
        dispatch(globalVariable({ openDialog: true }));
      }}
    >
      Create
    </Button>
  );
  return (
    <>
      <AntFormDisplay {...props} formArray={formArray} editable={true} />
      <SpeedDialButton actions={actions} onClick={actions[0].handleClick} />
      <DialogFull open={open} title="Element Edit" fullScreen={true}>
        <ElementInput />
      </DialogFull>
      <DialogSelect
        open={open1}
        optionArray={optionArray}
        dialogAction={actbutton}
      />
    </>
  );
};

export default AntFormBuild;
