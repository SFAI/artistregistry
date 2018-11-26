import PropTypes from "prop-types";
import React from "react";
import StyledModal from "../helpers/StyledModal";
import CreateTransaction from "../transactions/CreateTransaction";
import BuyerSnapshot from "../buyers/BuyerSnapshot";

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: this.props.request,
      artist: this.props.artist
    };
  }

  closeRequest = (id) => {
    const update_request_route = APIRoutes.requests.update(id);
    Requester.update(update_request_route, {open: false}).then((response) => {
      this.props.onChange();
    });
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
        <div className="closed-request-button pa3 w5">
          <p> You archived this request on {closed_timestamps} </p>
        </div>
      );
    }
    let id = this.state.request.id;
    return (
      <div className="request-buttons">
        <div className="w4">
          <button type="button" className="button-secondary b--charcoal w-100" value = {id} onClick = {()=>this.closeRequest(id)}>
            ARCHIVE
          </button>
        </div>
        <div className="ml3 w4">
          <StyledModal
            title="COMPLETE"
            color="ochre"
          >
            <CreateTransaction
              artist={this.props.artist}
              request_id={id}
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
      <div key={request.id} className="request pa3 bg-white mb3">
        <img src={thumbnail_url} className="img"/>
        <div className="w-100 ml4">
          <div className="content-row">
            <div className="request-container">
              <div className="request-action">
                <BuyerSnapshot buyer={this.state.request.buyer} />
                {
                  this.props.artist ? 
                    this.renderRequestButtons()
                   : (
                    <div className = "closed-request-button pa4 w5">
                      <p> You requested this work on {closed_timestamps} </p>
                    </div>
                  )
                }
              </div>
              <div className="attr-container pa3 mt2">
                {this.getAttr(request)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Request;
