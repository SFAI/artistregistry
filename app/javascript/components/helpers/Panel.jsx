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
      <div className="flex flex-column flex-grow-1">
        <div className={"w-100 pv2 ph3 bg-" + this.props.color}>
          <h5 className="white mb0">{this.props.title}</h5>
        </div>
        <div className="flex-grow-1 pa3 bg-white relative">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Panel;
