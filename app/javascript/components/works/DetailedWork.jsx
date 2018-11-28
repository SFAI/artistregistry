import PropTypes from "prop-types";
import React from "react";
import RequestForm from '../requests/RequestForm';
import WorkToggle from "./WorkToggle";

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
    return (
      <div className="mw9 center pt4">
        <div className="fl w-60">
          <WorkToggle work={this.state.work}/>
        </div>
        <div className="fl w-40 pl3">
          <RequestForm
            buyer={this.props.buyer}
            artist_id={this.state.work.artist_id}
            work_id={this.state.work.id}
            work_status={this.state.work.availability}
          />
          <h2>{this.state.work.title}</h2>
        </div>
      </div>
    );
  }
}

export default DetailedWork;
