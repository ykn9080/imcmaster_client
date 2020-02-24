import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Head from "./Head";
import { CenteredGrid } from "./Body";
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

let data = [
  {
    title: "Top level 1",
    slug: "top-level-1",
    children: [
      {
        title: "Sub level 1",
        slug: "sub-level-1",
        children: [
          {
            title: "Sub Sub Level 1",
            slug: "sub-sub-level-1",
            children: [
              {
                title: "Sub Sub Level 2",
                slug: "sub-sub-level-2",
                children: [
                  {
                    title: "Sub Sub Level 23",
                    slug: "sub-sub-level-23"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        title: "Sub level 2",
        slug: "sub-level-2"
      }
    ]
  },
  {
    title: "Top level 2",
    slug: "top-level 2"
  }
];
let menuData = [];
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const menu = localStorage.getItem("menu");
    if (typeof menu != "undefined")
      menuData = JSON.parse(localStorage.getItem("menu"));
    dispatch(globalVariable({ menu: menuData }));
  }, []);
  return (
    <>
      <Head />
      <CenteredGrid />
    </>
  );
};

export default Home;
