import PropTypes from "prop-types";
import React from "react";
import RequestForm from '../requests/RequestForm';
import StyledModal from "../helpers/StyledModal";
import FlagForm from "../works/FlagForm";
import WorkToggle from "./WorkToggle";
import ArtistSnapshot from "../artists/ArtistSnapshot";
import Linkify from 'react-linkify';
import Button from "../helpers/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Unauthorized from "../helpers/Unauthorized";
import { faEdit, faFlag } from "@fortawesome/free-solid-svg-icons";

class DetailedWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      work: null,
      canEditArtwork: false,
      componentDidMount: false
    };
  }

  componentDidMount() {
    const route = APIRoutes.works.show(this.props.work_id);
    Requester.get(route).then(
      response => {
        this.setState({
          work: response,
          canEditArtwork: this.props.user_type === "artist" && this.props.user && this.props.user.id === this.props.work.artist_id,
          componentDidMount: true
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  updateWork = (work_id) => {
    window.location = `/works/${work_id}/edit`;
  }

  render() {
    const { artist_prop, buyer, blocked, work, user, user_type } = this.props;
    if ((artist_prop.hidden || work.hidden) && (user == null || (user.account_id != artist_prop.account_id && user_type != "admin"))) {
      return (
        <Unauthorized/>
      )
    }
    if (!this.state.componentDidMount) {
      return (
        <div />
      );
    }

    const { artist, artist_id, id, availability, links, title, media, material, description } = this.state.work
    return (
      <div className="pt4">
        <div className="fl w-70">
          <WorkToggle work={this.state.work} />
        </div>
        <div className="fl w-30 pl3">
          <div className="bg-white overflow-hidden">
            <ArtistSnapshot artist={artist} color="berry"/>
          </div>
          <div className="bg-white pa3 mv3 relative">
            <h2>{title}</h2>
            {
              this.state.canEditArtwork &&
              <Button className="ma2 absolute top-0 right-0" type="hover-button" onClick={() => this.updateWork(this.state.work.id)}>
                <FontAwesomeIcon className="white" icon={faEdit} />
                <h4 className="ml2 white">Edit</h4>
              </Button>
            }
            <h4>Media</h4>
            <p className="mb2">{media}</p>
            <h4>Material</h4>
            <p className="mb2">{material}</p>
            {
              links &&
              <div>
                <h4>Links</h4>
                <p className="mb2"><Linkify properties={{target: '_blank', rel: "nofollow   noopener"}}> {links} </Linkify></p>
              </div>
            }
            <h4>Description</h4>
            <div className="pr2 artwork-description overflow-y-auto">
              <p className="mb2 pre"><Linkify properties={{target: '_blank', rel: "nofollow   noopener"}}> {description} </Linkify></p>
            </div>
          </div>
          {!blocked && user_type !== "artist" &&
            <RequestForm
              buyer={buyer}
              artistId={artist_id}
              workId={id}
              workStatus={availability}
            />
          }
          {(user !== null) && 
          <div className="flex mt3 items-center justify-between">
            <p className="pl3 gray">Violating our Terms of Use?</p>
            <StyledModal
              title="Flag"
              buttonType="button-tertiary"
              color="berry"
            >
              <FlagForm
                artist={artist_prop}
                user={user}
                work={this.state.work}
              />
            </StyledModal>
          </div>
          }
        </div>
      </div>
    );
  }
}

export default DetailedWork;
