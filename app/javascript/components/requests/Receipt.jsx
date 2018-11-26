import PropTypes from "prop-types";
import React from "react";
import BuyerSnapshot from "../buyers/BuyerSnapshot";

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: this.props.request,
      artist: this.props.artist
    };
  }

  getAttr = (request) => {
    let attr = {
    };

    if (request.open) {
      attr["Message"] = request.message;
    } else if (request.receipt) {
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
        <img src={thumbnail_url} className="img"/>
        <div className="w-100 ml4">
          <div className="content-row">
            <div className="request-container">
              <div className="request-action">
                <BuyerSnapshot buyer={this.state.request.buyer} />
                {
                  this.props.artist ? (
                    <div className = "closed-request-button pa3 w5">
                      <p> You reviewed this request on {closed_timestamps} </p>
                    </div>
                  ) : (
                    <div className = "closed-request-button pa3 w5">
                      <p>{request.artist.name} reviewed this request on {closed_timestamps} </p>
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
