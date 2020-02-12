import React, { Component, PropTypes } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { faHome, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.min.css";
import "./Head.css";

const DropList = props => {
  return props.data.map((item, i) => {
    let delicon = delbtn(item.id);
    let moduleicon = "";
    if (item.hasOwnProperty("module") && item.module != "basic") {
      moduleicon = (
        <i
          className="fa fa-trademark"
          style={{ color: "red", fontSize: 10 }}
          data-toggle="tooltip"
          data-placement="top"
          title="Template menu"
          key={"module" + item.id}
        />
      );
    }
    console.log(props);
    return (
      <li
        key={"droplist" + item.id}
        className={[props.liclass, "ui-state-default"].join(" ")}
        style={{ listStyleType: "none" }}
        onClick={selectedmenu}
      >
        {item.title}
        {delicon}
        {moduleicon}
      </li>
    );
  });
};
const selectedmenu = props => {
  console.log(props);
  return null;
};
const findmaxnum = () => {
  return "test";
};
const delbtn = id => {
  //delete button at topmenu tab
  return (
    <React.Fragment>
      <FontAwesomeIcon
        style={{ float: "right", marginTop: 5, marginRight: 2, marginLeft: 5 }}
        icon={faTimes}
        key={"del" + id}
        onClick={() => console.log("deleled ud: ", id)}
      />
    </React.Fragment>
  );
};
export default class Sortable extends React.Component {
  // ... omitted for brevity
  // jQuery UI sortable expects a <ul> list with <li>s.

  componentDidMount() {
    this.$node = $(this.refs.sortable);
    this.$node.sortable({
      opacity: this.props.opacity,
      // Get the incoming onChange function
      // and invoke it on the Sortable `change` event
      drop: function(event, ui) {
        this.props.onChange(event, ui);
      }
      //change: (event, ui) => this.props.onChange(event, ui)
    });
  }
  shouldComponentUpdate() {
    return false;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.enable !== this.props.enable) {
      this.$node.sortable(nextProps.enable ? "enable" : "disable");
    }
  }
  componentWillUnmount() {
    // Clean up the mess when the component unmounts
    this.$node.sortable("destroy");
  }
  renderItems() {
    // this.props.data.sort(function(a, b) {
    //   return parseFloat(a.odr) - parseFloat(b.odr);
    // });

    return this.props.data.length ? (
      <DropList data={this.props.data} liclass={this.props.liclass} />
    ) : (
      <li
        className={["ui-state-default"]}
        onClick={selectedmenu}
        key={findmaxnum}
      >
        new menu
      </li>
    );
  }
  render() {
    return (
      <ul className={this.props.ulclass} ref="sortable">
        {this.renderItems()}
      </ul>
    );
  }
}

// Optional: set the default props, in case none are passed
Sortable.defaultProps = {
  opacity: 1
};
// // Optional: set the prop types
// Sortable.propTypes = {
//   opacity: React.PropTypes.number,
//   enable: React.PropTypes.bool,
//   onChange: React.PropTypes.func.isRequired
// };
