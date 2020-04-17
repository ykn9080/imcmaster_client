import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
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
import AntFormDisplay from "./AntFormDisplay";

const AntFormBuild = (props) => {
  const [formArray, setFormArray] = useState(props.formdt.data);
  const [formdt, setFormdt] = useState(props.formdt);
  const dispatch = useDispatch();
  dispatch(globalVariable({ formEdit: true }));
  const [form] = Form.useForm();
  let open = useSelector((state) => state.global.openDialog);

  const ReOrder = (start_pos, end_pos) => {
    // let arr = localStorage.getItem("formData");
    // arr = JSON.parse(arr);
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
    //localStorage.setItem("formData", JSON.stringify(arr));
    setFormdt(arr);
    setFormArray(arr.data);
    axios
      .put(`${currentsetting.webserviceprefix}bootform/${_id}`, arr)
      .then((r) => console.log(r));
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

  return (
    <>
      <AntFormDisplay {...props} formArray={formArray} />
      <SpeedDialButton />
      <DialogFull open={open}>
        <ElementInput />
      </DialogFull>
      )}
    </>
  );
};

export default AntFormBuild;
