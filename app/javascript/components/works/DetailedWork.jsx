import PropTypes from "prop-types";
import React from "react";
import RequestForm from '../requests/RequestForm';
import WorkToggle from "./WorkToggle";
import ArtistSnapshot from "../artists/ArtistSnapshot";
import Linkify from 'react-linkify';

class DetailedWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      work: null,
      componentDidMount: false
    };
  }

  componentDidMount() {
    const route = APIRoutes.works.show(this.props.work_id);
    Requester.get(route).then(
      response => {
        this.setState({ work: response, componentDidMount: true });
      },
      error => {
        console.error(error);
      }
    );
  }

  render() {
    if (!this.state.componentDidMount) {
      return (
        <div />
      );
    }

    const { artist, artist_id, id, availability, title, media, material, description } = this.state.work
    return (
      <div className="pt4">
        <div className="fl w-70">
          <WorkToggle work={this.state.work} />
        </div>
        <div className="fl w-30 pl3">
          <div className="bg-white overflow-hidden">
            <ArtistSnapshot artist={artist} />
          </div>
          <div className="bg-white pa3 mv3">
            <h2>{title}</h2>
            <h4>Media</h4>
            <p className="mb2">{media}</p>
            <h4>Material</h4>
            <p className="mb2">{material}</p>
            <h4>Description</h4>
            <p className="mb2"><Linkify properties={{target: '_blank', rel: "nofollow   noopener"}}> {description} </Linkify></p>
          </div>
          <RequestForm
            buyer={this.props.buyer}
            artist_id={artist_id}
            work_id={id}
            work_status={availability}
          />
        </div>
      </div>
    );
  }
}

export default DetailedWork;
