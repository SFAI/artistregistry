import PropTypes from "prop-types";
import React from "react";


class ArtistInbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inbox: []
    }
  }

  componentDidMount = () => {
    const artist_id = this.props.artist.id;
    const requests_route = APIRoutes.artists.requests(artist_id);
    Requester.get(requests_route, (response) => {
      this.setState({ inbox: response });
    }, (response) => {console.err(response)});
  }


  render() {


    return (
      <div>
        These will be the artist requests
        {this.state.inbox.map((request) =>
          <div key={request.request.id}>
            <h3>{request.request.message}</h3>
            <p> Requested by {request.buyer.name} </p>
            <p> Requested Artwork: {request.work.title} </p>
          </div>
        )}

      </div>
    );
  }
}

export default ArtistInbox;
