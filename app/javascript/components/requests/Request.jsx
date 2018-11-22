import PropTypes from "prop-types";
import React from "react";
import StyledModal from "../StyledModal";
import CreateTransaction from "../transactions/CreateTransaction";

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
      "Buyer": request.buyer.name,
      "Artist": request.artist.name,
      "Placed": new Date(request.updated_at).toLocaleDateString(),
      "Request Type": request.types
    };

    if (!request.open && request.receipt) {
      if (request.receipt.transaction_type === "rental") {
        attr["Start Date"] = request.receipt.start_date;
        attr["End Date"] = request.receipt.end_date;
      }
      attr["Price"] = request.receipt.price;
      attr["Purchase Date"] = request.receipt.purchase_date;
    }

    return (
      <div className="attr">
        <div className="key">
          {
            Object.keys(attr).map((obj, i) => {
              return <h5 key={i} className="attr-item">{obj}</h5>
            })
          }
        </div>
        <div className="value">
          {
            Object.keys(attr).map((obj, i) => {
              return <h6 key={i} className="attr-item">{attr[obj]}</h6>
            })
          }
        </div>
      </div>
    );
  }

  render() {
    const request = this.state.request;
    const id = request.id;
    const thumbnail_url = request.work.thumbnail ? request.work.thumbnail : "https://cdn0.iconfinder.com/data/icons/typicons-2/24/image-128.png";
    const closed_timestamps = new Date(request.updated_at).toLocaleDateString();

    return (
      <div key={request.id} className="request pa3 bg-white mb3">
        <div className = "request-header">
          <h5>{"Request #" + request.id + ": " + request.work.title}</h5>
          <h3>{this.getRequestStatus(request)}</h3>
        </div>
        <div className="content-row">
          <div className="request-content mt3">
            <img src={thumbnail_url} className="img"/>
            <div className = "ml4">
              {this.getAttr(request)}
            </div>
          </div>
          <div className="request-buttons w5">
            {
              request.open ? (
                <div className="w-100">
                  <StyledModal title="MARK AS COMPLETE">
                    <CreateTransaction
                      artist={this.props.artist}
                      request_id={id}
                    />
                  </StyledModal>
                  <button type="button" className="button-secondary b--charcoal w-100 mt2" value = {id} onClick = {()=>this.closeRequest(id)}>CLOSE REQUEST</button>
                </div>
              ) : (
                <div className = "closed-request-button pa4 w-100">
                  <p> You reviewed this request on {closed_timestamps} </p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Request;
