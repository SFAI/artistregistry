import PropTypes from "prop-types";
import React from "react";
import ArtistColumnPanel from "./ArtistColumnPanel";
import Filters from "../works/Filters";

class AllArtists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: null,
      filters: null,
      componentDidMount: false
    };
  }

  componentDidMount() {
    const artist_route = APIRoutes.artists.index;
    const categories_route = APIRoutes.artists.categories;
    Promise.all([
      Requester.get(artist_route),
      Requester.get(categories_route)
    ]).then(
      response => {
        const [artists_response, filters_response] = response;
        this.setState({
          artists: artists_response,
          filters: filters_response,
          componentDidMount: true
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  render() {
    if (!this.state.componentDidMount) {
      return (
        <div>
          <h1>Loading</h1>
        </div>
      );
    }

    return (
      <div className="pt4">
        <div className="fl w-20 pa3 mt5">
          <Filters
            ref={(node) => { this.filters = node }}
            filters={{}}
          />
          <button onClick={this.getFilteredWorks} className="button-primary bg-magenta w-100"> Apply </button>
        </div>
        <div className="fl w-80 pb5">
          <h1>Artwork</h1>
          <div className="col-list-3">
            {this.state.artists.map((artist, i) => {
              return <ArtistColumnPanel key={i} artist={artist} />
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default AllArtists;
