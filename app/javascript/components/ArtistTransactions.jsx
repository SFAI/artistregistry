import PropTypes from "prop-types";
import React from "react";
import CreateTransaction from "./CreateTransaction";
import ReactModal from "react-modal";
import Currency from 'react-currency-formatter';

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
              <span>
                <Currency
                  quantity={transaction.price}
                  symbol="$"
                  locale="en"
                />
              </span>
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

        <ReactModal className="ba pa3 modal" isOpen={this.state.show} onRequestClose={this.hideModal}>
          <CreateTransaction artist={this.props.artist}/>
          <button className="cancel-button" onClick={this.hideModal}>
            Cancel
          </button>
        </ReactModal>
        <br />
        <button className="record-button" onClick={this.showModal}>
          Mark as Complete
        </button>

      </div>
    );
  }

}

export default ArtistTransactions;
