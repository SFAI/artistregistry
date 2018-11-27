import PropTypes from "prop-types";
import React from "react";
import Touchable from 'rc-touchable';

class UserSnapshot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="w5 bg-white snapshot pa3">
        <Touchable onPress={() => this.props.navigate()}>
          <div className="h2 w2 br-100 mr3 bg-gray self-center snapshot-nav">
            <img src={this.props.avatarSrc} />
          </div>
        </Touchable>
        <div className="snapshot-content">
          <Touchable onPress={() => this.props.navigate()}>
            <h5 className="snapshot-nav">{this.props.name}</h5>
          </Touchable>
          <h6>{this.props.description}</h6>
        </div>
      </div>
    );
  }
}

export default UserSnapshot;
