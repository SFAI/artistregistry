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
        transaction_type: '',
        start_date: '',
        end_date: '',
        purchase_date: '',
        price: '',
        buyer: '',
        work: '',
        comment: ''
      },
      types: '',
      didMount: false,
      formErrors: {
        transaction_type: 'Please specify a type of transaction.',
        purchase_date: 'Please choose a purchase date.',
        start_date: 'Please choose a start date for the rental.',
        end_date: 'Please choose an end date for the rental.',
        price: 'Please enter a price for your transaction.'
      },
      fieldValid: {
        type_valid: false,
        purchase_valid: false,
        start_valid: false,
        end_valid: false,
        price_valid: false,
      },
      formValid: false,
      renderErrors: false,
    }
  }

  handleChange = (event) => {
    const transaction = this.state.transaction;
    const name = event.target.name;
    const value = event.target.value;
    transaction[name] = value;
    this.setState({ transaction: transaction },
                  () => { this.validateField(name, value) });
  }

  validateField = (fieldName, value) => {
    let errors = this.state.formErrors;
    let fields = this.state.fieldValid;

    switch(fieldName) {
      case 'transaction_type':
        fields.type_valid = value != null && value != 'choose';
        errors.transaction_type = fields.type_valid ? '' : 'Please specify a type of transaction.'
        break;
      case 'purchase_date':
        fields.purchase_valid = value != null && this.state.transaction.transaction_type == "purchase";
        errors.purchase_date = fields.purchase_valid ? '' : errors.purchase_date
        break;
      case 'start_date':
        fields.start_valid = value != null && this.state.transaction.transaction_type == "rental";
        errors.start_date = fields.start_valid ? '' : errors.start_date
        break;
      case 'end_date':
        fields.end_valid = value != null
                    && this.state.transaction.transaction_type == "rental"
                    && value >= this.state.transaction.start_date;
        errors.end_date = fields.end_valid ? '' : 'End Date must occur after Start Date.'
        break;
      case 'price':
        fields.price_valid = value > 0 && !(value < 0);
        errors.price = fields.price_valid ? '' : 'Please enter a price greater than 0.'
        break;
      default:
        break;
    }
    this.setState({
        formErrors: errors,
        fieldValid: fields
    }, this.validateForm);
  }

  validateForm = () => {
    this.setState({
      formValid:
            (this.state.fieldValid.type_valid
              && this.state.fieldValid.purchase_valid
              && this.state.fieldValid.price_valid)
        ||  (this.state.fieldValid.type_valid
              && this.state.fieldValid.start_valid
              && this.state.fieldValid.end_valid
              && this.state.fieldValid.price_valid)
    });
  }

  handleSubmit = (event) => {
    const transactions_route = APIRoutes.receipts.create;
    const valid = this.state.formValid;
    const payload = {
      "transaction_type": this.state.transaction.transaction_type,
      "start_date": this.state.transaction.start_date,
      "end_date": this.state.transaction.end_date,
      "purchase_date": this.state.transaction.purchase_date,
      "price": this.state.transaction.price,
      "request_id": this.props.request_id,
      "comment": this.state.transaction.comment
    }

    if (!valid) {
      this.setState({ renderErrors: true })
    } else {
      Requester.post(transactions_route, payload).then(
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
    if (this.state.transaction.transaction_type == "purchase") {
      return (
        <div>
          <p className="f6 lh-copy">Purchase Date </p>
          <input
            type="date"
            name="purchase_date"
            id="purchase_date"
            value={this.state.transaction.purchase_date}
            onChange={this.handleChange}
          />

          {this.renderErrorMessages("purchase_date")}
        </div>
      )
    }
  }

  renderRentalDates = () => {
    if (this.state.transaction.transaction_type == "rental") {
      return (
        <div>
          <p className="f6 lh-copy">Purchase Date  </p>
          <input
            type="date"
            name="purchase_date"
            id="purchase_date"
            value={this.state.transaction.purchase_date}
            onChange={this.handleChange}
          />

          {this.renderErrorMessages("purchase_date")}

          <p className="f6 lh-copy">Start Date  </p>
          <input
            type="date"
            name="start_date"
            id="start_date"
            value={this.state.transaction.start_date}
            onChange={this.handleChange}
          />

          {this.renderErrorMessages("start_date")}

          <p className="f6 lh-copy">End Date  </p>
          <input
            type="date"
            name="end_date"
            id="end_date"
            value={this.state.transaction.end_date}
            onChange={this.handleChange}
          />

          {this.renderErrorMessages("end_date")}
        </div>
      )
    }
  }

  renderErrorMessages = (fieldName) => {
    if (this.state.renderErrors && this.state.formErrors[fieldName].length > 0) {
      return (
        <div>
          <p className="error">{this.state.formErrors[fieldName]}</p>
        </div>
      )
    } else {
      return (
        <div />
      );
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
      <div />
    );
  }
  return (
      <div className="create-transaction-form">

        <p className="f6 lh-copy price">Price  </p>
        $<input
          type="TEXT"
          name="price"
          id="price"
          value={this.currencyDisplay(this.state.transaction.price)}
          onChange = {this.handleChange}
        />

        {this.renderErrorMessages("price")}

        <div className="f6 lh-copy drop-down">Type
          <select name="transaction_type"
                  value={this.state.transaction.transaction_type}
                  onChange={this.handleChange}>
              <option value="choose">choose a type</option>
              {  Object.keys(this.state.types).map((obj, i) => { return <option key={i}>{obj}</option> }) }
          </select>
        </div>

        {this.renderErrorMessages("transaction_type")}

        { this.renderRentalDates() }
        { this.renderPurchaseDate() }

        <p className="f6 lh-copy">Additional Comments </p>
        <textarea
          type="TEXT"
          name="comment"
          id="comment"
          value={this.state.transaction.comment}
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

export default CreateTransaction;
