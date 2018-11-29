import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
import Touchable from 'rc-touchable';
import CommissionsForm from "../commissions/CommissionsForm";
import StyledModal from "../helpers/StyledModal";
import WorkColumnPanel from "../works/WorkColumnPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../helpers/Button";

/**
* @prop user: user currently logged in
* @prop userType: { "artist", "buyer" }
* @prop artist: artist associated with works
*/
class ArtistProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      artist: [],
      activeFilter: 'All works',
      canEditProfile: false,
      componentDidMount: false,
    }
  }

  componentDidMount = () => {
    const { user, userType, artist } = this.props;
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
        canEditProfile: userType === "artist" && user.id === artist.id,
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
    const { componentDidMount, activeFilter, artist, works, canEditProfile } = this.state;
    const { name, program, media, description } = artist;

    if (!componentDidMount) {
      return (
        <div>
          <p>Loading</p>
        </div>
      );
    }

    const featured_work = works.find(work => work.id === artist.featured_work_id);
    return (
      <div>
        <h1> {name} </h1>
        <div className="row-bio flex">
          <div className="w-20-l flex flex-column pa3 w5 bg-white">
            <div className="h4 w4 br-100 mb4 bg-gray self-center">
              <img src={artist.avatar.url} />
            </div>
            <button onClick={() => { window.location = `/artists/${this.props.artist.id}/update` }}>Edit Profile</button>
            <div className="info">
              <h5 className="ttu">Program</h5>
              <p className="ttc"> {program.replace(/_/g, ' ').replace(/(and)/, '+')} </p>
              <h5 className="ttu">Media</h5>
              <p> {media} </p>
            </div>
            <div className="mt-auto self-center">
              <button className="button-primary bg-indigo ph4">contact</button>
            </div>
          </div>
          <div className="w-50-l mw-400 flex relative mh3">
            <img className="fit-cover h-100" src={featured_work.featured_image.url} />
          </div>
          <div className="w-30-l mw-400 pa3 bg-white">
            <h2>About the artist</h2>
            <p> {description}</p>
          </div>
        </div>
        <div className="mt5 mb3">
          {['All works', 'Available', 'Sold/Rented'].map(filter => (
            <button
              onClick={() => this.setState({ activeFilter: filter })} key={filter}
              className={classNames("button b--none f6 mr3 w4", activeFilter == filter ? "bg-indigo white" : "bg-white indigo")}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap">
          <div className="col-list-4">
            {works.map(work => {
              return (
                <WorkColumnPanel work={work}>
                  {canEditProfile &&
                    <div className="work-action-wrapper mb2">
                      <Button type="hover-button" onClick={() => this.updateWork(work.id)}>
                        <FontAwesomeIcon className="white" icon={faEdit} />
                        <h4 className="ml2 white">Edit</h4>
                      </Button>
                      <Button className="ml2" type="hover-button" onClick={() => this.deleteWork(work.id)}>
                        <FontAwesomeIcon className="white" icon={faTrash} />
                        <h4 className="ml2 white">Delete</h4>
                      </Button>
                    </div>
                  }
                </WorkColumnPanel>
              )
            })}
          </div>
        </div>
        {canEditProfile &&
          <button onClick={this.createNewWork}>
            New Work
          </button>}
        <div className="flex flex-row items-stretch mb4 mt4">
          <div className="w-50 pr2 dib flex flex-row items-stretch">
            <div className="bg-charcoal pa3">
              <h2 className="white">Guidelines for contacting artists</h2>
              <p className="white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum dolor sit amet consectetur adipiscing elit duis tristique.<br /><br />Tortor dignissim convallis aenean et tortor at risus viverra adipiscing. Est ante in nibh mauris cursus mattis molestie a. Sed enim ut sem viverra aliquet eget. Id semper risus in hendrerit gravida rutrum quisque non tellus.<br /><br />Elit pellentesque habitant morbi tristique senectus et netus et malesuada. Commodo elit at imperdiet dui accumsan sit amet. Tellus elementum sagittis vitae et leo duis ut diam. Eget arcu dictum varius duis at. Donec massa sapien faucibus et molestie ac feugiat sed lectus. Risus pretium quam vulputate dignissim suspendisse in est ante.
              </p>
            </div>
          </div>
          <div className="w-50 pl2 dib flex flex-row items-stretch">
            <CommissionsForm
              buyer={this.props.user}
              artist={this.props.artist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ArtistProfile;
