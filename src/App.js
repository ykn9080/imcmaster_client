import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Layouts/Home";
import Login from "./components/Login/Login";
import Login1 from "./components/Login/Login1";
import Join from "./components/Login/Join";
import Join1 from "./components/Login/Join1";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = props => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/login"
          render={props => <Login {...props} title={`Props through render`} />}
        />
        <Route path="/join" component={Join} />
        <Route path="/login1" component={Login1} />
        <Route path="/join1" component={Join1} />
      </Switch>
    </Router>
  );
};

export default App;
