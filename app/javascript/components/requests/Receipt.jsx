import PropTypes from "prop-types";
import React from "react";
import BuyerSnapshot from "../buyers/BuyerSnapshot";
import ArtistSnapshot from "../artists/ArtistSnapshot";
import StyledModal from "../helpers/StyledModal";
import TransactionForm from "../transactions/TransactionForm";
import { convertToCurrency } from "../../utils/currency";

class Receipt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: this.props.request,
      artist: this.props.artist
    };
  }

  getAttr = (request) => {
    let attr = {
      "Price": "$" + convertToCurrency(request.receipt.price),
      "Purchase Date": new Date(request.receipt.purchase_date).toLocaleDateString(),
      "Transaction Type": request.receipt.transaction_type,
      "Description": request.receipt.comment
    };

    if (request.receipt.transaction_type === "rental") {
      attr["Start Date"] = new Date(request.receipt.start_date).toLocaleDateString();
      attr["End Date"] = new Date(request.receipt.end_date).toLocaleDateString();
    }

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

  renderEditReceipt() {
    const request = this.state.request;
    const id = request.id;
    return (
        <div className = "w100">
          <StyledModal title="EDIT RECEIPT" color="ochre">
            <TransactionForm
              artist={this.props.artist}
              request_id={id}
              receipt={request.receipt}
              route={APIRoutes.receipts.update(request.receipt.id)}
              method="PATCH"
            />
          </StyledModal>
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
              {
                this.props.artist ? (
                  <div className="request-action">
                    <BuyerSnapshot buyer={this.state.request.buyer} />
                    <div className = "w5">
                      <p className = "closed-request-button pa3"> You completed this request on {closed_timestamps} </p>
                      {this.renderEditReceipt()}
                    </div>
                  </div>
                ) : (
                  <div className="request-action">
                    <ArtistSnapshot artist={this.state.request.artist} />
                    <div className = "closed-request-button pa3 w5">
                      <p>{request.artist.name} completed this request on {closed_timestamps} </p>
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
      </div>
    );
  }
}

export default Receipt;
