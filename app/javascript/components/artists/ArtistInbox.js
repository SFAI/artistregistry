import PropTypes from "prop-types";
import React from "react";

class ArtistInbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        These will be the artist requests
        {this.props.requests.map(request => (
          <div key={request.request.id}>
            <h3>{request.request.message}</h3>
            <p> Requested by {request.buyer.name} </p>
            <p> Requested Artwork: {request.work.title} </p>
          </div>
        ))}
      </div>
    );
  }
}

export default ArtistInbox;
