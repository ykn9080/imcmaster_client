import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { globalVariable } from "actions";
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
import Admin from "Admin";
import Element from "Admin/ElementBuild";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { userContext } from "components/functions/userContext";

let isLoggedIn = false;

const routes = [
  { path: "/", name: "Home", Component: Home, exact: true },
  { path: "/login", name: "Login", Component: Login },
  { path: "/join", name: "Join", Component: Join },
  { path: "/controledit", name: "Control Edit", Component: CtrEdit },
  { path: "/controledit1", name: "Control Edit1", Component: CtrEdit1 },
  { path: "/edit", name: "Edit", Component: Edit },
  { path: "/controls", name: "Controls", Component: Controls },
  { path: "/admin", name: "Administration", Component: Admin, exact: true },
  { path: "/admin/element", name: "Edit", Component: Element },
];

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "Login",
            state: { needsLogin: true, from: props.location },
          }}
        />
      )
    }
  />
);

const App = (props) => {
  const [gvalue, setGvalue] = useState([{ test: "ok", hello: "hi" }]);
  const dispatch = useDispatch();

  useEffect(() => {
    //maintain login status: change in memory or HttpOnly later !!!!!
    const isToken = localStorage.getItem("token"); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if (!isToken) return; // 로그인 정보가 없다면 여기서 멈춥니다.
    dispatch(globalVariable({ token: isToken }));
  }, []);

  const token = useSelector((state) => state.global.token);
  if (token !== "") isLoggedIn = true;
  return (
    <Router>
      <userContext.Provider value={[gvalue, setGvalue]}>
        <Switch>
          {/* <Route path="/" exact component={Home} />
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} title={`Props through render`} />
            )}
          />
          <Route path="/join" component={Join} />
          <Route exact path="/controledit" component={CtrEdit} />
          <Route exact path="/controledit1" component={CtrEdit1} />
          <Route path="/edit" component={Edit} />
          <Route path="/controls" component={Controls} />
          <Route exact path="/admin" component={Admin} />
          <Route path="/admin/element" component={Element} /> */}
          {routes.map(({ exact, path, Component }, key) => (
            <Route exact={exact} path={path} key={key} component={Component} />
          ))}
        </Switch>
      </userContext.Provider>
    </Router>
  );
};

export default App;
