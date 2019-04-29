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
    const { name, avatar, email } = this.props.buyer;
    return (
      <UserSnapshot
        name={name}
        avatarSrc={avatar.url || ""}
        navigate={this.navigateToBuyer}
        email={email}
        color={this.props.color}
      >
      </UserSnapshot>
    );
  }
}

export default BuyerSnapshot;
