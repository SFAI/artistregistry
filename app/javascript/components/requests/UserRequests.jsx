import PropTypes from "prop-types";
import React from "react";
import Request from "./Request";
import Receipt from "./Receipt";
import None from "../helpers/None";
import classNames from "classnames";
import LoadingOverlay from "../helpers/LoadingOverlay";

class UserRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inbox: [],
      display: [],
      state: 0,
      componentDidMount: false,
    };
    this.toggleState = this.props.artist
      ? ["All Requests", "Pending", "Complete", "Archive"]
      : ["All Requests", "Pending", "Complete"];
  }

  renderToggle() {
    return this.toggleState.map((state, i) => {
      let active = i === this.state.state;
      return (
        <button
          key={i}
          onClick={() => this.display(i)}
          className={classNames(
            "button-div w-100 flex item-center pointer ph2 pv3 mb2",
            active ? "bg-moss" : "bg-inherit hover-bg-black-10"
          )}
          tabIndex="0"
        >
          <p className={classNames("strong", { white: active })}>{state} »</p>
        </button>
      );
    });
  }

  isReceipt(request) {
    return !request.open && request.receipt;
  }

  display = i => {
    let display = [];
    switch (this.toggleState[parseInt(i)]) {
      case "All Requests":
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
          if (this.isReceipt(request)) {
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
  };

  componentDidMount = () => {
    this.fetchInboxData();
    this.setState({ componentDidMount: true });
  };

  fetchInboxData = () => {
    this.setState({ inbox: [], display: [] }, () => {
      let requests_route = "";
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
          response = response.filter(request => !request.deleted);
          this.setState({
            inbox: response,
            display: [...Array(response.length).keys()],
          });
        },
        error => {
          console.error(error);
        }
      );
    });
  };

  renderRequests() {
    if (!this.state.display.length) {
      return (
        <div className="bg-white pa2">
          <None itemType="requests" />
        </div>
      );
    }
    return this.state.display.map(i => {
      if (this.isReceipt(this.state.inbox[i])) {
        return (
          <Receipt
            request={this.state.inbox[i]}
            artist={this.props.artist}
            buyer={this.props.buyer}
            onChange={() => this.fetchInboxData()}
            key={i}
          />
        );
      }
      return (
        <Request
          request={this.state.inbox[i]}
          artist={this.props.artist}
          buyer={this.props.buyer}
          onChange={() => this.fetchInboxData()}
          key={i}
        />
      );
    });
  }

  render() {
    if (!this.state.componentDidMount) {
      return <LoadingOverlay fullPage={true} />;
    }
    return (
      <div className="mw8 center">
        <div className="w-20 fl pr4 mt6">{this.renderToggle()}</div>
        <div className="w-80 fl mt2">
          <h1>Requests</h1>
          {this.renderRequests()}
        </div>
      </div>
    );
  }
}

export default UserRequests;
