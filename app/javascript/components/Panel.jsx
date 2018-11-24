import PropTypes from "prop-types";
import React from "react";
import CommissionsForm from "components/CommissionsForm";

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
