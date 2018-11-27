import PropTypes from "prop-types";
import React from "react";
import UserSnapshot from "../helpers/UserSnapshot";

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
      <UserSnapshot
        name={this.props.buyer.name}
        avatarSrc=""
        navigate={this.navigateToBuyer}
        description={this.props.buyer.email}
      >
      </UserSnapshot>
    );
  }
}

export default BuyerSnapshot;
