import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { currentsetting } from "./config";
import $ from "jquery";
import { sweetmsg, sweetmsgautoclose } from "fromImc/Common_make";
import { trackPromise } from "react-promise-tracker";
import { globalVariable } from "actions";

const axiosData = async (method, url, data) => {
  const result = await axios({
    method: method,
    url: currentsetting.webserviceprefix + url,
    data: data,
  });
  return result;
};

export default axiosData;
