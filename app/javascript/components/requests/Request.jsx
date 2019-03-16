import PropTypes from "prop-types";
import React from "react";
import StyledModal from "../helpers/StyledModal";
import TransactionForm from "../receipts/TransactionForm";
import BuyerSnapshot from "../buyers/BuyerSnapshot";
import ArtistSnapshot from "../artists/ArtistSnapshot";
import WorkFixedPanel from "../works/WorkFixedPanel";

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
      }
    };
  }

  closeRequest = (id) => {
    const update_request_route = APIRoutes.requests.update(id);
    Requester.update(update_request_route, { open: false }).then((response) => {
      this.props.onChange();
    });
  }

  blockUser = () => {
    const payload = {
      blocked_id: this.state.request.buyer.id,
      blocker_id: this.props.artist.id
    }
    const block_route = APIRoutes.blocks.block_user;

    Requester.post(
      block_route, payload).then(
        response => {
          console.log("it worked");
        },
        response => {
          console.error(response);
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

  renderRequestButtons() {
    const closed_timestamps = new Date(this.state.request.updated_at).toLocaleDateString();
    if (!this.state.request.open) {
      return (
        <div className = "closed-request-button pa3 w5"> You archived this request on {closed_timestamps} </div>
      );
    }
    let id = this.state.request.id;
    const empty_receipt = this.state.receipt;
    return (
      <div className="request-buttons">
        <div className="w4">
          <button type="button" className="button-secondary b--charcoal w-100" value={id} onClick={() => this.closeRequest(id)}>
            ARCHIVE
          </button>
        </div>
        <div className="w4">
          <button type="button" className="button-secondary b--charcoal w-100" onClick={() => this.blockUser()}>
            BLOCK
          </button>
        </div>
        <div className="ml3 w4">
          <StyledModal
            title="COMPLETE"
            buttonType="button-primary"
          >
            <TransactionForm
              artist={this.props.artist}
              request_id={id}
              receipt={empty_receipt}
              route={APIRoutes.receipts.create}
              method="POST"
              work={this.state.request.work}
            />
          </StyledModal>
        </div>
      </div>
    )
  }

  render() {
    const request = this.state.request;
    const id = request.id;
    const thumbnail_url = request.work.thumbnail ? request.work.thumbnail : "https://cdn0.iconfinder.com/data/icons/typicons-2/24/image-128.png";
    const closed_timestamps = new Date(request.updated_at).toLocaleDateString();

    return (
      <div key={request.id} className="request bg-white mb3">
        <div className="fl w-25">
          <WorkFixedPanel work={request.work} />
        </div>
        <div className="fl w-75 pa3 request-wrapper">
          <div className="request-container w-100">
            {
              this.props.artist ? (
                <div className="request-action">
                  <BuyerSnapshot buyer={this.state.request.buyer} />
                  {this.renderRequestButtons()}
                </div>
              ) : (
                  <div className="request-action">
                    <ArtistSnapshot artist={this.state.request.artist} />
                    <div className="closed-request-button pa4 w5">
                      <p> You requested this work on {closed_timestamps} </p>
                    </div>
                  </div>
                )
            }
            <div className="attr-container pa3 mt2">
              {this.getAttr(request)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Request;
