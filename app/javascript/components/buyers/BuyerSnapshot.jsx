import PropTypes from "prop-types";
import React from "react";
import Touchable from 'rc-touchable';

class BuyerSnapshot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  navigateToBuyer = () => {
    window.location = `/buyers/${this.props.buyer.id}`;
  }

  render() {
    return (
      <Touchable onPress={() => this.navigateToBuyer()}>
        <div className="w5 bg-white snapshot pa3 pointer">
          <div className="h2 w2 br-100 mr3 bg-gray self-center">
            <img src="" />
          </div>
          <div className="snapshot-content">
            <h5>{this.props.buyer.name}</h5>
            <h6>{this.props.buyer.email}</h6>
          </div>
        </div>
      </Touchable>
    )
  }
}

export default BuyerSnapshot;
