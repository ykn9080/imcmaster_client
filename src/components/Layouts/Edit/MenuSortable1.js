import React, { Component, PropTypes } from "react";
import $ from "jquery";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.min.css";
import "./Head.css";

export default class Sortable extends React.Component {
  // ... omitted for brevity
  // jQuery UI sortable expects a <ul> list with <li>s.
  componentDidMount() {
    this.$node = $(this.refs.sortable);
    this.$node.sortable({
      opacity: this.props.opacity,
      // Get the incoming onChange function
      // and invoke it on the Sortable `change` event
      //change: (event, ui) => this.props.onChange(event, ui),

      start: function(event, ui) {
        var start_pos = ui.item.index();
        ui.item.data("start_pos", start_pos);
      },
      change: function(event, ui) {
        var start_pos = ui.item.data("start_pos");
        var index = ui.placeholder.index();
        if (start_pos < index) {
          $("#sortable li:nth-child(" + index + ")").addClass("highlights");
        } else {
          $("#sortable li:eq(" + (index + 1) + ")").addClass("highlights");
        }
      },
      update: function(event, ui) {
        $("#sortable li").removeClass("highlights");
      }
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
    return this.props.data.map((item, i) => (
      <li key={i} className={["ui-state-default", "dropli"].join(" ")}>
        <span className="ui-icon ui-icon-arrowthick-2-n-s"></span>
        {item}
      </li>
    ));
  }
  render() {
    return (
      <ul className="dropul" ref="sortable">
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
