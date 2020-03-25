import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import Home from "components/Layouts/Home";
import Login from "components/Login/Login";
import Join from "components/Login/Join";
import Controls from "components/Controls";
import CtrEdit from "components/ControlEdit";
import CtrEdit1 from "components/ControlEdit/index1";
import Auth from "utilities/Authenticate";
import Edit from "components/Edit";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { userContext } from "components/functions/userContext";

let isLoggedIn = false;
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "Login",
            state: { needsLogin: true, from: props.location }
          }}
        />
      )
    }
  />
);

const App = props => {
  const [gvalue, setGvalue] = useState([{ test: "ok", hello: "hi" }]);

  const token = useSelector(state => state.global.token);
  if (token !== "") isLoggedIn = true;
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
          <Route path="/login" component={Login} />
          <Route path="/join" component={Join} />
          <Route exact path="/controledit" component={CtrEdit} />
          <Route exact path="/controledit1" component={CtrEdit1} />
          <Route path="/edit" component={Edit} />
          <Route path="/controls" component={Controls} />
        </Switch>
      </userContext.Provider>
    </Router>
  );
};

export default App;
