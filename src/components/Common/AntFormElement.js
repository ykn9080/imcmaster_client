import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import _ from "lodash";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import { useConfirm } from "material-ui-confirm";
import { makeStyles } from "@material-ui/core/styles";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Grid from "@material-ui/core/Grid";
import {
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  Radio,
  DatePicker,
  TimePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Cascader,
  Slider,
  Rate,
} from "antd";
const { MonthPicker, RangePicker } = DatePicker;
const { Option } = Select;
// const layout = {
//   labelCol: {
//     span: 8
//   },
//   wrapperCol: {
//     span: 16
//   }
// };
// const tailLayout = {
//   wrapperCol: {
//     offset: 8,
//     span: 16
//   }
// };
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    marginRight: 2,
  },
}));

const AntFormElement = (props) => {
  console.log(props);
  const classes = useStyles();
  const confirm = useConfirm();
  const formItemProps = {
    label: props.label,
    name: props.name,
    ...(props.rules !== "undefined" && { rules: props.rules }),
  };

  const tailLayout = {
    ...(props.type === "button" &&
      props.tailLayout != null &&
      props.layout === "horizontal" && {
        wrapperCol: props.formItemLayout.label,
      }),
  };

  const dispatch = useDispatch();

  let open = useSelector((state) => state.global.openDialog);
  let edit = useSelector((state) => state.global.formEdit);

  const EditDel = (props) => {
    const deleteHandler = (id) => {
      confirm({ description: "This action is permanent!" }).then(() => {
        console.log(id);
      });
    };
    const editHandler = (id) => {
      dispatch(globalVariable({ openDialog: true }));
      dispatch(globalVariable({ elementData: props }));
      open = true;
      console.log(id);
    };

    return (
      edit && (
        <div className="dvEditIcon">
          <EditOutlined
            className={classes.icon}
            onClick={() => editHandler(props.controlId)}
          />
          <DeleteOutlined
            className={classes.icon}
            onClick={() => deleteHandler(props.controlId)}
          />
        </div>
      )
    );
  };

  const formItem = (
    <div className={classes.root}>
      <Form.Item {...formItemProps} {...tailLayout} key={props.seq}>
        {(() => {
          switch (props.type.toLowerCase()) {
            case "input":
              return <Input />;
              break;
            case "input.password":
              return <Input.Password />;
              break;
            case "inputnumber":
              return props.min ? (
                <InputNumber min={props.min} max={props.max} />
              ) : (
                <InputNumber />
              );
              break;
            case "input.textarea":
              return <Input.TextArea />;
              break;

            case "datepicker":
              return <DatePicker format="YYYY-MM-DD" />;
              break;
            case "datetimepicker":
              return <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />;
              break;
            case "monthpicker":
              return <MonthPicker />;
              break;
            case "rangepicker":
              return <RangePicker />;
              break;
            case "rangetimepicker":
              return <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />;
              break;
            case "timepicker":
              return <TimePicker />;
              break;
            case "plaintext":
              return <span className="ant-form-text">{props.text}</span>;
              break;
            case "switch":
              return <Switch />;
              break;
            case "slicer":
              return <Slider marks={props.marks} />;
              break;
            case "rate":
              return <Rate />;
              break;
            case "select":
              return (
                <Select placeholder={props.placeholder}>
                  {props.optionArray.map((k, i) => {
                    return <Option value={k.value}>{k.text}</Option>;
                  })}
                </Select>
              );
              break;
            case "select.multiple":
              return (
                <Select mode="multiple" placeholder={props.placeholder}>
                  {props.optionArray.map((k, i) => {
                    return <Option value={k.value}>{k.text}</Option>;
                  })}
                </Select>
              );
              break;
            case "radio.group":
              return (
                <Radio.Group>
                  {props.radioArray.map((k, i) => {
                    return <Radio value={k.value}>{k.text}</Radio>;
                  })}
                </Radio.Group>
              );
              break;
            case "radio.button":
              return (
                <Radio.Group>
                  {props.radioArray.map((k, i) => {
                    return (
                      <Radio.Button value={k.value}>{k.text}</Radio.Button>
                    );
                  })}
                </Radio.Group>
              );
              break;
            case "checkbox.group":
              const Chk = (props) => {
                return props.checkArray.map((k, i) => {
                  return props.direction === "horizontal" ? (
                    <Checkbox value={k.value}>{k.text}</Checkbox>
                  ) : (
                    <Col span={24}>
                      <Checkbox value={k.value}>{k.text}</Checkbox>
                    </Col>
                  );
                });
              };
              return (
                <Checkbox.Group>
                  {props.direction === "vertical" ? (
                    <Row>
                      <Chk {...props} />
                    </Row>
                  ) : (
                    <Chk {...props} />
                  )}
                </Checkbox.Group>
              );
              break;
            case "button":
              return (
                <div>
                  {_.orderBy(props.btnArr, ["seq"]).map((k, i) => {
                    let btnStyle = "primary",
                      btnLabel = "Submit";
                    if (k.btnStyle !== "undefined") btnStyle = k.btnStyle;
                    if (k.btnLabel !== "undefined") btnLabel = k.btnLabel;

                    let btnProps = {
                      type: btnStyle,
                      htmlType: k.htmlType,
                    };
                    return <Button {...btnProps}>{btnLabel}</Button>;
                  })}
                </div>
              );

              break;
          }
        })()}
      </Form.Item>
    </div>
  );

  let colnum = 24;
  if (props.col > 1) colnum = colnum / props.col;
  return !props.editable ? (
    <Col span={colnum}>{formItem}</Col>
  ) : (
    <Col span={colnum}>
      <Grid container spacing={2}>
        <Grid item xs>
          {formItem}
        </Grid>
        <Grid item xs>
          <EditDel {...props} />
        </Grid>
      </Grid>
    </Col>
  );
};
export default AntFormElement;