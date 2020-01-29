import React from "react";
import $ from "jquery";
import {
  imcsetting,
  selectimc,
  jsonReadallMyAjax,
  jsonDataMyAjax,
  datasetRead,
  selectimctable,
  jsoncombine,
  jsonReadMyAjax,
  jsonUpdateMyAjax,
  callbackwithdata,
  checklastupdate,
  readdata,
  datalistreturn,
  datacodereturn,
  datafilterreturn
} from "./Common_data.js";
//import { initDisplay } from "./RedipsScript";
import {
  menuData,
  getcompmodule,
  menuMy,
  menuMainApp,
  menuInit
} from "./Common_menu.js";
import { toggleLogin } from "./fromHtml";
import { useSelector, useDispatch } from "react-redux";
import MultiDispatch from "../reducers/reduxEasy";
import { currentsetting } from "../functions/config";
import Swal from "sweetalert2";
import axios from "axios";

function imctableload(storename, callback, opt) {
  if (typeof storename == "undefined") storename = "imctable";
  var myinfo = mycomp + "," + login.id;
  if (mycomp == "") myinfo = "";
  //  jsonReadMyAjax(storename, myinfo, "", "", "", init);

  var path = "/data/json/";
  path += storename + ".json";
  axios({
    method: "post",
    url: webserviceprefix + "readDataMy",
    data: {
      path: path,
      myinfo: myinfo,
      dataname: "",
      keycode: "",
      keyvalue: ""
    }
  }).then(response => {
    jsoncombine(storename, myinfo, response.data, "imctableload");
    var imc = localStorage.getItem("imctable");
    process(imc);
    if (typeof callback == "function")
      callbackwithdata(callback, response.data, opt);
  });

  // testapi();
  return false;
}
