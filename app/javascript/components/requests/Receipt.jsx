import PropTypes from "prop-types";
import React from "react";
import BuyerSnapshot from "../buyers/BuyerSnapshot";
import ArtistSnapshot from "../artists/ArtistSnapshot";
import StyledModal from "../helpers/StyledModal";
import TransactionForm from "../receipts/TransactionForm";
import { convertToCurrency } from "../../utils/currency";
import classNames from 'classnames/bind';
import Touchable from 'rc-touchable';

class Receipt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: this.props.request,
      artist: this.props.artist
    };
  }

  renderEditReceipt() {
    const request = this.state.request;
    const id = request.id;
    return (
        <div className = "w100">
          <StyledModal
            title="Edit receipt"
            buttonType=""
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
      )
  }

  renderStatus() {
    if (!this.state.request.open) {
      if (this.state.request.receipt) {
        const purchaseType = this.state.request.receipt.transaction_type == "purchase" ?
          "sale" : "rental";
        return (
          <p className="green">
            Confirmed {purchaseType} on {new Date(this.state.request.receipt.purchase_date).toLocaleDateString()}
          </p>
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

  render() {
    const isRental = this.state.request.receipt.transaction_type == "rental";

    const startDate = isRental ? 
      new Date(this.state.request.receipt.start_date).toLocaleDateString() : "";
    const endDate = isRental ? 
      new Date(this.state.request.receipt.end_date).toLocaleDateString() : "";

    return (
      <div key={this.state.request.id} className="bg-white mb3">
        <div className="flex justify-between w-100 items-center bb b--light-gray bt-0 bl-0 br-0">
          { this.props.artist ? 
            (<BuyerSnapshot buyer={this.state.request.buyer} />) : 
            (<ArtistSnapshot artist={this.state.request.artist} />)
          }
          <div className="pa3 flex-grow-1">
            <h5>{isRental ? "Rental Start" : ""}</h5>
            <p>{startDate}</p>
          </div>
          <div className="pa3 flex-grow-1">
            <h5>{isRental ? "Rental End" : ""}</h5>
            <p>{endDate}</p>
          </div>
          <div className="pa3">
            <h5>Price</h5>
            <p>{"$" + convertToCurrency(this.state.request.receipt.price)}</p>
          </div>
          <div className="pa3">
            <h5>Date Placed</h5>
            <p>{new Date(this.state.request.created_at).toLocaleDateString()}</p>
          </div>
          <div className={classNames("relative", "mh3", {"requests-dropdown-selected" : this.state.dropDownVisible})}>
            <button 
              onClick={() => this.setState({ dropDownVisible: !this.state.dropDownVisible })}
              className="request-ellipsis ml3 self-start br-100 pa0 pointer bn outline-0">
            </button>
            <ul className="request-dropdown ml3 absolute nowrap z-3">
              <li>{this.renderEditReceipt()}</li>
              <li>Block user</li>
            </ul>
          </div>
        </div>

        <div className="ttu b mt3 ml3 f6">
          { this.renderStatus() }
        </div>
        <div className="flex justify-between items-start pr5 pa3">
          <Touchable onPress={() => this.navigateToWork(this.state.request.work.id)}>
            <div className="flex pointer">
                <div className="w4 pb6 relative mr3">
                  <img className="work-image fit-cover w-100 h-100 pointer absolute" src={this.state.request.work.featured_image.url} />
                </div>
              <div>
                <h5>{this.state.request.work.title}</h5>
                <p>{this.state.request.work.media}</p>
              </div>
            </div>
          </Touchable>
          <div className="w-60 gray self-stretch">
            <p>{this.state.request.message}</p>
            {this.state.request.receipt.comment ? (<p className="i mt3">Receipt notes: {this.state.request.receipt.comment}</p>) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Receipt;
