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
          <div className="h2 w2 mr3 br-100 bg-gray self-center snapshot-nav">
            <img className="br-100" src={this.props.avatarSrc} />
          </div>
        </Touchable>
        <div className="snapshot-content">
          <Touchable onPress={() => this.props.navigate()}>
            <h5 className="snapshot-nav">{this.props.name}</h5>
          </Touchable>
          {this.props.program && <h6 className="ttc">{this.props.program}</h6>}
          {this.props.email && <h6>{this.props.email}</h6>}
        </div>
      </div>
    );
  }
}

export default UserSnapshot;
