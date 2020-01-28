import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Join from "./components/Join";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { faAngry } from "@fortawesome/free-regular-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faUser,
  faQuestionCircle,
  faArrowCircleDown,
  faArrowCircleRight,
  faAdjust,
  faGlobe
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
  faGlobe
);

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/join" component={Join} />
      </Switch>
    </Router>
  );
}

export default App;
