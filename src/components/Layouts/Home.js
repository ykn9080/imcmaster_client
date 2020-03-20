import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Head from "./Head";
import { CenteredGrid } from "./Body";
import Footer from "./Footer";
import { HeadEdit } from "components/Edit/Head3";
import { globalVariable } from "actions";
//  import { pageInit } from "../fromImc/core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngry } from "@fortawesome/free-regular-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faUser,
  faQuestionCircle,
  faArrowCircleDown,
  faArrowCircleRight,
  faAdjust,
  faGlobe,
  faCog
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
const Home = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const menu = localStorage.getItem("menu");
  //   if (typeof menu != "undefined")
  //     menuData = JSON.parse(localStorage.getItem("menu"));
  //   dispatch(globalVariable({ menu: menuData }));
  // }, []);
  return (
    <>
      <Head />
      <CenteredGrid />
      <Footer />
    </>
  );
};

export default Home;
