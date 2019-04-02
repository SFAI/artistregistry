import PropTypes from "prop-types";
import React from "react";
import ArtistColumnPanel from "./ArtistColumnPanel";
import LoadingOverlay from "../helpers/LoadingOverlay";
import Filters from "../works/Filters";
import ReactPaginate from 'react-paginate'

const perPage = 6

class AllArtists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: null,
      filters: [],
      componentDidMount: false,
      isLoading: true,
      pageCount: 0,
      artistStartIndex: 0,
      artistEndIndex: 0
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
        const artists_response_filtered = artists_response.filter(artist => artist.works.length > 0)
        this.setState({
          artists: artists_response_filtered,
          filters: filters_response,
          componentDidMount: true,
          isLoading: false,
          pageCount: Math.ceil(artists_response_filtered.length / perPage),
          artistStartIndex: 0,
          artistEndIndex: perPage
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
            artists: response.filter(artist => artist.works.length > 0),
            isLoading: false,
            pageCount: Math.ceil(response.filter(artist => artist.works.length > 0).length / perPage)
          });
        },
        response => {
          console.error(response);
        }
      );
  };

  handlePageClick = data => {
    let selected = data.selected;
    this.setState({
      artistStartIndex: selected * perPage,
      artistEndIndex: (selected+1) * perPage
    })
  };

  render() {
    if (!this.state.componentDidMount) {
      return (
        <div><LoadingOverlay itemType="artists" fullPage={true} /></div>
      );
    }

    const { isLoading, filters, artists, pageCount, artistStartIndex, artistEndIndex } = this.state;

    return (
      <div className="pt4">
        {isLoading ? <LoadingOverlay itemType="artists" fullPage={true} /> : null}
        <div className="fl w-20 pa3 mt5">
          <Filters
            ref={(node) => { this.filters = node }}
            filters={filters}
            color="indigo"
          />
          <button onClick={this.getFilteredArtists} className="button-primary bg-indigo w-100"> Apply </button>
        </div>
        <div className="fl w-80 pb5">
          <div className="flex justify-between items-baseline">
            <h1>Artists</h1>
            <nav className="li-indigo pagination" role="navigation" aria-label="Pagination Navigation">
              <ReactPaginate
              previousLabel={"\u00ab"}
              nextLabel={"\u00bb"}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              activeClassName={'active'}
              disabledClassName={'hidden'}
              />
            </nav>
            </div>
            <div className="col-list-3">
              {artists.slice(artistStartIndex, artistEndIndex).map((artist, i) => {
                return <ArtistColumnPanel key={i} artist={artist} />
              })}
            </div>
          </div>
        </div>
    );
  }
}

export default AllArtists;
