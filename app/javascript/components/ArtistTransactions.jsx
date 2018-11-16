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
      transactions: [],
      didMount: false
    }
  }

  componentDidMount = () => {
    const artist_id = this.props.artist.id;
    const transactions_route = APIRoutes.artists.transactions(artist_id);
    Requester.get(transactions_route).then(
      response => {
        this.setState({
          transactions: response,
          didMount: true
         });
      },
      error => {
        console.error(error);
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
    if (!this.state.didMount) {
      return (
        <div />
      );
    }
    return (
      <div className="transactions-page">
        <h2 className="f4 lh-title fw6">Transactions</h2>
        <br />
        {this.state.transactions.map(transaction => (
          <div className="bb b--gray" key={transaction.id}>
            <p>
              <span className="b">Title</span>
              <span className="i"> {transaction.work_title} </span>
              <span>${transaction.price}</span>
            </p>
            <p>
              <span className="b">Patron</span>
              <span className="i"> {transaction.buyer_name} </span>
              <span className="i">{transaction.transaction_type}</span>
            </p>
            <p>
              <span>{transaction.comment}</span>
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
