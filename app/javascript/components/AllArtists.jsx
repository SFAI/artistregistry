import PropTypes from "prop-types";
import React from "react";
import ArtistRow from './ArtistRow.jsx';

class AllArtists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: null,
      componentDidMount: false
    }
  }

  componentDidMount() {
    const route = APIRoutes.artists.allArtists;
    Requester.get(route, (response) => {
      console.log(response);
      this.setState({
        artists: response,
        componentDidMount: true
      })
    }, (error) => {
      console.error(error);
    });
  }

  renderArtistRows() {
    return this.state.artists.map((artist, i) => {
      return (
        <ArtistRow
          name={artist.name}
          key={i}
          id={artist.id}
        />
      );
    });
  }

  render() {
    if (this.state.componentDidMount) {
      return (
        <div className="all-artists-page">
          <table className="artists-table">
            <tbody className="all-artists-container">
              {this.renderArtistRows()}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div>
          <h1>fml</h1>
        </div>
      );
    }
  }
}
export default AllArtists;
