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
      type_valid: false,
      purchase_valid: false,
      start_valid: false,
      end_valid: false,
      price_valid: false,
      formErrors: {
        transaction_type: 'Type of transaction must be specified.',
        purchase_date: '',
        start_date: '',
        end_date: '',
        price: 'Price must be recorded for a transaction.'
      },
      formValid: false,
      renderErrors: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.renderErrorMessages = this.renderErrorMessages.bind(this);
  }

  /**
  * TODO: error handling has to change - look at claire/toastr for example
  */

  handleChange(event) {
    const transaction = this.state.transaction;
    const name = event.target.name;
    const value = event.target.value;
    transaction[name] = value;
    this.setState({ transaction: transaction },
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let errors = this.state.formErrors;
    let type_valid = this.state.type_valid;
    let purchase_valid = this.state.purchase_valid;
    let start_valid = this.state.start_valid;
    let end_valid = this.state.end_valid;
    let price_valid = this.state.price_valid;

    console.log("inside validateField")

    switch(fieldName) {
      case 'transaction_type':
        type_valid = value != null && value != 'choose';
        console.log("type:" + type_valid)
        errors.transaction_type = type_valid ? '' : 'Type of transaction must be specified.'
        errors.purchase_date = this.state.transaction.transaction_type == 'purchase' ?
                                'Purchase Date must be chosen for purchase.' : ''
        errors.start_date = this.state.transaction.transaction_type == 'rental' ?
                                'Start Date must be specified for rental.' : ''
        errors.end_date = this.state.transaction.transaction_type == 'rental' ?
                                'End Date must be specified for rental.' : ''
        break;
      case 'purchase_date':
        purchase_valid = value != null && this.state.transaction.transaction_type == "purchase";
        console.log("purchase date:" + purchase_valid)
        errors.purchase_date = purchase_valid ? '' : 'Purchase Date must be chosen for purchase.'
        break;
      case 'start_date':
        start_valid = value != null && this.state.transaction.transaction_type == "rental";
        errors.start_date = start_valid ? '' : 'Start Date must be chosen for rental.'
        break;
      case 'end_date':
        end_valid = value != null && this.state.transaction.transaction_type == "rental";
        errors.end_date = end_valid ? '' : 'End Date must be chosen for rental.'
        break;
      case 'price':
        price_valid = value > 0 && !(value < 0);
        console.log("price:" + price_valid)
        errors.price = price_valid ? '' : 'Price must be recorded for a transaction.'
        break;
      default:
        break;
    }
    this.setState({
        formErrors: errors,
        type_valid: type_valid,
        purchase_valid: purchase_valid,
        start_valid: start_valid,
        end_valid: end_valid,
        price_valid: price_valid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid:
            (this.state.type_valid && this.state.purchase_valid && this.state.price_valid)
        ||  (this.state.type_valid && this.state.start_valid && this.state.end_valid && this.state.price_valid)
    });
  }

  handleSubmit(event) {
    const artist_id = this.props.artist.id;
    const transactions_route = APIRoutes.transactions.create;
    const valid = this.state.formValid;
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

    if (!valid) {
      this.setState({ renderErrors: true })
    } else {
      Requester.post(transactions_route, payload).then(
        response => {
          window.location.href = '/transactions';
        },
        error => {
          console.error(error);
        }
      )
    }
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
          <p className="f6 lh-copy">Purchase Date  </p>
          <input
            type="date"
            name="purchase_date"
            id="purchase_date"
            value={this.state.transaction.purchase_date}
            onChange={this.handleChange}
          />

          <p>{this.renderErrorMessages("purchase_date")}</p>
        </div>
      )
    }
  }

  renderRentalDates() {
    if (this.state.transaction.transaction_type == "rental") {
      return (
        <div>
          <p className="f6 lh-copy">Start Date  </p>
          <input
            type="date"
            name="start_date"
            id="start_date"
            value={this.state.transaction.start_date}
            onChange={this.handleChange}
          />

          <p>{this.renderErrorMessages("start_date")}</p>

          <p className="f6 lh-copy">End Date  </p>
          <input
            type="date"
            name="end_date"
            id="end_date"
            value={this.state.transaction.end_date}
            onChange={this.handleChange}
          />

          <p>{this.renderErrorMessages("end_date")}</p>
        </div>
      )
    }
  }

  renderErrorMessages(fieldName) {
    console.log(this.state.formErrors)
    if (this.state.renderErrors && this.state.formErrors[fieldName].length > 0) {
      return (
        <div>
          <p>{this.state.formErrors[fieldName]}</p>
        </div>
      )
    } else {
      return (
        <div />
      );
    }
  }

render() {
  if (!this.state.didMount) {
    return (
      <div />
    );
  }
  return (
      <div className="create-transaction-form">
        <h2 className="f4 lh-title submit">Submit Details</h2>

        <p className="f6 lh-copy price">Price  </p>
        <input
          type="TEXT"
          name="price"
          id="price"
          value={this.state.transaction.price}
          onChange = {this.handleChange}
        />

        <p>{this.renderErrorMessages("price")}</p>

        <div className="f6 lh-copy drop-down">Type
          <select name="transaction_type"
                  value={this.state.transaction.transaction_type}
                  onChange={this.handleChange}>
              <option value="choose">choose a type</option>
              {  Object.keys(this.state.types).map((obj) => { return <option>{obj}</option> }) }
          </select>
        </div>

        <p>{this.renderErrorMessages("transaction_type")}</p>

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
