import PropTypes from "prop-types";
import React from "react";

/**
* @prop artist: artist creating transaction
* @prop buyer: buyer associated with transaction
* @prop work: work associated with transaction
*/

class ArtistTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      transactions: []
    }
  }

  componentDidMount = () => {
    const artist_id = this.props.artist.id;
    const transactions_route = APIRoutes.artists.transactions(0);
    Requester.get(transactions_route).then(
      response => {
        this.setState({ transactions: response });
      },
      response => {
        console.err(response);
      }
    );
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <main>
        <h2>Artist Transactions</h2>
        {this.state.transactions.map(transaction => (
          <div key={transaction.transaction.id}>
            <h3>{transaction.transaction.comment}</h3>
            <p> Completed With: {transaction.buyer.name} </p>
            <p> Price: {transaction.transaction.price} </p>
            <p> Artwork: {transaction.work.title} </p>
          </div>
        ))}

        <h3>Record a New Transaction</h3>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <CreateTransactionForm>
        </Modal>
        <button type="button" onClick={this.showModal}>
          Record Transaction
        </button>
      </main>
    );
  }

}
