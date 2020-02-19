import React, { Component, PropTypes, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "../../../actions";
import { makeStyles } from "@material-ui/core/styles";
import { faHome, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";
import _ from "lodash";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.min.css";
import "./Head.css";
import { directChild, findChild } from "../../functions/findChildrens";
import IconButton from "@material-ui/core/IconButton";
import AddBox from "@material-ui/icons/AddCircle";
import useForceUpdate from "use-force-update";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginLeft: theme.spacing(1)
  }
}));
export const Sortable = props => {
  let tempMenu = useSelector(state => state.global.tempMenu);
  const keyval = useSelector(state => state.global.selectedKey);
  const dispatch = useDispatch();
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    //$(refs.sortable);
    const $node = $("#ulSortable");

    $node.sortable({
      opacity: props.opacity,
      // Get the incoming onChange function
      // and invoke it on the Sortable `change` event
      drop: function(event, ui) {
        props.onChange(event, ui);
      },
      change: (event, ui) => props.onChange(event, ui)
    });
    return () => {
      $node.sortable();
    };
  }, []);

  //let subMenu = useSelector(state => state.global.subMenu);

  const classes = useStyles();
  let menuList = directChild(tempMenu, props.pid, "seq");
  // if (props.depth === "all") menuList = findChild(tempMenu, props.pid, "seq");
  const addTopMenu = () => {
    let obj = _.maxBy(menuList, "seq");
    let newobj = {
      id: "imsi" + Math.random().toString(),
      comp: "1",
      creator: "ykn",
      desc: "",
      pid: "",
      private: false,
      seq: obj.seq + 1,
      title: "New Menu",
      layout: []
    };
    tempMenu.push(newobj);
    dispatch(globalVariable({ tempMenu: tempMenu }));
    forceUpdate();
  };
  return (
    <ul className={props.ulclass} id="ulSortable">
      {menuList ? (
        <>
          <DropList
            menuList={menuList}
            tempMenu={tempMenu}
            depth={props.depth}
            liclass={props.liclass}
            selectedmenu={props.selectedmenu}
          />
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={addTopMenu}
          >
            <AddBox />
          </IconButton>
        </>
      ) : (
        <li
          className={["ui-state-default"]}
          onClick={() => props.selectedmenu("")}
          key={findmaxnum}
        >
          new menu
        </li>
      )}
    </ul>
  );
};

// const findMenu = (data, pid, seq) => {
//   return data
//     .filter((subitem, itemIndex) => subitem.pid === pid)
//     .sort(function(a, b) {
//       return a[seq] < b[seq] ? -1 : 1;
//     });
// };
const DropList = props => {
  return props.menuList.map((item, i) => {
    let delicon = delbtn(item.id);
    let moduleicon = "";
    let subdata = [];
    // const subMenu = subdata
    //   .filter((subitem, itemIndex) => subitem.pid === item.id)
    //   .sort(function(a, b) {
    //     return a.seq < b.seq ? -1 : 1;
    //   });
    const subMenu = directChild(props.tempMenu, item.id, "seq");

    const li = (
      <li
        key={"droplist" + item.id}
        id={item.id}
        className={[props.liclass, "ui-state-default"].join(" ")}
        onClick={() => props.selectedmenu(item.id)}
      >
        {item.title}
        {delicon}
      </li>
    );
    return subMenu.length > 0 && props.depth === "all" ? (
      <li
        key={"droplist" + item.id}
        id={item.id}
        className={[props.liclass, "ui-state-default"].join(" ")}
        onClick={() => props.selectedmenu(item.id)}
      >
        {item.title}
        <NestedList data={subMenu} tempMenu={props.tempMenu} />
        {delicon}
      </li>
    ) : (
      li
    );
  });
};

const markTab = id => {
  $(".dropli").removeClass("selectli");
  $("#" + id).addClass("selectli");
};
const NestedList = props => {
  // const dispatch = useDispatch();
  // const selectedmenu = id => {
  //   dispatch(globalVariable({ selectedKey: id }));
  //   markTab(id);
  // };

  return props.data ? (
    <ul>
      {props.data.map((item, i) => {
        let delicon = delbtn(item.id);
        let subdata = directChild(props.tempMenu, item.id, "seq");
        return subdata ? (
          <li
            key={"droplist" + item.id}
            id={item.id}
            className={["ui-state-default"].join(" ")}
            onClick={() => props.selectedmenu(item.id)}
          >
            {item.title}
            <NestedList data={subdata} tempMenu={props.tempMenu} />
            {delicon}
          </li>
        ) : (
          <li
            key={"droplist" + item.id}
            id={item.id}
            className={["ui-state-default"].join(" ")}
            onClick={() => props.selectedmenu(item.id)}
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

export class Sortable1 extends React.Component {
  // ... omitted for brevity
  // jQuery UI sortable expects a <ul> list with <li>s.
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.$node = $(this.refs.sortable);
    this.$node.sortable({
      opacity: this.props.opacity,
      // Get the incoming onChange function
      // and invoke it on the Sortable `change` event
      drop: function(event, ui) {
        this.props.onChange(event, ui);
      },
      change: (event, ui) => this.props.onChange(event, ui)
    });
    console.log(this.props.topdata);
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
        selectedmenu={this.props.selectedmenu}
      />
    ) : (
      <li
        className={["ui-state-default"]}
        onClick={() => this.props.selectedmenu("")}
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
