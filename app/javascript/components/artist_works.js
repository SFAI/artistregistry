import PropTypes from "prop-types";
import React from "react";

class ArtistWorks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: []
    };
  }

  componentDidMount = () => {
    const artist_id = this.props.artist.id;
    const works_route = APIRoutes.artists.works(0);
    Requester.get(works_route).then(
      response => {
        this.setState({ works: response });
      },
      response => {
        console.err(response);
      }
    );
  };

  render() {
    return (
      <div className="artist-profile-page">
        These will be the artist works
        {this.state.works.map(work => (
          <div key={work.id}>
            <h3>{work.title}</h3>
            <p>{work.work_type}</p>
            <p>{work.media}</p>
          </div>
        ))}
        <div className="fl w-100 pa2">
          <h1>aaklsdj</h1>
        </div>
      </div>
    );
  }
}

export default ArtistWorks;
