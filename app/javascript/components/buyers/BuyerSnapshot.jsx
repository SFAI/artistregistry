import PropTypes from "prop-types";
import React from "react";
import UserSnapshot from "../helpers/UserSnapshot";

class BuyerSnapshot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, avatar, email } = this.props.buyer;
    return (
      <UserSnapshot
        name={name}
        avatarSrc={avatar.url || ""}
        navigate={`/buyers/${this.props.buyer.id}`}
        email={email}
        color={this.props.color}
      />
    );
  }
}

export default BuyerSnapshot;
