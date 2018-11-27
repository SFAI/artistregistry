import PropTypes from "prop-types";
import React from "react";
import FormError from '../helpers/FormError';

/**
* @prop artist: artist creating transaction
* @prop buyer: buyer associated with transaction
* @prop work: work associated with transaction
*/

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receipt: this.props.receipt,
      route: this.props.route,
      method: this.props.method,
      types: {},
      didMount: false,
      errors: {
        transaction_type: '',
        purchase_date: '',
        start_date: '',
        end_date: '',
        price: ''
      }
    }
  }

  handleChange = (event) => {
    const receipt = this.state.receipt;
    const name = event.target.name;
    const value = event.target.value;
    receipt[name] = value;
    this.setState({ receipt: receipt });
  }

  checkErrors() {
    let errors = {
      purchase_date: "",
      start_date: "",
      end_date: "",
      price: ""
    };
    if (this.state.receipt.transaction_type === "choose") {
      errors["transaction_type"] = "Please choose a type of transaction.";
    }
    if (!this.state.receipt.purchase_date && this.state.receipt.transaction_type === "purchase") {
      errors["purchase_date"] = "Please choose a purchase date.";
    }
    if (!this.state.receipt.start_date && this.state.receipt.transaction_type === "rental") {
      errors["start_date"] = "Please choose a start date for the rental.";
    }
    if (!this.state.receipt.end_date && this.state.receipt.transaction_type === "rental") {
      errors["end_date"] = "Please choose an end date for the rental.";
    }
    if (this.state.receipt.end_date && this.state.receipt.end_date < this.state.receipt.start_date) {
      errors["end_date"] = "End date must occur after start date.";
    }
    if (!this.state.receipt.price || this.state.receipt.price < 0) {
      errors["price"] = "Please enter a valid price.";
    }
    return errors;
  }

  handleSubmit = (event) => {
    const receipts_route = this.props.route;
    const method = this.props.method;
    const payload = {
      "transaction_type": this.state.receipt.transaction_type,
      "start_date": this.state.receipt.start_date,
      "end_date": this.state.receipt.end_date,
      "purchase_date": this.state.receipt.purchase_date,
      "price": this.state.receipt.price,
      "request_id": this.props.request_id,
      "comment": this.state.receipt.comment
    }

    let errors = this.checkErrors();

    let hasErrors = false;
    Object.keys(errors).forEach((key) => {
      if (errors[key]) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      this.setState({ errors: errors });
    } else if (method == "POST") {
      Requester.post(receipts_route, payload).then(
        response => {
          window.location.href = '/requests';
        },
        error => {
          console.error(error);
        }
      )
    } else {
      Requester.update(receipts_route, payload).then(
        response => {
          window.location.href = '/requests';
        },
        error => {
          console.error(error);
        }
      )
    }
  }

  componentDidMount = () => {
    const types_route = APIRoutes.receipts.types;
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

  renderPurchaseDate = () => {
    if (this.state.receipt.transaction_type === "purchase") {
      return (
        <div>
          <p className="f6 lh-copy">Purchase Date </p>
          <input
            type="date"
            name="purchase_date"
            id="purchase_date"
            value={this.state.receipt.purchase_date}
            onChange={this.handleChange}
          />

          <FormError error={this.state.errors["purchase_date"]}/>
        </div>
      )
    }
  }

  renderRentalDates = () => {
    if (this.state.receipt.transaction_type === "rental") {
      return (
        <div>
          <p className="f6 lh-copy">Start Date  </p>
          <input
            type="date"
            name="start_date"
            id="start_date"
            value={this.state.receipt.start_date}
            onChange={this.handleChange}
          />

          <FormError error={this.state.errors["start_date"]}/>

          <p className="f6 lh-copy">End Date  </p>
          <input
            type="date"
            name="end_date"
            id="end_date"
            value={this.state.receipt.end_date}
            onChange={this.handleChange}
          />

          <FormError error={this.state.errors["end_date"]}/>
        </div>
      )
    }
  }

  currencyDisplay = (inputPrice) => {
    let value = new String(inputPrice);
    // remove all characters that aren't a digit or dot
    value = value.replace(/[^0-9.]/g,'');
    // replace multiple dots with a single dot
    value = value.replace(/\.+/g,'.');
    // only allow 2 digits after a dot
    value = value.replace(/(.*\.[0-9][0-9]?).*/g,'$1');
    // replace multiple zeros with a single one
    value = value.replace(/^0+(.*)$/,'0$1');
    // remove leading zero
    value = value.replace(/^0([^.].*)$/,'$1');
    return value;
  }

render() {

  if (!this.state.didMount) {
    return (
      <div><h2>Loading</h2></div>
    );
  }
  return (
      <div className="create-transaction-form">

        <p className="f6 lh-copy price">Price  </p>
        $<input
          type="TEXT"
          name="price"
          id="price"
          value={this.currencyDisplay(this.state.receipt.price)}
          onChange = {this.handleChange}
        />

        <FormError error={this.state.errors["price"]}/>

        <p className="f6 lh-copy">Type
          <select name="transaction_type"
                  value={this.state.receipt.transaction_type}
                  onChange={this.handleChange}>
              <option value="choose">choose a type</option>
              {  Object.keys(this.state.types).map((obj, i) => { return <option key={i}>{obj}</option> }) }
          </select>
        </p>

        { console.log(this.state.receipt.transaction_type) }

        <FormError error={this.state.errors["transaction_type"]}/>

        { this.renderRentalDates() }

        <p className="f6 lh-copy">Purchase Date </p>
        <input
          type="date"
          name="purchase_date"
          id="purchase_date"
          value={this.state.receipt.purchase_date}
          onChange={this.handleChange}
        />

        <FormError error={this.state.errors["purchase_date"]}/>

        <p className="f6 lh-copy">Additional Comments </p>
        <textarea
          type="TEXT"
          name="comment"
          id="comment"
          value={this.state.receipt.comment}
          onChange = {this.handleChange}
        />

        <p>
          <button className="record-button" onClick={this.handleSubmit}>
            Record
          </button>
        </p>
      </div>
    );
  }
}

export default TransactionForm;
