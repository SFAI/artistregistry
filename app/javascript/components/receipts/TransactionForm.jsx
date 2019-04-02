import PropTypes from "prop-types";
import React from "react";
import FormError from '../helpers/FormError';
import { convertToCurrency } from "../../utils/currency";
import WorkFixedPanel from "../works/WorkFixedPanel";
import Button from "../helpers/Button";
import LoadingOverlay from "../helpers/LoadingOverlay";

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
      updatingTransaction: false,
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

  updateWork = (work_id) => {
    const trasactionType = this.state.receipt.transaction_type
    let newAvailability = "sold"
    if (trasactionType == 'rental') {
      newAvailability = "rented"
    }
    let formData = new FormData();
    formData.append(`work[availability]`, newAvailability);
    fetch(APIRoutes.works.update(work_id), {
      method: 'PUT',
      body: formData,
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((data) => {
      window.location.href = '/requests';
      })
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
      this.setState({ updatingTransaction: true });
      Requester.post(receipts_route, payload).then(
        response => {
          this.updateWork(this.props.work.id)
        },
        error => {
          console.error(error);
        }
      )
    } else {
      this.setState({ updatingTransaction: true });
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
        });
      },
      error => {
        console.error(error);
      }
    )
  }

  renderRentalDates = () => {
    if (this.state.receipt.transaction_type === "rental") {
      return (
        <div>
          <h5>Start Date</h5>
          <input
            type="date"
            name="start_date"
            className="textinput"
            value={this.state.receipt.start_date}
            onChange={this.handleChange}
          />
          <FormError error={this.state.errors["start_date"]}/>
          <h5>End Date</h5>
          <input
            type="date"
            name="end_date"
            className="textinput"
            value={this.state.receipt.end_date}
            onChange={this.handleChange}
          />
          <FormError error={this.state.errors["end_date"]}/>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="w-100">
        {this.state.updatingTransaction ? <LoadingOverlay /> : null}
        <div className="fl w-30">
          <WorkFixedPanel work={this.props.work}/>
        </div>
        <div className="fl w-70 pl3">
          <h5>Price</h5>
          <div className="price">
            <h5 className="mr2">$</h5>
            <input
              type="TEXT"
              name="price"
              value={convertToCurrency(this.state.receipt.price)}
              onChange = {this.handleChange}
              className="textinput"
            />
          </div>
          <FormError error={this.state.errors["price"]}/>
          <h5>Type</h5>
          <select
            name="transaction_type"
            value={this.state.receipt.transaction_type}
            onChange={this.handleChange}
            className="input-dropdown"
          >
            {  Object.keys(this.state.types).map((obj, i) => { return <option key={i}>{obj}</option> }) }
          </select>
          <FormError error={this.state.errors["transaction_type"]}/>
          { this.renderRentalDates() }
          <h5>Purchase Date</h5>
          <input
            type="date"
            name="purchase_date"
            value={this.state.receipt.purchase_date}
            onChange={this.handleChange}
            className="textinput"
          />
          <FormError error={this.state.errors["purchase_date"]}/>
          <h5>Additional Comments</h5>
          <textarea
            type="TEXT"
            name="comment"
            id="comment"
            rows={4}
            value={this.state.receipt.comment}
            onChange={this.handleChange}
            className="textarea"
          />
          <Button type="button-primary" className="w4" color="ochre" onClick={this.handleSubmit}>
            Record
          </Button>
        </div>
      </div>
    );
  }
}

export default TransactionForm;
