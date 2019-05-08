import PropTypes from "prop-types";
import React from "react";
import LoadingOverlay from "../helpers/LoadingOverlay";
import None from "../helpers/None";
import Inquiry from "./Inquiry";

class Commissions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commissions: [],
      componentDidMount: false,
    };
  }

  componentDidMount() {
    this.fetchCommissions();
    this.setState({ componentDidMount: true });
  }

  fetchCommissions() {
    const route = APIRoutes.artists.commissions(this.props.artist.id);
    Requester.get(route).then(
      response => {
        response = response.filter(commission => !commission.deleted);
        this.setState({ commissions: response });
      },
      error => {
        console.error(error);
      }
    );
  }

  render() {
    if (!this.state.componentDidMount) {
      return <LoadingOverlay fullPage={true} />;
    }
    if (!this.state.commissions.length) {
      return (
        <div className="mw7 center">
          <h1>Inquiries</h1>
          <div className="bg-white pa2">
            <None itemType="inquiries" />
          </div>
        </div>
      );
    }
    return (
      <div className="mw7 center">
        <h1>Inquiries</h1>
        {this.state.commissions.map((commission, i) => {
          return (
            <Inquiry
              commission={commission}
              key={i}
              onChange={() => this.fetchCommissions()}
            />
          );
        })}
      </div>
    );
  }
}

export default Commissions;
