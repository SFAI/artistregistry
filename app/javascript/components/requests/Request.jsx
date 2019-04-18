import PropTypes from "prop-types";
import React from "react";
import StyledModal from "../helpers/StyledModal";
import TransactionForm from "../receipts/TransactionForm";
import BuyerSnapshot from "../buyers/BuyerSnapshot";
import ArtistSnapshot from "../artists/ArtistSnapshot";
import { convertToCurrency } from "../../utils/currency";
import classNames from 'classnames/bind';
import Touchable from 'rc-touchable';

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: this.props.request,
      artist: this.props.artist,
      receipt: {
        transaction_type: 0,
        start_date: '',
        end_date: '',
        purchase_date: '',
        price: '',
        comment: '',
        request_id: this.props.request.id
      },
      dropDownVisible: false,
      isBlocking: false
    };
  }

  componentDidMount = () => {
    this.isBlocking();
  }

  closeRequest = (id) => {
    const update_request_route = APIRoutes.requests.update(id);
    Requester.update(update_request_route, { open: false }).then((response) => {
      this.props.onChange();
    });
  }

  blockUser = () => {
    const payload = this.props.artist ? 
      {
        blocker_id: this.state.request.artist.account_id,
        blocked_id: this.state.request.buyer.account_id
      } : {
        blocker_id: this.state.request.buyer.account_id,
        blocked_id: this.state.request.artist.account_id
      };
    const block_route = APIRoutes.blocks.block_user;

    Requester.post(
      block_route, payload).then(
        response => {
          window.location.href = '/requests'
        },
        response => {
          console.error(response);
        }
      );
  }

  unblockUser = () => {
    const payload = this.props.artist ? 
      {
        blocker_id: this.state.request.artist.account_id,
        blocked_id: this.state.request.buyer.account_id
      } : {
        blocker_id: this.state.request.buyer.account_id,
        blocked_id: this.state.request.artist.account_id
      };
    const unblock_route = APIRoutes.blocks.unblock_user;

    Requester.post(
      unblock_route, payload).then(
        response => {
          window.location.href = '/requests'
        },
        response => {
          console.error(response);
        }
      );
  }

  isBlocking = () => {
    const blocker = this.props.artist ? 
      this.state.request.artist.account_id : this.state.request.buyer.account_id;
    const blocked = this.props.artist ?
      this.state.request.buyer.account_id : this.state.request.artist.account_id;

    const payload = `blocker_id=${blocker}` +
      `&blocked_id=${blocked}`;

    const isblocking_route = APIRoutes.blocks.is_blocking(payload);

    Requester.get(isblocking_route).then(
      response => {
        this.setState({ isBlocking: response });
      }
    );
  }

  getRequestStatus = (request) => {
    if (request.open) {
      return "Pending";
    } else {
      if (request.receipt) {
        return "Complete";
      }
      return "Closed";
    }
  }

  getAttr = (request) => {
    let attr = {
      "Placed": new Date(request.updated_at).toLocaleDateString(),
      "Request Type": request.types,
      "Message": request.message
    };

    return Object.keys(attr).map((key, i) => {
      return (
        <div className="attr" key={i}>
          <div className="key mr3">
            <h5>{key}</h5>
          </div>
          <div className="value">
            <h6 key={i}>{attr[key]}</h6>
          </div>
        </div>
      );
    });
  }

  deleteRequest = (id) => {
    if (confirm('Are you sure you would like to delete this request?')) {
      const delete_request_route = APIRoutes.requests.delete(id);
      Requester.update(delete_request_route, { deleted: true}).then((response) => {
        this.props.onChange();
      })
    }
  }

  navigateToWork = (id) => {
    window.location = `works/${id}`;
  }

  renderStatus() {
    if (!this.state.request.open) {
      if (this.state.request.receipt) {
        return (
          <p className="green">Completed on {this.state.request.receipt.purchase_date}</p>
        )
      } else {
        return (
          <p className="gray">Closed on {new Date(this.state.request.updated_at).toLocaleDateString()}</p>
        )
      }
    } else {
      return (
        <p className="dark-gray">Pending {this.state.request.types}</p>
      )
    }
  }

  renderDropdown(id) {
    return (
      <div className={classNames("relative", "mh3", {"requests-dropdown-selected" : this.state.dropDownVisible})}>
        <button 
          onClick={() => this.setState({ dropDownVisible: !this.state.dropDownVisible })}
          className="request-ellipsis ml3 self-start br-100 pa0 pointer bn outline-0">
        </button>
        <ul className="request-dropdown ml3 absolute nowrap z-3">
          <li value={id} onClick={() => this.closeRequest(id)}>Archive</li>
          <li>
            <StyledModal
              title="Complete"
              buttonType=""
            >
              <TransactionForm
                artist={this.props.artist}
                request_id={id}
                receipt={this.state.receipt}
                route={APIRoutes.receipts.create}
                method="POST"
                work={this.state.request.work}
              />
            </StyledModal>
          </li>
          <li value={id} onClick={() => this.deleteRequest(id)}>Delete</li>
          { 
            this.state.isBlocking ?
              <li value={id} onClick={this.unblockUser}>Unblock user</li> : 
              <li value={id} onClick={this.blockUser}>Block user</li>
          }
        </ul>
      </div>);
  }

  render() {
    const requesterInfo = this.state.isBlocking ? 
      ( <p className="pa3 i">This message is hidden due to blocked user.</p> ) : (
        this.props.artist ? 
          (<BuyerSnapshot buyer={this.state.request.buyer} color="moss"/>) : 
          (<ArtistSnapshot artist={this.state.request.artist} color="moss"/>)
      );
    const price = this.state.isBlocking ? (<div className="pa3"></div>) :
      (
        <div className="pa3">
          <h5>Price</h5>
          <p>{"$" + convertToCurrency(this.state.request.work.price)}</p>
        </div>
      );

    return (
      <div key={this.state.request.id} className="bg-white mb3">
        <div className="flex justify-between w-100 items-center bb b--light-gray bt-0 bl-0 br-0">
          { requesterInfo }
          <div className="pa3 flex-grow-1">
          </div>
          <div className="pa3 flex-grow-1">
          </div>
          { price }
          <div className="pa3">
            <h5>Date Placed</h5>
            <p>{new Date(this.state.request.created_at).toLocaleDateString()}</p>
          </div>
          {this.renderDropdown(this.state.request.id)}
        </div>

        { !this.state.isBlocking && (
          <div>
            <div className="ttu b mt3 ml3 f6">
              {this.renderStatus()}
            </div>
            <div className="flex justify-between items-start pr5 pa3">
              <Touchable onPress={() => this.navigateToWork(this.state.request.work.id)}>
                <div className="flex pointer">
                  <div className="w4 pb6 relative mr3">
                    <img className="work-image fit-cover w-100 h-100 absolute" src={this.state.request.work.featured_image.url} />
                  </div>
                  <div>
                    <h5>{this.state.request.work.title}</h5>
                    <p>{this.state.request.work.media}</p>
                  </div>
                </div>
              </Touchable>
              <div className="w-60 gray">
                <p>{this.state.request.message}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Request;
