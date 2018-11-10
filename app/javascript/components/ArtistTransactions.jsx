import PropTypes from "prop-types";
import React from "react";
import Modal from "./Modal";
import CreateTransaction from "./CreateTransaction";

/**
* @prop artist: artist associated with transactions
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
    const transactions_route = APIRoutes.artists.transactions(artist_id);
    Requester.get(transactions_route).then(
      response => {
        this.setState({ transactions: response });
      },
      error => {
        console.err(error);
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
      <div className="transactions-page">
        <h2 className="f4 lh-title fw6">Transactions</h2>
        <br />
        {this.state.transactions.map(transaction => (
          <div className="bb b--gray" key={transaction.transaction.id}>
            <p>
              <span className="b">Title</span>
              <span className="i"> {transaction.work.title} </span>
              <span>${transaction.transaction.price}</span>
            </p>
            <p>
              <span className="b">Patron</span>
              <span className="i"> {transaction.buyer.name} </span>
              <span className="i">{transaction.transaction.transaction_type}</span>
            </p>
            <p>
              <span>{transaction.transaction.comment}</span>
            </p>
          </div>
        ))}

        <Modal show={this.state.show} handleClose={this.hideModal}>
          <CreateTransaction artist={this.props.artist}/>
        </Modal>
        <br />
        <button className="record-button" onClick={this.showModal}>
          Mark as Complete
        </button>

      </div>
    );
  }

}

export default ArtistTransactions;
