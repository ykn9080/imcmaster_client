import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { useLocation, useHistory, Link } from "react-router-dom";
import axios from "axios";
import cloneDeep from "lodash/cloneDeep";
import { currentsetting } from "components/functions/config";
import { Button, Tooltip, message } from "antd";
import { DesktopOutlined, SaveOutlined, CopyOutlined } from "@ant-design/icons";
import PageHead from "components/Common/PageHeader";
import AntFormBuild from "components/Common/AntFormBuild";
import AntFormDisplay from "components/Common/AntFormDisplay";
import "components/Common/Antd.css";
import useForceUpdate from "use-force-update";
import DialogSelect from "components/Common/DialogSelect";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";

const FormEdit = (props) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const forceUpdate = useForceUpdate();
  let iconSpin = {},
    btnDisabled = {};

  //for snackbar open/close
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  //{data:{setting:{formItemLayout:{labelCol:{span:2},wrapperCol:{span:22}},layout:"inline",formColumn:2,size:"middle",onFinish:{values => {console.log(values);};}},list:[]}

  let formdt = useSelector((state) => state.global.currentData);
  let selectedKey = useSelector((state) => state.global.selectedKey);
  //리로드 귀찮아서 해둰거 개발완료시 지울것!!!!!!!!!!!!!!!!!
  // if (formdt === "") {
  //   formdt = JSON.parse(localStorage.getItem("imsi"));
  //   dispatch(globalVariable({ currentData: formdt }));
  // }
  console.log("formdt", formdt);
  let initialValue = {};

  let summaryData = {
    setting: {
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
      },
      layout: "vertical",
      formColumn: 2,
      size: "small",
      initialValues: {
        ...{ initialValue },
      },
      // onFieldsChange: (changedFields, allFields) => {
      //   const cf1 = changedFields[0];
      //   if (["title", "desc"].indexOf(cf1.name[0]) === -1) {
      //     formdt[cf1.name[0]] = cf1.value;
      //     dispatch(globalVariable({ currentData: formdt }));
      //     console.log("field", changedFields, allFields);
      //   }
      // },
      onValuesChange: (changedValues, allValues) => {
        formdt.name = allValues.name;
        formdt.desc = allValues.desc;
        let sett = formdt.data.setting;
        sett.formItemLayout.labelCol.span = allValues.labelwidth;
        sett.formItemLayout.wrapperCol.span = 24 - allValues.labelwidth;
        sett.formColumn = allValues.column;
        sett.layout = allValues.layout;
        sett.size = allValues.size;
        dispatch(globalVariable({ currentData: formdt }));
        if (["name", "desc"].indexOf(Object.keys(changedValues)[0]) === -1)
          forceUpdate();
      },
      onFinish: (values) => {
        console.log("Received values of form: ", values);
      },
      onFinishFailed: (values, errorFields, outOfDate) => {
        console.log(values, errorFields, outOfDate);
      },
    },
    list: [
      { label: "Title", name: "name", type: "input", seq: 0 },
      {
        label: "Desc",
        name: "desc",
        type: "input.textarea",
        seq: 1,
      },
      {
        label: "Column",
        name: "column",
        type: "select",
        defaultValue: 1,
        optionArray: [
          { text: "1", value: 1 },
          { text: "2", value: 2 },
          { text: "3", value: 3 },
        ],
        seq: 2,
      },
      {
        label: "Layout",
        name: "layout",
        type: "radio.button",
        defaultValue: "horizontal",
        optionArray: [
          { text: "horizontal", value: "horizontal" },
          { text: "vertical", value: "vertical" },
          { text: "inline", value: "inline" },
        ],
        seq: 3,
      },
      {
        label: "Label Width",
        name: "labelwidth",
        type: "slider",
        min: 0,
        max: 24,
        defaultValue: 6,
        marks: {
          0: 0,
          2: 2,
          4: 4,
          6: 6,
          8: 8,
          10: 10,
          12: 12,
          14: 14,
          16: 16,
          18: 18,
          20: 20,
          22: 22,
          24: 24,
        },
        seq: 4,
      },
      {
        label: "Size",
        name: "size",
        type: "radio.button",
        defaultValue: "middle",
        optionArray: [
          { text: "small", value: "small" },
          { text: "middle", value: "middle" },
          { text: "large", value: "large" },
        ],
        seq: 5,
      },
    ],
  };
  if (formdt != "") {
    initialValue = {
      name: formdt.name,
      desc: formdt.desc,
      column: formdt.data.setting.formColumn,
      labelwidth: formdt.data.setting.formItemLayout.labelCol.span,
      layout: formdt.data.setting.layout,
      size: formdt.data.setting.size,
    };
    summaryData.setting.initialValues = initialValue;
  }
  const [sumdt, setSumdt] = useState(summaryData);
  useEffect(() => {
    dispatch(globalVariable({ formEdit: true }));

    console.log("usefect running");
  }, []);
  useEffect(() => {
    //temporary use for editing phase only for
    //initialValue setting, pls delete when save
    sumdt.setting = {
      ...sumdt.setting,
      onValuesChange: (changedValues, allValues) => {
        sumdt.setting.initialValues = {
          ...formdt.data.setting.initialValues,
          ...changedValues,
        };
        //dispatch(globalVariable({ currentData: formdt }));
      },
    };
    setSumdt(sumdt);
  }, [formdt]);

  if (typeof formdt._id === "undefined") {
    iconSpin = { spin: true };
    btnDisabled = { disabled: true };
  }

  const extra = [
    <Tooltip title="Save" key="1save">
      <Button
        shape="circle"
        icon={<SaveOutlined {...iconSpin} />}
        onClick={() => {
          console.log(sumdt, sumdt._id);
          // //remove onValuesChange
          //inorderto set initialValues, append onValuesChange eventhandler
          //must remove onValuesChange when to save to database
          delete sumdt.data.setting.onValuesChange;
          let config = {
            method: "put",
            url: `${currentsetting.webserviceprefix}bootform/${sumdt._id}`,
            data: sumdt,
          };
          if (typeof sumdt._id === "undefined")
            config = {
              ...config,
              ...{
                method: "post",
                url: `${currentsetting.webserviceprefix}bootform`,
              },
            };
          axios(config).then((r) => console.log(r));
        }}
      />
    </Tooltip>,
    <Tooltip title="Save As" key="1saveas">
      <Button
        {...btnDisabled}
        shape="circle"
        icon={<CopyOutlined />}
        onClick={() => {
          //remove onValuesChange
          let curr = cloneDeep(sumdt);
          delete curr.data.setting.onValuesChange;
          delete curr._id;

          curr.name += " Copy";
          sumdt.setting.initialValues.name += " Copy";
          curr.data.setting.initialValues = sumdt.setting.initialValues;
          //
          // setSumdt(sumdt);
          setOpen(true);
          dispatch(globalVariable({ currentData: curr }));
        }}
      />
    </Tooltip>,
    <Tooltip title="View" key="2view">
      <Button
        shape="circle"
        icon={<DesktopOutlined />}
        onClick={() => history.push("/admin/control/form/formview")}
      />
    </Tooltip>,
  ];
  const SaveAsCancel = () => {
    sumdt._id = selectedKey;
    sumdt.name = sumdt.name.replace(" Copy", "");
    dispatch(globalVariable({ currentData: sumdt }));
    setOpen(false);
  };
  const actbutton = (
    <Button
      color="primary"
      onClick={() => {
        dispatch(globalVariable({ openDialog: true }));
      }}
    >
      Save As
    </Button>
  );
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const snack = (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={10000}
      onClose={handleClose}
      message="Click save button to finish!!!"
      action={
        <React.Fragment>
          <Button color="secondary" size="small" onClick={SaveAsCancel}>
            Undo
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    >
      {/* <Alert onClose={handleClose} severity="warning">
        Click save button to finish!!!
      </Alert> */}
    </Snackbar>
  );
  console.log("runningggggggggggggggggggggggggggggggggggggggggggggggggggggg");
  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHead title="FormEdit" onBack={true} extra={extra} ghost={false}>
          <AntFormDisplay formArray={sumdt} name={"fsummary"} />
        </PageHead>
      </div>
      <AntFormBuild formdt={formdt} />
      {snack}
    </>
  );
};

export default FormEdit;
