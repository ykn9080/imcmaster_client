import React from "react";
import axios from "axios";
import { currentsetting } from "./config";
import $ from "jquery";
import { sweetmsg, sweetmsgautoclose } from "../fromImc/Common_make";

export const remotelogin = (username, password) => {
  console.log(username, password);
  axios({
    method: "post",
    url: currentsetting.webserviceprefix + "login",
    data: {
      username: username,
      password: password
    }
  }).then(response => {
    //console.log(response.data.file);

    if (response.data.hasOwnProperty("token")) {
      // localStorage.setItem("token", response.data.token);
      // localStorage.setItem(
      //   "imcsetting",
      //   JSON.stringify({ login: response.data.user })
      // );
      // localStorage.setItem("imcsystem", JSON.stringify(response.data.system));
      // localStorage.setItem("imctable", response.data.file);
      // localStorage.setItem("imclist", response.data.list);
      // localStorage.setItem("imcdata", response.data.dtsrc);
      //toggleLogin('cancel');
      //pageInit();
      sweetmsgautoclose("success", "very bood");
      console.log(response.data.token);
    } else {
      console.log(response.data.message);
    }
  });
};
