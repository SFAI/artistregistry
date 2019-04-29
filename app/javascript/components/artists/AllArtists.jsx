import PropTypes from "prop-types";
import React from "react";
import ArtistColumnPanel from "./ArtistColumnPanel";
import LoadingOverlay from "../helpers/LoadingOverlay";
import Filters from "../works/Filters";
import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../helpers/Button";

/**
 * @prop userType: { "artist", "buyer", "admin" }
 */

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
    const unhiddenParams = `hidden=false`
    const artist_route = this.props.userType == "admin"
      ? APIRoutes.artists.index
      : APIRoutes.artists.filtered_artists(unhiddenParams)
    const categories_route = APIRoutes.artists.categories;
    Promise.all([
      Requester.get(artist_route),
      Requester.get(categories_route)
    ]).then(
      response => {
        const [artists_response, filters_response] = response;
        let artists_response_filtered = artists_response
        if (this.props.userType != "admin") {
          artists_response_filtered = artists_response.filter(artist => artist.works.filter(work => work.hidden === false).length > 0)
        }
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
          let artists
          if (this.props.userType == "admin") {
            artists = response
          } else {
            artists = response.filter(artist => artist.works.filter(work => work.hidden === false).length > 0).filter(artist => artist.hidden == false)
          }
          this.setState({
            artists: artists,
            isLoading: false,
            pageCount: Math.ceil(artists.filter.length / perPage)
          });
        },
        response => {
          console.error(response);
        }
      );
  };

  hideArtist = (artist_id) => {
    let formData = new FormData();
    formData.append(`artist[hidden]`, true);
    fetch(APIRoutes.artists.update(artist_id), {
      method: 'PUT',
      body: formData,
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((data) => {
      window.location = `/artists`
    }).catch((data) => {
      console.error(data);
    });
  }

  unHideArtist = (artist_id) => {
    let formData = new FormData();
    formData.append(`artist[hidden]`, false);
    fetch(APIRoutes.artists.update(artist_id), {
      method: 'PUT',
      body: formData,
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((data) => {
      window.location = `/artists`
    }).catch((data) => {
      console.error(data);
    });
  }

  toggleHideArtist = (artist) => {
    if (artist.hidden) {
      this.unHideArtist(artist.id);
    }
    else {
      this.hideArtist(artist.id);
    }
  }

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
    const { userType } = this.props;
    
    return (
      <div className="pt4">
        {isLoading ? <LoadingOverlay itemType="artists" fullPage={true} /> : null}
        <div className="fl w-20 pa3 mt5" role="search">
          <Filters
            ref={(node) => { this.filters = node }}
            filters={filters}
            color="denim"
          />
          <button onClick={this.getFilteredArtists} className="button-primary bg-denim w-100"> Apply </button>
        </div>
        <div className="fl w-80 pb5">
          <div className="flex justify-between items-baseline">
            <h1>Artists</h1>
            <nav className="li-denim pagination" role="navigation" aria-label="Pagination Navigation">
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
                return (
                  <ArtistColumnPanel key={i} artist={artist} userType={userType}>
                    {userType == "admin" &&
                    <Button type="hover-button" onClick={() => this.toggleHideArtist(artist)}>
                      <FontAwesomeIcon className="white" icon={artist.hidden ? faEye : faEyeSlash} />
                      <h4 className="ml2 white">{artist.hidden ? "Unhide" : "Hide"}</h4>
                    </Button>
                    }
                  </ArtistColumnPanel>
                )
              })}
            </div>
          </div>
        </div>
    );
  }
}

export default AllArtists;
