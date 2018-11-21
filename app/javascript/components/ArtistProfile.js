import PropTypes from "prop-types";
import React from "react";
import CommissionsForm from "components/CommissionsForm";


/**
* @prop buyer: buyer currently logged in
* @prop artist: artist associated with works
*/
class ArtistProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      artist: [],
      activeFilter: 'All works',
      componentDidMount: false
    }
  }

  componentDidMount = () => {
    const artist_id = this.props.artist.id;
    const works_route = APIRoutes.artists.works(artist_id);
    const artist_route = APIRoutes.artists.show(artist_id);
    Promise.all([
      Requester.get(works_route),
      Requester.get(artist_route)
    ]).then(response => {
      const [works_response, artist_response] = response;
      this.setState({
        works: works_response,
        artist: artist_response,
        componentDidMount: true
      });
    });
  }

  createNewWork = () => {
    window.location = `/works/new`;
  }


  render() {
    const { componentDidMount, activeFilter, artist } = this.state;
    const { name, program } = artist;

    if (!componentDidMount) {
      return (
        <div>
          <p>Loading</p>
        </div>
      );
    }

    return (
      <div>
        <h1> {name} </h1>
        <div className="row-bio flex">
          <div className="w-20-l flex flex-column pa3 w5 bg-white">
            <div className="h4 w4 br-100 mb4 bg-gray self-center">
              <img src="" />
            </div>
            <div className="info">
              <h5 className="uppercase">Education</h5>
              <p> {program} </p>
            </div>
            <div className="mt-auto self-center">
              <button className="bg-gray white button pv3 ph4 f5">contact</button>
            </div>
          </div>
          <div className="w-50-l mw-400 flex mh3">
            <img className="fit-cover h-100" src={"https://images.unsplash.com/photo-1542347369-65f48a3018c8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9dded3ad2cbb6ec3ccfe4a9c5f5c0715&auto=format&fit=crop&w=900&q=60"} />
          </div>
          <div className="w-30-l mw-400 pa3 bg-white">
            <h2>About the artist</h2>
            <p> Some words</p>
          </div>
        </div>
        <div className="mt5 mb3">
          {['All works', 'Available', 'Sold/Rented'].map(filter => {
            const className = activeFilter == filter
              ? "filter-button bg-gray white f6 mr3"
              : "filter-button bg-white gray f6 mr3";
            return <button onClick={() => this.setState({ activeFilter: filter })} key={filter} className={className}>{filter}</button>
          })}
        </div>
        <div className="flex">
          {this.state.works.map(work => (
            <div key={work.id} className="artwork pa3 mr3 bg-white">
              <div className="work-image bg-gray mb2" >
                <img src={""} />
              </div>
              <p className="work-title mb1">{work.title}</p>
              <p className="work-medium mb1">{work.medium}</p>
              <p className="work-material">{work.material}</p>
              {work.attached_images_urls.map((attachment) =>
                <img src={attachment} width="200" height="200" />
              )}
            </div>
          ))}
        </div>
        <CommissionsForm
          buyer={this.props.buyer}
          artist={this.props.artist}
        />
        <button onClick={this.createNewWork}>
          New Work
        </button>
      </div>
    );
  }
}

export default ArtistProfile;
