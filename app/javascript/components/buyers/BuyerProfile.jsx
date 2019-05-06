import PropTypes from "prop-types";
import React from "react";
import Button from "../helpers/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEyeSlash,
  faEye,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

/**
 * @prop buyer: buyer associated with profile
 */
class BuyerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyer: [],
      canEditProfile: false,
      componentDidMount: false,
    };
  }

  componentDidMount = () => {
    const { user, userType, buyer } = this.props;
    const buyer_id = this.props.buyer.id;
    const buyer_route = APIRoutes.buyers.show(buyer_id);
    Promise.all([Requester.get(buyer_route)]).then(response => {
      const [buyer_response] = response;
      this.setState({
        buyer: buyer_response,
        canEditProfile: userType === "buyer" && user && user.id === buyer.id,
        componentDidMount: true,
      });
    });
  };

  lockBuyer = () => {
    fetch(APIRoutes.buyers.lock_user(this.props.buyer.id), {
      method: "PUT",
      credentials: "same-origin",
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content,
      },
    })
      .then(data => {
        window.location = `/buyers/` + this.props.buyer.id;
      })
      .catch(data => {
        console.error(data);
      });
  };

  unlockBuyer = () => {
    fetch(APIRoutes.buyers.unlock_user(this.props.buyer.id), {
      method: "PUT",
      credentials: "same-origin",
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content,
      },
    })
      .then(data => {
        window.location = `/buyers/` + this.props.buyer.id;
      })
      .catch(data => {
        console.error(data);
      });
  };

  render() {
    const {
      componentDidMount,
      activeFilter,
      buyer,
      canEditProfile,
    } = this.state;
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
          {userType == "admin" && (
            <Button
              onClick={buyer.locked_at ? this.unlockBuyer : this.lockBuyer}
              type="button-primary"
              color="moss"
              className="w4"
            >
              {buyer.locked_at ? "UNLOCK" : "LOCK"}
            </Button>
          )}
          {this.state.canEditProfile && (
            <Button
              onClick={() => {
                window.location = `/buyers/${this.props.buyer.id}/update`;
              }}
              type="button-primary"
              color="moss"
              className="w4"
            >
              Edit Profile
            </Button>
          )}
        </div>
        <div className="bg-white w-100 flex items-center pa4">
          {buyer.avatar.url ? (
            <img
              className="br-100 h4 w4 mr4 fit-cover"
              src={buyer.avatar.url}
            />
          ) : (
            <FontAwesomeIcon
              icon={faUserCircle}
              size="8x"
              className="gray mr4"
            />
          )}
          <div>
            <div className="flex mb2">
              <p className="w4 b">Name</p>
              <p className="w5">{name}</p>
            </div>
            <div className="flex mb2">
              <p className="w4 b">Email</p>
              <p className="w5">{email}</p>
            </div>
            <div className="flex">
              <p className="w4 b">Phone Number</p>
              <p className="w5">{phone_number}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default BuyerProfile;
