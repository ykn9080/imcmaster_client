import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Table
} from "reactstrap";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Jstyle = {
  lb: { paddingTop: "10px", textAlign: "left", width: "60px" },
  join: { width: "60%", float: "right", marginRight: "20px" },
  join1: {
    width: "17%",
    float: "right",
    margin: { top: 0, right: "10px", bottom: 0, left: "20px" }
  },
  join2: { width: "40%", float: "right", marginRight: "22px" },
  join3: { width: "40%", float: "right", marginRight: "5px" }
  // Label join: { borderBottom:{"solid", "1.5px", "#B7B7B7"},textAlign:left,fontWeight:normal}
};
const Join = props => {
  return (
    <div id="dvjoin">
      <h1>Join </h1>
      <Form id="dvjoin1">
        <FormGroup style="display:none">
          <Label for="lbSysid">SysID</Label>
          <Label class="join" id="lbSysid"></Label>
          <Label class="join" id="lbSvcprovider"></Label>
        </FormGroup>
        <FormGroup>
          <Label for="inpComp" lang="en">
            CompCode
          </Label>
          <button
            type="button"
            onclick="checkexist($('#inpComp'));"
            class="join1 btn btn-default btn-primary btn-block"
            lang="en"
          >
            Check
          </button>
          <input
            type="text"
            name="inpComp"
            lang="en"
            class="join3 form-control"
            id="inpComp"
            placeholder="CompCode"
          />
          <img
            src="/images/help-icon.png"
            title="Ask your administrator your company code"
          />
        </FormGroup>
        <FormGroup>
          <Label class="lb"></Label>
          <div
            lang="en"
            onclick="$('#dvcomp').toggle();$('#dvjoin1').toggle();$('#inpComp').prop('disabled', false);"
            class="join linkbtn"
          >
            or register new company
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="text"
            name="email"
            id="exampleEmail"
            placeholder="with a placeholder"
            onBlur={onChangeEmail}
          />
        </FormGroup>
        <FormGroup>
          <Label for="inpId">ID </Label>
          <input
            name="inpId"
            id="inpId"
            onblur="checkexist()"
            placeholder="Email or id"
          />
        </FormGroup>
        <FormGroup>
          <Label for="inpPass">Password</Label>
          <input
            type="password"
            name="inpPass"
            id="inpPass"
            placeholder="Password"
          />
        </FormGroup>
        <FormGroup>
          <Label for="inpPass1">PassAgain</Label>
          <input
            type="password"
            name="inpPass1"
            lang="en"
            class="join form-control"
            id="inpPass1"
            onblur1="samepass()"
            placeholder="Password"
          />
        </FormGroup>
        <FormGroup>
          <Label for="inpName">Name/Nic</Label>
          <input
            type="text"
            name="inpName"
            id="inpName"
            placeholder="Name or nickname"
          />
        </FormGroup>
        <FormGroup>
          <Label for="inpEmail">Email</Label>
          <input
            type="email"
            name="inpEamil"
            id="inpEmail"
            placeholder="Email"
          />
        </FormGroup>
        <div class="join" style="text-align:right;margin-right:20px;">
          <h5>
            Want log in? &nbsp;&nbsp;
            <button
              type="button"
              onclick="tabclick('login')"
              class="btn btn-success btn-xs"
            >
              Log In
            </button>
          </h5>
        </div>
        <FormGroup>
          <button
            type="submit"
            class="btn btn-primary btn-lg btn-block"
            onclick={registration}
            id="btnRegister"
          >
            Register
          </button>
        </FormGroup>
      </Form>
      <Form id="dvcomp" style={{ display: "none", marginTop: "15px" }}>
        <FormGroup>
          <Label for="inpCompname">CompName</Label>
          <span
            style={{ color: "red", fontSize: "large", verticalAlign: "bottom" }}
          >
            *
          </span>
          <input
            class="join form-control"
            name="inpCompname"
            id="inpCompname"
            placeholder="Company Name"
          />
        </FormGroup>
        <FormGroup>
          <Label for="inp">Language</Label>

          <select name="selLanguage" class="join form-control" id="selLanguage">
            <option disabled="disabled">Select language!</option>
            <option value="korean">Korean</option>
            <option value="english">English</option>
          </select>
        </FormGroup>
        <FormGroup>
          <button
            type="button"
            onclick="$('#dvcomp').hide();$('#dvjoin1').show();"
            class="btn btn-default"
            lang="en"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-default"
            onclick="$('#dvcomp').hide();$('#dvjoin1').show();tempsave();"
            lang="en"
          >
            OK
          </button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Join;
