import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Join from "./components/Join";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/join" component={Join} />
      </Switch>
    </Router>
  );
}

export default App;
