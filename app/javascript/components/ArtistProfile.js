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

  updateWork = (work_id) => {
    window.location = `/works/${work_id}/edit`;
  }

  deleteWork = (work_id) => {
    fetch(APIRoutes.works.delete(work_id), {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((data) => {
      window.location = `/artists/` + this.props.artist.id;
    }).catch((data) => {
      console.error(data);
    });
  }

  render() {
    const { componentDidMount, activeFilter, artist } = this.state;
    const { name, program, genres, description } = artist;

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
              <img src={this.props.artist.pro_pic_url} />
            </div>
            <button onClick={()=>{window.location = `/artists/${this.props.artist.id}/update`}}>Edit Profile</button>
            <div className="info">
              <h5 className="uppercase">Education</h5>
              <p> {program} </p>
              <h5 className="uppercase">Genres</h5>
              <p> {genres} </p>
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
            <p> {description}</p>
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
                <img src={work.featured_image.url} width="250" height="200"/>
              </div>
              <p className="work-title mb1">{work.title}</p>
              <p className="work-medium mb1">{work.medium}</p>
              <p className="work-material">{work.material}</p>
              <div>
                <button onClick={() => {this.updateWork(work.id)}}>Edit Work</button>
                <button onClick={() => {this.deleteWork(work.id)}}>Delete Work</button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={this.createNewWork}>
          New Work
        </button>
        <div className="contact-wrapper mb4 mt4">
          <div className="w-50 pr2 dib contact">
            <div className="bg-charcoal pa3">
              <h2 className="white">Guidelines for contacting artists</h2>
              <p className="white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum dolor sit amet consectetur adipiscing elit duis tristique.<br/><br/>Tortor dignissim convallis aenean et tortor at risus viverra adipiscing. Est ante in nibh mauris cursus mattis molestie a. Sed enim ut sem viverra aliquet eget. Id semper risus in hendrerit gravida rutrum quisque non tellus.<br/><br/>Elit pellentesque habitant morbi tristique senectus et netus et malesuada. Commodo elit at imperdiet dui accumsan sit amet. Tellus elementum sagittis vitae et leo duis ut diam. Eget arcu dictum varius duis at. Donec massa sapien faucibus et molestie ac feugiat sed lectus. Risus pretium quam vulputate dignissim suspendisse in est ante.
              </p>
            </div>
          </div>
          <div className="w-50 pl2 dib contact">
            <CommissionsForm
              buyer={this.props.buyer}
              artist={this.props.artist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ArtistProfile;
