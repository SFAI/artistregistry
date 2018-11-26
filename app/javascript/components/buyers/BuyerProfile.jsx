import PropTypes from "prop-types";
import React from "react";

/**
* @prop buyer: buyer associated with profile
*/
class BuyerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="buyer-profile-page">
        <h1>Buyer Profile!</h1>
      </div>
    );
  }
}
export default BuyerProfile;
