import PropTypes from "prop-types";
import React from "react";
import BuyerSnapshot from "../buyers/BuyerSnapshot";
import ArtistSnapshot from "../artists/ArtistSnapshot";
import StyledModal from "../helpers/StyledModal";
import TransactionForm from "../receipts/TransactionForm";
import { convertToCurrency } from "../../utils/currency";
import classNames from "classnames/bind";

class Receipt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: this.props.request,
      artist: this.props.artist,
    };
  }

  renderEditReceipt() {
    const request = this.state.request;
    const id = request.id;
    return (
      <div className="w100">
        <StyledModal
          title="Edit receipt"
          buttonType=""
          buttonClasses="tl pa0"
          color="moss"
        >
          <TransactionForm
            artist={this.props.artist}
            request_id={id}
            receipt={request.receipt}
            route={APIRoutes.receipts.update(request.receipt.id)}
            method="PATCH"
            work={this.state.request.work}
          />
        </StyledModal>
      </div>
    );
  }

  renderStatus() {
    const { open, receipt, updated_at, types } = this.state.request;
    if (open) {
      return <p className="dark-gray">Pending {types}</p>;
    }
    if (receipt) {
      const purchaseType =
        receipt.transaction_type == "purchase" ? "sale" : "rental";
      return (
        <p className="dark-green">
          Confirmed {purchaseType} on{" "}
          {new Date(receipt.purchase_date).toLocaleDateString()}
        </p>
      );
    } else {
      return (
        <p className="gray">
          Closed on {new Date(updated_at).toLocaleDateString()}
        </p>
      );
    }
  }

  render() {
    const {
      receipt,
      id,
      buyer,
      artist,
      created_at,
      work,
      message,
    } = this.state.request;

    const isRental = receipt.transaction_type == "rental";

    const startDate = isRental
      ? new Date(receipt.start_date).toLocaleDateString()
      : "";
    const endDate = isRental
      ? new Date(receipt.end_date).toLocaleDateString()
      : "";

    return (
      <div key={id} className="bg-white mb3">
        <div className="flex justify-between w-100 items-center bb b--light-gray bt-0 bl-0 br-0">
          {this.props.artist ? (
            <BuyerSnapshot buyer={buyer} color="moss" />
          ) : (
            <ArtistSnapshot artist={artist} color="moss" />
          )}
          <div className="pa3 flex-grow-1">
            <h5>{isRental ? "Rental Start" : ""}</h5>
            <p>{startDate}</p>
          </div>
          <div className="pa3 flex-grow-1">
            <h5>{isRental ? "Rental End" : ""}</h5>
            <p>{endDate}</p>
          </div>
          <div className="pa3">
            <h5 className="mv0">Price</h5>
            <p>{"$" + convertToCurrency(receipt.price)}</p>
          </div>
          <div className="pa3">
            <h5 className="mv0">Date Requested</h5>
            <p>{new Date(created_at).toLocaleDateString()}</p>
          </div>
          <div className="mh3">
            <button className="request-ellipsis ml3 br-100 pa0 pointer bn" />
            <ul className="request-dropdown ml3 absolute nowrap z-3">
              <li>{this.renderEditReceipt()}</li>
            </ul>
          </div>
        </div>

        <div className="ttu b mt3 ml3 f6">{this.renderStatus()}</div>
        <div className="flex justify-between items-start pr5 pa3">
          <a href={`works/${work.id}`} className="color-inherit normal">
            <div className="flex pointer">
              <div className="w4 pb6 relative mr3">
                <img
                  className="work-image fit-cover w-100 h-100 pointer absolute"
                  src={work.featured_image.url}
                />
              </div>
              <div>
                <h5>{work.title}</h5>
                <p className="ttc">{work.media}</p>
              </div>
            </div>
          </a>
          <div className="w-60 gray self-stretch">
            <p className="prewrap">{message}</p>
            {receipt.comment ? (
              <p className="i mt3 prewrap">Receipt notes: {receipt.comment}</p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Receipt;
