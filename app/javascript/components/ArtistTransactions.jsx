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
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
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
        <h1>Create Transaction Form Modal Thing</h1>
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
