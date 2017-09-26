import React from "react";
import { Link } from "react-router";

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  getClassName: function() {
    let isActive = this.context.router.isActive(this.props.to, true);
    let active = isActive ? "active" : "";
    return ["table-link", active].join(" ");
  },

  render() {
    return <Link {...this.props} className={this.getClassName()} />;
  }
});
