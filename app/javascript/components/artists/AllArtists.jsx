import PropTypes from "prop-types";
import React from "react";
import ArtistColumnPanel from "./ArtistColumnPanel";
import Load from "../helpers/Load";
import Filters from "../works/Filters";

class AllArtists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: null,
      filters: [],
      componentDidMount: false,
      isLoading: true
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
          componentDidMount: true,
          isLoading: false
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  getFilteredArtists = () => {
    // NOTE: Can't pass empty searchParams string to filtered_artists
    // Possible fix by editing routes.fb, but not sure how -B.Y.
    const searchParams = this.filters.getQuery();
    this.setState({ isLoading: true });

    const artists_route = searchParams.length
      ? APIRoutes.artists.filtered_artists(searchParams)
      : APIRoutes.artists.index;

    Requester.get(
      artists_route).then(
        response => {
          this.setState({
            artists: response,
            isLoading: false
          });
        },
        response => {
          console.error(response);
        }
      );
  };

  render() {
    if (!this.state.componentDidMount) {
      return (
        <div><Load itemType="artists" /></div>
      );
    }

    const { filters, artists } = this.state;

    return (
      <div className="pt4">
        {this.state.isLoading ? <Load itemType="artists" /> : null}
        <div className="fl w-20 pa3 mt5">
          <Filters
            ref={(node) => { this.filters = node }}
            filters={filters}
          />
          <button onClick={this.getFilteredArtists} className="button-primary bg-indigo w-100"> Apply </button>
        </div>
        <div className="fl w-80 pb5">
          <h1>Artists</h1>
          <div className="col-list-3">
            {artists.filter(artist => artist.works.length > 0).map((artist, i) => {
              return <ArtistColumnPanel key={i} artist={artist} />
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default AllArtists;
