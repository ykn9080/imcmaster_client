import React, { Component, PropTypes } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { globalVariable } from "../../../actions";
import { makeStyles } from "@material-ui/core/styles";
import { faHome, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.min.css";
import "./Head.css";

const DropList = props => {
  let menuData = useSelector(state => state.global.menu);
  const dispatch = useDispatch();
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
    const selectedmenu = (item, i) => {
      $('[id^="droplist"]').removeClass("selectli");
      $("#droplist" + item.id).addClass("selectli");
      makeChildren(menuData, item.id);
      console.log("hi", menuChildern);
      dispatch(globalVariable({ selectedMenu: item, selectedKey: item.id }));
    };
    let menuChildern = [];
    const makeChildren = (menu, pid) => {
      {
        /* change data format like below
        let data = [
            {
            title: "Top level 1",
            slug: "top-level-1",
            children: [
                {
                title: "Sub level 1",
                slug: "sub-level-1",
                children: []
                }
            ]
        }
        ] 
    */
      }
      const siblingList = _.filter(menu, { pid: pid }).sort(function(a, b) {
        return a.seq < b.seq ? -1 : 1;
      });
      const childList = id => {
        return _.filter(menu, { pid: id });
      };
      console.log(siblingList);
      if (siblingList.length > 0) {
        siblingList.map((dt, i) => {
          console.log("child exist?", i, dt, childList(dt.id));

          if (childList(dt.id)) dt.children = makeChildren(menu, dt.id);
          menuChildern.push(dt);
        });
      }
    };
    return (
      <li
        key={"droplist" + item.id}
        id={"droplist" + item.id}
        className={[props.liclass, "ui-state-default"].join(" ")}
        style={{ listStyleType: "none" }}
        onClick={() => selectedmenu(item, i)}
      >
        {item.title}
        {delicon}
        {moduleicon}
      </li>
    );
  });
};

const Topmenu = () => {
  const dispatch = useDispatch();
  function handleSelect(selectedKey) {
    const ctrlist = myData.filter((item, itemIndex) => item.id === selectedKey);
    dispatch(globalVariable({ controls: ctrlist.layout }));
  }
  //const menulist = JSON.parse(localStorage.getItem("imctable")).menu;

  useEffect(() => {
    //login후 /function/api.js의 remotelogin callback에서 dispatch를 못해서
    //일단 localStorage에 저장한후 메뉴로 historyback할때 globalVariable로 dispatch시킴
    let menu = myData;
    if (localStorage.getItem("menu"))
      menu = JSON.parse(localStorage.getItem("menu"));
    // else{
    //   //openmenu를 fetch해서 가져옴
    // }
    dispatch(globalVariable({ menu: menu }));
  }, []);
  let menuData = useSelector(state => state.global.menu);

  if (!menuData) menuData = myData;
  //const topmenu = menulist(menuData, "");
  const topmenu = menuData
    .filter((item, itemIndex) => item.comp === "1" && item.pid === "")
    .sort(function(a, b) {
      return a.seq < b.seq ? -1 : 1;
    });
  console.log(menuData, topmenu);
  return topmenu.map((dt, i) => {
    //const ddList = menulist(dt, dt.id);
    const ddList = menuData
      .filter((item, itemIndex) => item.pid === dt.id)
      .sort(function(a, b) {
        return a.seq < b.seq ? -1 : 1;
      });
    return ddList.length === 0 ? (
      <li key={dt.title + i}>{dt.title}</li>
    ) : (
      <NavDropRecur
        myData={menuData}
        dt={ddList}
        title={dt.title}
        id={dt.id}
        key={dt.id}
      />
    );
  });
};
const NavDropRecur = props => {
  {
    /*make menu recursive, */
  }
  const subfilter = id => {
    return props.myData
      .filter((item, itemIndex) => id === item.pid)
      .sort(function(a, b) {
        return a.seq < b.seq ? -1 : 1;
      });
  };

  return (
    <ul title={props.title} id={props.id}>
      {props.dt.map((dtt, index) => {
        //let subdata = menulist(props.myData, dtt.id);
        let subdata = subfilter(dtt.id);
        console.log(subdata);
        return subdata.length === 0 ? (
          <li eventKey={dtt.id} key={dtt.id + index}>
            {dtt.title}
          </li>
        ) : (
          <NavDropRecur
            dt={subdata}
            myData={props.myData}
            title={dtt.title}
            id={dtt.id}
            key={dtt.id}
          />
        );
      })}
    </ul>
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
  selectedmenu = (item, i) => {
    $('[id^="droplist"]').removeClass("selectli");
    $("#droplist" + item.id).addClass("selectli");
    //let menuData = useSelector(state => state.global.menu);
    //
  };
  renderItems() {
    // this.props.data.sort(function(a, b) {
    //   return parseFloat(a.odr) - parseFloat(b.odr);
    // });

    return this.props.data.length ? (
      <DropList data={this.props.data} liclass={this.props.liclass} />
    ) : (
      <li
        className={["ui-state-default"]}
        onClick={this.selectedmenu}
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
