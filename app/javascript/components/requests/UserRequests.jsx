import PropTypes from "prop-types";
import React from "react";
import Request from "./Request";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

class UserRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inbox: [],
      display: [],
      state: 0,
      componentDidMount: false,
    };
    this.toggleState = ["Requests", "Pending", "Complete", "Archive"];
  }

  renderToggle() {
    return this.toggleState.map((state, i) => {
      let active = i === this.state.state;
      return (
        <div key={i} onClick={() => this.display(i)} className={(active ? "bg-ochre" : "toggle-hover") + " pa3 mt2 toggle"}>
          <h3 className={active ? "white" : "charcoal"}>{state}</h3>
          <FontAwesomeIcon className={(active ? "white" : "charcoal") + " ml2"} icon={faAngleDoubleRight}/>
        </div>
      );
    });
  }

  display = (i) => {
    let display = []
    switch(this.toggleState[parseInt(i)]) {
      case "Requests":
        this.state.inbox.map((request, i) => {
          display.push(i);
        });
        break;
      case "Pending":
        this.state.inbox.map((request, i) => {
          if (request.open) {
            display.push(i);
          }
        });
        break;
      case "Complete":
        this.state.inbox.slice().map((request, i) => {
          if (!request.open && request.receipt) {
            display.push(i);
          }
        });
        break;
      case "Archive":
        this.state.inbox.slice().map((request, i) => {
          if (!request.open && !request.receipt) {
            display.push(i);
          }
        });
        break;
    }
    this.setState({ state: i, display: display });
  }

  componentDidMount = () => {
    this.fetchInboxData();
    this.setState({ componentDidMount: true });
  };

  fetchInboxData = () => {
    this.setState({ inbox: [], display: [] }, () => {
      let requests_route = '';
      if (this.props.artist) {
        const artist_id = this.props.artist.id;
        requests_route = APIRoutes.artists.requests(artist_id);
      }
      if (this.props.buyer) {
        const buyer_id = this.props.buyer.id;
        requests_route = APIRoutes.buyers.requests(buyer_id);
      }
      Requester.get(requests_route).then(
        response => {
          this.setState({ inbox: response, display: [...Array(response.length).keys()] });
        },
        error => {
          console.error(error);
        }
      );
    });
  }

  render() {
    if (!this.state.componentDidMount) {
      return (
        <div><h2>Loading</h2></div>
      );
    }
    return (
      <div className="mw9 center">
        <div className="w-20 fl pr3 mt6">
          {this.renderToggle()}
        </div>
        <div className="w-80 fl mt2">
          <h1>Requests</h1>
          {this.state.display.map((i) => (
            <Request
              request={this.state.inbox[i]}
              artist={this.props.artist}
              buyer={this.props.buyer}
              onChange={() => this.fetchInboxData()}
              key={i}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default UserRequests;
