import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { globalVariable } from "actions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useForm from "../functions/useForm";
import { remotelogin } from "../functions/api";
import logo from "../../images/logo/imc1_1.png";
import imclogo from "../../images/logo/imcmaster.png";
import Icon from "@material-ui/core/Icon";
import axios from "axios";
import { currentsetting } from "components/functions/config";
import { sweetmsg, sweetmsgautoclose } from "fromImc/Common_make";
import Snack from "utilities/Snackbar";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function appendPid(menu) {
  //append pid for
  menu.map((k, i) => {
    if (!k.hasOwnProperty("pid")) {
      k.pid = "";
      menu.slice(i, 1, k);
    }
  });
  return menu;
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    margin: theme.spacing(4, 0, 4),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
}));

const SignIn = (props) => {
  //for snackBar props
  let warning = false;
  const state = props.location.state;
  if (typeof state != "undefined" && state.needsLogin) warning = true;
  const { from } = state || { from: { pathname: "/" } };
  // if(redirectToReferer){
  //   return <Redirect to={from}/>
  // }
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    console.log(values);
  };
  const keyEnter = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${currentsetting.webserviceprefix}login`, values)
      .then(function (response) {
        const dt = response.data;
        console.log(dt);
        const menu = appendPid(JSON.parse(dt.menu));
        dispatch(globalVariable({ token: dt.token }));
        dispatch(globalVariable({ menu: menu }));
        dispatch(globalVariable({ adminmenu: dt.adminmenu }));
        dispatch(globalVariable({ control: dt.control }));
        dispatch(globalVariable({ login: dt.user }));
        axios.defaults.headers.common = { Authorization: `Bearer ${dt.token}` };

        localStorage.setItem("token", dt.token);
        // localStorage.setItem(
        //   "imcsetting",
        //   JSON.stringify({ login: response.data.user })
        // );
        localStorage.setItem("imcsystem", JSON.stringify(response.data.system));
        //localStorage.setItem("imctable", response.data.file);
        //localStorage.setItem("imclist", response.data.list);
        //localStorage.setItem("imcdata", response.data.dtsrc);
        localStorage.setItem("menu", JSON.stringify(menu));
        localStorage.setItem("adminmenu", JSON.stringify(dt.adminmenu));

        sweetmsgautoclose("success", "very bood");
        //props.history.push(`/`);
        props.history.push(`${from.pathname}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const { values, handleChange, handleSubmit, handleSubmitCallback } = useForm(
  //   remotelogin,
  //   props
  // );
  const classes = useStyles();
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Icon>star</Icon>
        <Link to="/" exact>
          <Grid container className={classes.logo} justify="flex-start">
            <Grid item>
              <img
                src={logo}
                className="d-inline-block align-bottom"
                width="60"
              />
            </Grid>
            <Grid item>
              <img src={imclogo} className="d-inline-block align-top" />
            </Grid>
          </Grid>
        </Link>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="username"
              autoComplete="email"
              autoFocus
              onBlur={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onBlur={handleChange}
              onKeyPress={keyEnter}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              //onClick={handleSubmitCallback}
            >
              Sign In
            </Button>

            <Link to="/" exact>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="default"
                className={classes.submit}
              >
                Cancel
              </Button>
            </Link>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/Join" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Snack
              message={"Not authorized!! Please log in."}
              warning={warning}
              severity={"error"}
            />
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};
// export function isLoggedIn() {
//   const token = useSelector(state => state.global.token);
//   return(

//   )
//   if (token != "") return true;
//   else return false;
// }
// export function getToken() {
//   return useSelector(state => state.global.token);
// }
// export function removeToken() {
//   const dispatch = useDispatch();
//   dispatch(globalVariable({ token: "" }));
// }
export default SignIn;
