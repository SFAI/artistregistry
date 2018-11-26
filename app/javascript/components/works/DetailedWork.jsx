import PropTypes from "prop-types";
import React from "react";
import RequestForm from '../requests/RequestForm';

class DetailedWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      work: this.props.work,
    };
  }

  render() {
    return (
      <div>
        <h2>{this.state.work.title}</h2>
        <RequestForm
          buyer={this.props.buyer}
          artist_id={this.props.work.artist_id}
          work_id={this.state.work.id}
          work_status={this.state.work.availability}
        />
      </div>
    );
  }
}

export default DetailedWork;
