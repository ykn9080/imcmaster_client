import React, { Component, PropTypes } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "../../../actions";
import { makeStyles } from "@material-ui/core/styles";
import { faHome, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.min.css";
import "./Head.css";

const DropList = props => {
  const dispatch = useDispatch();
  const selectedmenu = id => {
    dispatch(globalVariable({ selectedKey: id }));
    markTab(id);
  };
  return props.topdata.map((item, i) => {
    let delicon = delbtn(item.id);
    let moduleicon = "";
    let subdata = [];
    if (props.data) subdata = props.data;
    const subMenu = subdata
      .filter((subitem, itemIndex) => subitem.pid === item.id)
      .sort(function(a, b) {
        return a.seq < b.seq ? -1 : 1;
      });

    return subMenu.length > 0 ? (
      <li
        key={"droplist" + item.id}
        id={item.id}
        className={[props.liclass, "ui-state-default"].join(" ")}
        onClick={() => selectedmenu(item.id)}
      >
        {item.title}
        <NestedList data={subMenu} />
        {delicon}
      </li>
    ) : (
      <li
        key={"droplist" + item.id}
        id={item.id}
        className={[props.liclass, "ui-state-default"].join(" ")}
        onClick={() => selectedmenu(item.id)}
      >
        {item.title}
        {delicon}
      </li>
    );
  });
};
const markTab = id => {
  $(".dropli").removeClass("selectli");
  $("#" + id).addClass("selectli");
};
const NestedList = props => {
  const dispatch = useDispatch();
  const selectedmenu = id => {
    dispatch(globalVariable({ selectedKey: id }));
    markTab(id);
  };
  const subfilter = id => {
    return props.data
      .filter((item, itemIndex) => id === item.pid)
      .sort(function(a, b) {
        return a.seq < b.seq ? -1 : 1;
      });
  };

  return props.data ? (
    <ul>
      {props.data.map((item, i) => {
        let delicon = delbtn(item.id);
        let subdata = subfilter(item.id);
        return subdata ? (
          <li
            key={"droplist" + item.id}
            id={item.id}
            className={["ui-state-default"].join(" ")}
            onClick={() => selectedmenu(item.id)}
          >
            {item.title}
            <NestedList data={subdata} />){delicon}
          </li>
        ) : (
          <li
            key={"droplist" + item.id}
            id={item.id}
            className={["ui-state-default"].join(" ")}
            onClick={() => selectedmenu(item.id)}
          >
            {item.title}
            {delicon}
          </li>
        );
      })}
    </ul>
  ) : (
    ""
  );
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

    return this.props.topdata.length ? (
      <DropList
        topdata={this.props.topdata}
        data={this.props.data}
        liclass={this.props.liclass}
      />
    ) : (
      <li
        className={["ui-state-default"]}
        //onClick={() => selectedmenu("")}
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
