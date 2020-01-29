import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Join from "./components/Join";
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
      </Switch>
    </Router>
  );
};

export default App;
