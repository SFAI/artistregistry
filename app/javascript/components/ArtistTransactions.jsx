import PropTypes from "prop-types";
import React from "react";
import CreateTransaction from "./CreateTransaction";
import StyledModal from "./StyledModal";
import TransactionRow from "./TransactionRow";

/**
* @prop artist: artist associated with transactions
*/

class ArtistTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      didMount: false
    }
  }

  componentDidMount = () => {
    const artist_id = this.props.artist.id;
    const transactions_route = APIRoutes.transactions.artist(artist_id);
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

  renderTransactionRows = () => {
    return this.state.transactions.map((transaction, i) => {
      return <TransactionRow key={i} transaction={transaction} />;
    });
  }

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
        {this.renderTransactionRows()}
        <StyledModal>
          <CreateTransaction artist={this.props.artist}/>
        </StyledModal>
      </div>
    );
  }
}

export default ArtistTransactions;
