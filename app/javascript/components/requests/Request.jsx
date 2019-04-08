import PropTypes from "prop-types";
import React from "react";
import StyledModal from "../helpers/StyledModal";
import TransactionForm from "../receipts/TransactionForm";
import BuyerSnapshot from "../buyers/BuyerSnapshot";
import ArtistSnapshot from "../artists/ArtistSnapshot";
import WorkFixedPanel from "../works/WorkFixedPanel";
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
      dropDownVisible: false
    };
  }

  closeRequest = (id) => {
    const update_request_route = APIRoutes.requests.update(id);
    Requester.update(update_request_route, { open: false }).then((response) => {
      this.props.onChange();
    });
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

  render() {
    let id = this.state.request.id;

    return (
      <div key={this.state.request.id} className="bg-white mb3">
        <div className="flex justify-between w-100 items-center bb b--light-gray bt-0 bl-0 br-0">
          { this.props.artist ? 
            (<BuyerSnapshot buyer={this.state.request.buyer} />) : 
            (<ArtistSnapshot artist={this.state.request.artist} />)
          }
          <div className="pa3 flex-grow-1">
          </div>
          <div className="pa3 flex-grow-1">
          </div>
          <div className="pa3">
            <h5>Price</h5>
            <p>{"$" + this.state.request.work.price}</p>
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
              <li>Delete</li>
              <li>Block user</li>
            </ul>
          </div>
        </div>

        <div className="ttu b mt3 ml3 f6">
          { this.renderStatus() }
        </div>
        <div className="flex justify-between items-start pr5 pa3">
          <div className="flex">
            <Touchable onPress={() => this.navigateToWork(this.state.request.work.id)}>
              <div className="w4 pb6 relative mr3">
                <img className="work-image fit-cover w-100 h-100 pointer absolute" src={this.state.request.work.featured_image.url} />
              </div>
            </Touchable>
            <div>
              <h5>{this.state.request.work.title}</h5>
              <p>{this.state.request.work.media}</p>
            </div>
          </div>
          <div className="w-60 gray">
            <p>{this.state.request.message}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Request;
