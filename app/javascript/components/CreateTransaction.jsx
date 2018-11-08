import PropTypes from "prop-types";
import React from "react";

/**
* @prop artist: artist creating transaction
* @prop buyer: buyer associated with transaction
* @prop work: work associated with transaction
*/

class CreateTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: {
        transaction_type: null,
        start_date: null,
        end_date: null,
        purchase_date: null,
        price: null,
        buyer: null,
        work: null,
        comment: ""
      },
      types: null,
      didMount: false,
      isEnabled: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
  * TODO: error handling has to change - look at claire/toastr for example
  */

  handleChange(event) {
    const transaction = this.state.transaction;
    transaction[event.target.name] = event.target.value;
    this.setState({ transaction: transaction });
    this.setState({ isEnabled: ((this.state.transaction.transaction_type == "purchase"
                                    && this.state.transaction.purchase_date != null)
                              || (this.state.transaction.transaction_type == "rental"
                                    && this.state.transaction.start_date != null
                                    && this.state.transaction.end_date != null))
                              && this.state.transaction.price > 0
                              && !(this.state.transaction.price < 0) })
  }

  handleSubmit(event) {
    const artist_id = this.props.artist.id;
    const transactions_route = APIRoutes.transactions.create;
    const payload = {
      "type": this.state.transaction.transaction_type,
      "start_date": this.state.transaction.start_date,
      "end_date": this.state.transaction.end_date,
      "purchase_date": this.state.transaction.purchase_date,
      "price": this.state.transaction.price,
      "buyer_id": 0,
      "artist_id": artist_id,
      "work_id": 0,
      "comment": this.state.transaction.comment
    }
    Requester.post(transactions_route, payload).then(
      response => {
        window.location.href = '/transactions';
      }
    )
  }

  componentDidMount = () => {
    const types_route = APIRoutes.transactions.types;
    Requester.get(types_route).then(
      response => {
        this.setState({
          types: response,
          didMount: true
        });
      },
      error => {
        console.error(error);
      }
    )
  }

  renderPurchaseDate() {
    if (this.state.transaction.transaction_type == "purchase") {
      return (
        <div>
          <p className="f6 lh-copy">Purchase Date:</p>
          <input
            type="date"
            name="purchase_date"
            id="purchase_date"
            value={this.state.transaction.purchase_date}
            onChange={this.handleChange}
          />
        </div>
      )
    }
  }

  renderRentalDates() {
    if (this.state.transaction.transaction_type == "rental") {
      return (
        <div>
          <p className="f6 lh-copy">Start Date:</p>
          <input
            type="date"
            name="start_date"
            id="start_date"
            value={this.state.transaction.start_date}
            onChange={this.handleChange}
          />

          <p className="f6 lh-copy">End Date:</p>
          <input
            type="date"
            name="end_date"
            id="end_date"
            value={this.state.transaction.end_date}
            onChange={this.handleChange}
          />
        </div>
      )
    }
  }

render() {
  if (!this.state.didMount) {
    return (
      <div />
    );
  }
  return (
      <div>
        <h2 class="f4 lh-title">Create a Transaction</h2>

        <p className="f6 lh-copy">Price:</p>
        <input
          type="NUMBER"
          name="price"
          id="price"
          value={this.state.transaction.price}
          onChange = {this.handleChange}
        />

        <div className="f6 lh-copy drop-down">Type:
          <select name="transaction_type" value={this.state.transaction.transaction_type} onChange={this.handleChange}>
              <option value="choose">choose a type</option>
              {  Object.keys(this.state.types).map((obj) => { return <option>{obj}</option> }) }
          </select>
        </div>

        {this.renderRentalDates()}
        {this.renderPurchaseDate()}

        <p className="f6 lh-copy">Additional Comments:</p>
        <textarea
          type="TEXT"
          name="comment"
          id="comment"
          value={this.state.transaction.comment}
          onChange = {this.handleChange}
        />

        <button disabled={!this.state.isEnabled} onClick={this.handleSubmit}>
          Record
        </button>
      </div>
    );
  }
}

export default CreateTransaction;
