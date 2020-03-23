import React, { useContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "components/Layouts/Home";
import Login from "components/Login/Login";
import Login1 from "components/Login/Login1";
import Join from "components/Login/Join";
import Join1 from "components/Login/Join1";
import Controls from "components/Controls";
import Auth from "utilities/Authenticate";
import Edit from "components/Edit";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { userContext } from "components/functions/userContext";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="components/Login/Login1" />
      )
    }
  />
);

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
          <PrivateRoute path="/edit" component={Edit} />
          <PrivateRoute path="/controls" component={Controls} />
        </Switch>
      </userContext.Provider>
    </Router>
  );
};

export default App;
