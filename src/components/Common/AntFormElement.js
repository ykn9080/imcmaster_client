import React from "react";
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
  Switch,
  Slider,
  Rate,
} from "antd";
const { MonthPicker, RangePicker } = DatePicker;
const { Option } = Select;

//sample data
// const formData = {
//   setting: {
//     formItemLayout: {
//       labelCol: { span: 8 },
//       wrapperCol: { span: 16 },
//     },
//     layout: "horizontal",
//     //formColumn: 1,
//     size: "middle",
//     initialValues: { name: "hhh" },
//     onFinish2: (values) => {
//       console.log("Received values of form: ", values);
//     },
//     onFinishFailed2: (values, errorFields, outOfDate) => {
//       console.log(values, errorFields, outOfDate);
//     },
//   },
//   list: [
//     { label: "Name", name: "name", type: "input", seq: 1 },
//     {
//       label: "Pass",
//       name: "password",
//       type: "input.password",
//       rules: [{ required: true, message: "enter!!!" }],
//       seq: 2,
//     },

//     //inline form
//     {
//       label: "BirthDate",
//       name: "birthdate",
//       type: "nostyle",
//       seq: 3,
//       array: [
//         {
//           name: "year",
//           placeholder: "Input birth year",
//           type: "input",
//           seq: 0,
//         },
//         {
//           name: "month",
//           placeholder: "Input birth month",
//           type: "input",
//           seq: 1,
//         },
//       ],
//     },
//     {
//       type: "button",
//       seq: 1000,
//       tailLayout: {
//         wrapperCol: { offset: 8, span: 16 },
//       },
//       // //signle button
//       // btnLabel: "Submit",
//       // btnStyle: "secondary",
//       // htmlType: "submit",

//       //in case multiple button
//       btnArr: [
//         {
//           btnLabel: "Submit",
//           btnStyle: "secondary",
//           htmlType: "submit",
//           seq: 0,
//         },
//         {
//           btnLabel: "Cancel",
//           btnStyle: "primary",
//           htmlType: "button",
//           seq: 1,
//         },
//       ],
//     },

//     {
//       label: "Date",
//       name: "date",
//       type: "datepicker",
//       rules: [
//         { type: "object", required: true, message: "Please select time!" },
//       ],
//       seq: 0,
//     },
//   ],
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
  const classes = useStyles();
  const confirm = useConfirm();
  const dispatch = useDispatch();

  let open = useSelector((state) => state.global.openDialog);
  let edit = useSelector((state) => state.global.formEdit);
  let curdt = useSelector((state) => state.global.currentData);

  const EditDel = (props) => {
    const deleteHandler = (seq) => {
      confirm({ description: "This action is permanent!" }).then(() => {
        let delIndex;
        curdt.data.list.map((k, i) => {
          if (k.seq === seq) {
            return(
              curdt.data.list.splice(i, 1),
              delIndex = i
            )
          }
          if (i > delIndex) curdt.data.list.seq--;
        });

        dispatch(globalVariable({ currentData: curdt }));
      });
    };
    const editHandler = (props) => {
      console.log(props);
      dispatch(globalVariable({ openDialog: true }));
      dispatch(globalVariable({ elementData: props }));
      open = true;
    };

    return (
      edit && (
        <div className="dvEditIcon">
          <EditOutlined
            className={classes.icon}
            onClick={() => editHandler(props)}
          />
          <DeleteOutlined
            className={classes.icon}
            onClick={() => deleteHandler(props.seq)}
          />
        </div>
      )
    );
  };

  const FormItem = (props) => {
    const formItemProps = {
      ...(props.name && { name: props.name }),
      ...(props.label && { label: props.label }),
      ...(props.rules && { rules: props.rules }),
      ...(props.nostyle && { noStyle: true }),
      ...(props.style && { style: props.style }),
      ...(props.valuePropName && { valuePropName: "checked" }),
    };

    const tailLayout = {
      ...(props.type === "button" &&
        props.layout === "horizontal" && {
          wrapperCol: { span: 14, offset: props.formItemLayout.labelCol.span },
        }),
    };

    let placeholder = {};
    if (props.placeholder) placeholder = { placeholder: props.placeholder };
    return (
      <Form.Item
        {...formItemProps}
        {...tailLayout}
        key={props.label + props.seq}
      >
        {(() => {
          switch (props.type.toLowerCase()) {
            case "nostyle":
              let wth = Math.floor(100 / props.array.length - 0.5) + "%";
              return props.array.map((k, i) => {
                if (k.width) wth = k.width;
                let sty = {
                  display: "inline-block",
                  width: `calc(${wth} - 8px)`,
                };
                if (i > 0) sty = { ...sty, margin: "0 8px" };
                return (
                  <FormItem {...k} noStyle key={k.name + k.seq} style={sty} />
                );
              });
            case "input":
              return <Input {...placeholder} />;
            case "input.password":
              return <Input.Password {...placeholder} />;
            case "input.textarea":
              return <Input.TextArea {...placeholder} />;
            case "inputnumber":
              return props.min ? (
                <InputNumber min={props.min} max={props.max} {...placeholder} />
              ) : (
                <InputNumber {...placeholder} />
              );
            case "datepicker":
              return (
                //<DatePicker format="YYYY-MM-DD" />
                <DatePicker />
              );
            case "datetimepicker":
              return <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />;
            case "monthpicker":
              return <MonthPicker />;
            case "rangepicker":
              return <RangePicker />;
            case "rangetimepicker":
              return <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />;
            case "timepicker":
              return <TimePicker />;
            case "plaintext":
              return <span className="ant-form-text">{props.text}</span>;
            case "switch":
              return <Switch />;
            case "slider":
              let marks = "",
                min = 0,
                max = 100,
                range = false;
              if (typeof props.min != "undefined") {
                min = props.min;
                max = props.max;
              }
              if (props.marks) marks = props.marks;
              if (props.range) range = props.range;
              return <Slider marks={marks} min={min} max={max} range={range} />;
            case "rate":
              return <Rate />;
            case "checkbox":
              return <Checkbox>{props.checkboxmsg}</Checkbox>;
            case "select":
              if (props.optionArray)
                return (
                  <Select>
                    {props.optionArray.map((k, i) => {
                      return (
                        <Select.Option value={k.value}>{k.text}</Select.Option>
                      );
                    })}
                  </Select>
                );
                break;
            case "select.multiple":
              if (props.optionArray)
                return (
                  <Select mode="multiple" placeholder={props.placeholder}>
                    {props.optionArray.map((k, i) => {
                      return <Option value={k.value}>{k.text}</Option>;
                    })}
                  </Select>
                );
                break;
            case "radio.group":
              if (props.optionArray)
                return (
                  <Radio.Group>
                    {props.optionArray.map((k, i) => {
                      return <Radio value={k.value}>{k.text}</Radio>;
                    })}
                  </Radio.Group>
                );
                break;
            case "radio.button":
              if (props.optionArray)
                return (
                  <Radio.Group>
                    {props.optionArray.map((k, i) => {
                      return (
                        <Radio.Button value={k.value}>{k.text}</Radio.Button>
                      );
                    })}
                  </Radio.Group>
                );
                break;
            case "checkbox.group":
              const Chk = (props) => {
                return props.optionArray.map((k, i) => {
                  return props.direction === "horizontal" ? (
                    <Checkbox value={k.value}>{k.text}</Checkbox>
                  ) : (
                    <Col span={24}>
                      <Checkbox value={k.value}>{k.text}</Checkbox>
                    </Col>
                  );
                });
              };

              if (props.optionArray)
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
              if (props.btnArr)
                return (
                  <>
                    {_.orderBy(props.btnArr, ["seq"]).map((k, i) => {
                      let btnProps = { key: i };
                      if (k.btnStyle)
                        btnProps = { ...btnProps, btnStyle: k.btnStyle };
                      if (k.htmlType)
                        btnProps = { ...btnProps, htmlType: k.htmlType };
                      if (k.onClick)
                        btnProps = { ...btnProps, onClick: k.onClick };
                      return <Button {...btnProps}>{k.btnLabel}</Button>;
                    })}
                  </>
                );
              else {
                let btnProps = {
                  type: props.btnStyle,
                  htmlType: props.htmlType,
                  key: props.btnLabel,
                  onClick: props.onClick,
                };
                return <Button {...btnProps}>{props.btnLabel}</Button>;
              }
          }
        })()}
      </Form.Item>
    );
  };

  let colnum = 24;
  if (props.formColumn === 1) {
    return !props.editable ? (
      <FormItem {...props} />
    ) : (
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={11}>
          <FormItem {...props} />
        </Grid>
        <Grid item xs>
          <EditDel {...props} />
        </Grid>
      </Grid>
    );
  } else if (props.formColumn > 1) colnum = colnum / props.formColumn;
  return !props.editable ? (
    <Col span={colnum}>
      <FormItem {...props} />
    </Col>
  ) : (
    <Col span={colnum}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={11}>
          <FormItem {...props} />
        </Grid>
        <Grid item xs>
          <EditDel {...props} />
        </Grid>
      </Grid>
    </Col>
  );
};
export default AntFormElement;
