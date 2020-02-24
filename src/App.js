import React, { useContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "components/Layouts/Home";
import Login from "components/Login/Login";
import Login1 from "components/Login/Login1";
import Join from "components/Login/Join";
import Join1 from "components/Login/Join1";
import Edit from "components/Edit";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { userContext } from "components/functions/userContext";

const App = props => {
  const [gvalue, setGvalue] = useState([{ test: "ok", hello: "hi" }]);
  return (
    <Router>
      <userContext.Provider value={[gvalue, setGvalue]}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/login"
            render={props => (
              <Login {...props} title={`Props through render`} />
            )}
          />
          <Route path="/join" component={Join} />
          <Route path="/login1" component={Login1} />
          <Route path="/join1" component={Join1} />
          <Route path="/edit" component={Edit} />
        </Switch>
      </userContext.Provider>
    </Router>
  );
};

export default App;
