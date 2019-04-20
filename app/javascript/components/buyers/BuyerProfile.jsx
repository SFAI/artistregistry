import PropTypes from "prop-types";
import React from "react";
import Button from "../helpers/Button"

/**
* @prop buyer: buyer associated with profile
*/
class BuyerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyer: [],
      canEditProfile: false,
      componentDidMount: false
    }
  }

  componentDidMount = () => {
    const { user, userType, buyer } = this.props;
    const buyer_id = this.props.buyer.id;
    const buyer_route = APIRoutes.buyers.show(buyer_id);
    Promise.all([
      Requester.get(buyer_route)
    ]).then(response => {
      const [buyer_response] = response;
      this.setState({
        buyer: buyer_response,
        canEditProfile: userType === "buyer" && user && user.id === buyer.id,
        componentDidMount: true
      });
    });
  }

  lockBuyer = () => {
    fetch(APIRoutes.buyers.lock_user(this.props.buyer.id), {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((data) => {
      window.location = `/buyers/` + this.props.buyer.id;
    }).catch((data) => {
      console.error(data);
    });
  }

  unlockBuyer = () => {
    fetch(APIRoutes.buyers.unlock_user(this.props.buyer.id), {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((data) => {
      window.location = `/buyers/` + this.props.buyer.id;
    }).catch((data) => {
      console.error(data);
    });
  }


  render() {
    const { componentDidMount, activeFilter, buyer, canEditProfile } = this.state;
    const { name, email, phone_number } = buyer;
    const { user, userType } = this.props;
    
    if (!componentDidMount) {
      return (
        <div>
          <p>Loading</p>
        </div>
      );
    }

    return (
      <div className="center mw8">
        <div className="flex justify-between items-center">
          <h1>{name}</h1>
          {userType == "admin" && 
            <Button
              onClick={buyer.locked_at ? this.unlockBuyer : this.lockBuyer}
              type="button-primary"
              color="moss"
              className="w4"
            >
              {buyer.locked_at ? "UNLOCK" : "LOCK"}
            </Button>
          }
          {this.state.canEditProfile &&
            <Button
              onClick={()=>{window.location = `/buyers/${this.props.buyer.id}/update`}}
              type="button-primary"
              color="moss"
              className="w4"
            >
              Edit Profile
            </Button>
          }
        </div>
        <div className="bg-white w-100 flex justify-start items-center pa3">
          <div className="h4 w4 br-100 bg-gray ma4">
            <img className="br-100 avatar-img" src={buyer.avatar.url} />
          </div>
          <div>
            <div className="flex">
              <div>
                <h5>Name</h5>
                <h5>Email</h5>
                <h5>Phone Number</h5>
              </div>
              <div className="ml4">
                <p>{name}</p>
                <p>{email}</p>
                <p>{phone_number}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default BuyerProfile;
