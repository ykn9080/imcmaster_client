import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import _ from "lodash";
import $ from "jquery";
import { makeStyles } from "@material-ui/core/styles";
import "antd/dist/antd.css";
import "./Antd.css";
import { Button } from "antd";
import AntFormElement from "./AntFormElement";
import SpeedDialButton from "./SpeedDial";
import ElementInput from "Admin/ElementInput";
import DialogFull from "./DialogFull";
import AntFormDisplay from "./AntFormDisplay";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import DialogSelect from "components/Common/DialogSelect";
import MuTab from "components/Common/MuTab";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useConfirm } from "material-ui-confirm";

const useStyles = makeStyles((theme) => ({
  root: {
    transform: "translateZ(0px)",
    flexGrow: 1,
  },
  exampleWrapper: {
    position: "relative",
    marginTop: theme.spacing(3),
    height: 380,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(-292),
      right: theme.spacing(50),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));
const AntFormBuild = (props) => {
  const classes = useStyles();
  const confirm = useConfirm();
  let tabPanelArray = [];
  const [formArray, setFormArray] = useState(props.formdt.data);
  const [formdt, setFormdt] = useState(props.formdt);
  const [tabarray, setTabarray] = useState("");
  const dispatch = useDispatch();
  let open = useSelector((state) => state.global.openDialog); //edit
  let open1 = useSelector((state) => state.global.openDialog1); //create new

  const ReOrder = (start_pos, end_pos) => {
    let arr = formdt;
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
    dispatch(globalVariable({ formEdit: true }));
    MakeTabPanel1();
    setTabarray(tabPanelArray);
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

  //이부분은 elementlist로 분가시킬것
  const MakeTabPanel1 = () => {
    const optGrp = [
      ["input", "input.password", "input.textarea", "inputnumber"],
      ["select", "select.multiple", "radio.group", "checkbox.group"],
      [
        "datepicker",
        "datetimepicker",
        "monthpicker",
        "rangepicker",
        "timepicker",
      ],
      ["checkbox", "switch"],
      ["slider", "rate"],
      ["plaintext", "button"],
    ];
    const findSeq = () => {
      let maxseq = 0;
      formArray.list.map((k, i) => {
        if (k.seq >= maxseq) 
        return(maxseq++)
      });
      return maxseq;
    };
    const handleCreateNew = (type) => {
      let eldt = {
        label: "",
        name: "",
        type: type,
        seq: findSeq(),
      };
      dispatch(globalVariable({ elementData: eldt }));
      dispatch(globalVariable({ openDialog1: false }));
      dispatch(globalVariable({ openDialog: true }));
    };
    const MakeTabPanel = (k) => {
      let opt = {};
      if (
        ["select", "select.multiple", "radio.group", "checkbox.group"].indexOf(
          k.title
        ) > -1
      )
        opt = {
          optionArray: [
            { value: "korea", text: "Korea" },
            { value: "usa", text: "USA" },
            { value: "japan", text: "Japan" },
          ],
        };
      return (
        <>
          <Grid item xs={3}>
            <Typography noWrap>{k.title}</Typography>
          </Grid>
          <Grid item xs={6}>
            <AntFormElement type={k.type} {...opt} />
          </Grid>
          <Grid item xs={2}>
            <Button type="primary" onClick={() => handleCreateNew(k.type)}>
              Select
            </Button>
          </Grid>
        </>
      );
    };
    optGrp.map((k, i) => {
      return(
      tabPanelArray.push(
        <Grid container spacing={1}>
          {k.map((j, i) => {
            return <MakeTabPanel title={j} type={j} />;
          })}
        </Grid>
      )
      )
    });
  };
  const tabArray = ["input", "select", "datetime", "toggle", "level", "others"];

  // const optionArray = [
  //   { group: true, label: "input" },
  //   { value: "input" },
  //   { value: "input.password" },
  //   { value: "input.textarea" },
  //   { value: "inputnumber" },
  //   { group: true, label: "select" },
  //   { value: "select" },
  //   { value: "select.multiple" },
  //   { value: "radio.group" },
  //   { value: "radio.button" },
  //   { value: "checxkbox.group" },
  //   { group: true, label: "datetime" },
  //   { value: "datepicker" },
  //   { value: "datetimepicker" },
  //   { value: "monthpicker" },
  //   { value: "rangepicker" },
  //   { value: "rangetimepicker" },
  //   { value: "timepicker" },
  //   { group: true, label: "toggle" },
  //   { value: "checkbox" },
  //   { value: "switch" },
  //   { group: true, label: "level" },
  //   { value: "slider" },
  //   { value: "rate" },
  //   { group: true, label: "others" },
  //   { value: "plaintext" },
  //   { value: "button" },
  // ];
  const actions = [
    {
      icon: <AddBoxIcon />,
      name: "New",
      handleClick: () => {
        console.log("sss");
        dispatch(globalVariable({ openDialog1: true }));
      },
    },
    {
      icon: <ThumbDownIcon />,
      name: "Clear",
      handleClick: () =>
        confirm({ description: "It deletes all!" }).then(() => {
          console.log("sss");
          //dispatch(globalVariable({ openDialog1: true }));
        }),
    },
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
    <div className={classes.root}>
      <AntFormDisplay {...props} formArray={formArray} editable={true} />
      <div className={classes.exampleWrapper}>
        <SpeedDialButton
          className={classes.speedDial}
          actions={actions}
          //onClick={actions[0].handleClick}
        />
      </div>
      <DialogFull open={open} title="Element Edit" fullScreen={true}>
        <ElementInput />
      </DialogFull>
      <DialogSelect open={open1} dialogAction={actbutton}>
        <MuTab tabArray={tabArray} tabPanelArray={tabarray} />
      </DialogSelect>
    </div>
  );
};

export default AntFormBuild;
