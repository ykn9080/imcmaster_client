import React from "react";
import axios from "axios";
import { currentsetting } from "./config";
import $ from "jquery";
import { sweetmsgautoclose } from "../fromImc/Common_make";

export const remotelogin = (username, password) => {
  axios({
    method: "post",
    url: currentsetting.webserviceprefix + "login",
    data: {
      username: username,
      password: password
    }
  }).then(response => {
    //console.log(response.data.file);
    sweetmsgautoclose(username, password);
    if (response.data.hasOwnProperty("token")) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "imcsetting",
        JSON.stringify({ login: response.data.user })
      );
      localStorage.setItem("imcsystem", JSON.stringify(response.data.system));
      localStorage.setItem("imctable", response.data.file);
      localStorage.setItem("imclist", response.data.list);
      localStorage.setItem("imcdata", response.data.dtsrc);

      //toggleLogin('cancel');
      //pageInit();
    } else {
      console.log(response.data.message);
    }
  });
};

// export function sweetmsgautoclose(title, body, options) {
//   var timer = 2500;
//   if (typeof options != "undefined") {
//     if (options.hasOwnProperty("timer")) timer = options.timer;
//   }
//   if ((typeof body == "undefined") | (body == ""))
//     Swal.fire({
//       title: "",
//       body: title,
//       html: true,
//       timer: timer,
//       showConfirmButton: false
//     });
//   else
//     Swal.fire({
//       title: title,
//       text: body,
//       html: true,
//       timer: timer,
//       showConfirmButton: false
//     });
// }
