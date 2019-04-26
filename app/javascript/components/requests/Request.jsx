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
        comment: '',
        request_id: this.props.request.id
      }
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
    const { artist, buyer } = this.state.request;
    const payload = this.props.artist
      ? {
          blocker_id: artist.account_id,
          blocked_id: buyer.account_id
        }
      : {
          blocker_id: buyer.account_id,
          blocked_id: artist.account_id
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
    const { artist, buyer } = this.state.request;
    const payload = this.props.artist
      ? {
          blocker_id: artist.account_id,
          blocked_id: buyer.account_id
        }
      : {
          blocker_id: buyer.account_id,
          blocked_id: artist.account_id
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
    const { artist, buyer } = this.state.request;
    const blocker = this.props.artist ? artist.account_id : buyer.account_id;
    const blocked = this.props.artist ? buyer.account_id : artist.account_id;

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
    const { open, receipt, updated_at, types } = this.state.request;
    if (!open) {
      if (receipt) {
        return (
          <p className="green">Completed on {receipt.purchase_date}</p>
        )
      } else {
        return (
          <p className="gray">Closed on {new Date(updated_at).toLocaleDateString()}</p>
        )
      }
    } else {
      return (
        <p className="dark-gray">Pending {types}</p>
      )
    }
  }

  renderDropdown(id) {
    const { receipt, request, isBlocking } = this.state;
    return (
      <div className="mh3">
        <button className="request-ellipsis ml3 br-100 pa0 pointer bn outline-0"/>
        <ul className="request-dropdown ml3 absolute nowrap z-3">
          {this.props.artist &&
            <li onClick={() => this.closeRequest(id)}>Archive</li>
          }
          {this.props.artist &&
            <li>
              <StyledModal
                title="Complete"
                buttonType=""
              >
                <TransactionForm
                  artist={this.props.artist}
                  request_id={id}
                  receipt={receipt}
                  route={APIRoutes.receipts.create}
                  method="POST"
                  work={request.work}
                />
              </StyledModal>
            </li>
          }
          <li onClick={() => this.deleteRequest(id)}>Delete</li>
          <li
            onClick={isBlocking ? this.unblockUser : this.blockUser}>
            {isBlocking ? "Unblock user" : "Block user"}
          </li>
        </ul>
      </div>);
  }

  render() {
    const { request, isBlocking } = this.state;
    const { buyer, artist, work, id, created_at, message } = request;
    const requesterInfo = isBlocking ? 
      ( <p className="pa3 i">This message is hidden due to blocked user.</p> ) : (
        this.props.artist ? 
          (<BuyerSnapshot buyer={buyer} color="moss"/>) : 
          (<ArtistSnapshot artist={artist} color="moss"/>)
      );

    return (
      <div key={id} className="bg-white mb3">
        <div className="flex justify-between w-100 items-center bb b--light-gray bt-0 bl-0 br-0">
          { requesterInfo }
          <div className="ml-auto flex items-center">
            <div className="pa3">
              <h5>Date Requested</h5>
              <p>{new Date(created_at).toLocaleDateString()}</p>
            </div>
            {this.renderDropdown(id)}
          </div>
        </div>

        { !isBlocking && (
          <div>
            <div className="ttu b mt3 ml3 f6">
              {this.renderStatus()}
            </div>
            <div className="flex justify-between items-start pr5 pa3">
              <Touchable onPress={() => this.navigateToWork(work.id)}>
                <div className="flex pointer">
                  <div className="w4 pb6 relative mr3">
                    <img className="work-image fit-cover w-100 h-100 absolute" src={work.featured_image.url} />
                  </div>
                  <div>
                    <h5>{work.title}</h5>
                    <p>{work.media}</p>
                  </div>
                </div>
              </Touchable>
              <div className="w-60 gray">
                <p>{message}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Request;
