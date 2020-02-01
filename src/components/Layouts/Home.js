import React, { useEffect } from "react";
import Head from "./Head";
import { Example } from "./Head4";
import Recur, { Menu } from "./Head2";
import { CenteredGrid } from "./Body";

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
const Home = () => {
  // useEffect(() => {
  //   //pageInit();
  // }, []);
  return (
    <>
      <Head />
      <CenteredGrid />
    </>
  );
};

export default Home;
