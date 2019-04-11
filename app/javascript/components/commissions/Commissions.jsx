import PropTypes from "prop-types";
import React from "react";
import LoadingOverlay from "../helpers/LoadingOverlay";
import Inquiry from "./Inquiry";

class Commissions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commissions: [],
      componentDidMount: false
    };
  }
  
  componentDidMount() {
    const route = APIRoutes.artists.commissions(this.props.artist.id);
    Requester.get(route).then(
      response => {
        this.setState({ commissions: response, componentDidMount: true });
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
    return (
      <div className="mw7 center">
        <h1>Inquiries</h1>
        {
          this.state.commissions.map((commission, i) => {
            return <Inquiry commission={commission} key={i} />
          })
        }
      </div>
    )
  }
}

export default Commissions;