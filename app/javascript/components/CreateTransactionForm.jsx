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
      comment: "",
      buyer: ""
    }
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handlePurchaseDateChange = this.handlePurchaseDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleBuyerChange = this.handleBuyerChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  //I THINK THESE ARE ALL SUPPOSED TO BE UNDER THE SAME HANDLECHANGE LOL

  handleStartDateChange(date) {
    this.setState({
      start_date: date
    });
  }

  handleEndDateChange(date) {
    this.setState({
      end_date: date
    });
  }

  handlePurchaseDateChange(date) {
    this.setState({
      purchase_date: date
    });
  }

  handlePriceChange(price) {
    this.setState({
      price: price
    });
  }

//EVENTUAL DROPDOWN/SEARCH CAPABILITY

  <input
    type="TEXT"
    name="buyer"
    id="buyer"
    value={this.state.buyer}
    onChange = {this.handleBuyerChange}
  />

  <input
    type="NUMBER"
    name="price"
    id="price"
    value={this.state.price}
    onChange = {this.handlePriceChange}
  />

//EVENTUAL DROPDOWN

  <input
    type="TEXT"
    name="type"
    id="type"
    value={this.state.type}
    onChange = {this.handleTypeChange}
  />

//ADD SOME SORT OF "IF TYPE = BLAH RENDER THIS, IF NOT RENDER THAT"

  <datepicker
    selected={this.state.start_date}
    onChange={this.handleStartDateChange}
  />

  <datepicker
    selected={this.state.end_date}
    onChange={this.handleEndDateChange}
  />

  <datepicker
    selected={this.state.purchase_date}
    onChange={this.handlePurchaseDateChange}
  />

  <textarea
    type="TEXT"
    name="comment"
    id="comment"
    value={this.state.comment}
    onChange = {this.handleCommentChange}
  />

  <button onClick={this.handleSubmit}>
    Record Transaction
  </button>
}
