import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import Head from "./Head";
import { CenteredGrid } from "./Body";
import Footer from "./Footer";
import { HeadEdit } from "components/Edit/Head3";
import { globalVariable } from "actions";
//  import { pageInit } from "../fromImc/core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngry } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { currentsetting } from "components/functions/config";
import {
  faCheckSquare,
  faCoffee,
  faUser,
  faQuestionCircle,
  faArrowCircleDown,
  faArrowCircleRight,
  faAdjust,
  faGlobe,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faCheckSquare,
  faCoffee,
  faUser,
  faQuestionCircle,
  faArrowCircleDown,
  faArrowCircleRight,
  faAdjust,
  faAngry,
  faGlobe,
  faCog
);

let menuData = [];

//1. chk redux menu
//2. if not redux openmenu
//3. if not fetch openmenu->dispatch openmenu,
const Home = () => {
  const dispatch = useDispatch();

  let addedmenu = [];
  const addPath1 = (menu, pid, pathname) => {
    _.filter(menu, function (o) {
      return o.pid === pid;
    }).map((k, i) => {
      k.path = pathname + "/" + k.title;
      addedmenu.push(k);
      addPath1(menu, k._id, k.path);
    });
  };
  useEffect(() => {
    axios
      .get(currentsetting.webserviceprefix + "menu/any?type=user")
      .then((response) => {
        // localStorage.setItem("openmenu", JSON.stringify(response.data));
        _.forEach(response.data, function (value, key) {
          if (typeof value.pid === "undefined") value.pid = "";
        });
        addPath1(response.data, "", "");

        console.log(addedmenu);
        //dispatch(globalVariable({ menu: response.data }));
        dispatch(globalVariable({ menu: addedmenu }));
      });

    // const menu = localStorage.getItem("menu");
    // if (typeof menu != "undefined")
    //   menuData = JSON.parse(localStorage.getItem("menu"));
    // dispatch(globalVariable({ menu: menuData }));
  }, []);
  return (
    <>
      <Head />
      <CenteredGrid />
      <Footer />
    </>
  );
};

export default Home;
