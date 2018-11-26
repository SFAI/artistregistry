import PropTypes from "prop-types";
import React from "react";

/**
 * @prop color: must be color defined in _colors.scss. This is the header bar color
 * @prop title: title displayed in header bar
 * @prop children: content displayed in body
 */
class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="panel">
        <div className={"header-bar pl3 pr3 pt2 pb2 bg-" + this.props.color}>
          <h5 className="white">{this.props.title}</h5>
        </div>
        <div className="panel-container pa3 bg-white">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Panel;
