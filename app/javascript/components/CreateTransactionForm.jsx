import PropTypes from "prop-types";
import React from "react";
import DatePicker from "react-datepicker";

/**
* @prop artist: artist creating transaction
* @prop buyer: buyer associated with transaction
* @prop work: work associated with transaction
*/

class CreateTransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: moment(),
      end_date: moment(),
      purchase_date: moment(),
      price: 0,
    }
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handlePurchaseDateChange = this.handlePurchaseDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
}
