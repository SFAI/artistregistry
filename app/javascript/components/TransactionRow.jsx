import PropTypes from "prop-types";
import React from "react";

/**
* @prop transaction: transaction associated with this row
*/

class TransactionRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const transaction = this.props.transaction;
    return (
      <div className="bb b--gray">
        <p>
          <span className="b">Title</span>
          <span className="i"> {transaction.work_title} </span>
          <span className="b"> ${transaction.price} </span>
        </p>
        <p>
          <span className="b">Patron</span>
          <span className="i"> {transaction.buyer_name} </span>
          <span className="b">{transaction.transaction_type}</span>
        </p>
        <p>
          <span>{transaction.comment}</span>
        </p>
      </div>
    );
  }
}

export default TransactionRow;
