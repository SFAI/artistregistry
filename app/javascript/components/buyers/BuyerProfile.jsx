import PropTypes from "prop-types";
import React from "react";

/**
* @prop buyer: buyer associated with profile
*/
class BuyerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyer: this.props.buyer
    }
  }

  render() {
    return (
      <div className="center mw8">
        <div className="buyer-profile-header">
          <h1>{this.state.buyer.name}</h1>
        </div>
        <div className="bg-white w-100 buyer-contents-container pa3">
          <div className="h4 w4 br-100 bg-gray ma4">
            <img src="" />
          </div>
          <button onClick={()=>{window.location = `/buyers/${this.props.buyer.id}/update`}}>Edit Profile</button>
          <div>
            <div className="buyer-contents">
              <div>
                <h5>Name</h5>
                <h5>Email</h5>
                <h5>Phone Number</h5>
              </div>
              <div className="ml4">
                <h5>{this.state.buyer.name}</h5>
                <h5>{this.state.buyer.email}</h5>
                <h5>{this.state.buyer.phone_number}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default BuyerProfile;
