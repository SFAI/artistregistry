import PropTypes from "prop-types";
import React from "react";


class DetailedWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      work: this.props.work,
      request: {
        message: "",
        types: 0
      },
      request_types: {},
      componentDidMount: false
    }
  }

  componentDidMount = () => {
    const requests_types_route = APIRoutes.requests.types;
    Requester.get(requests_types_route).then((response) => {
      this.setState({ request_types: response, componentDidMount: true });
    }, (error) => {
      console.error(error);
    });
  }

  handleChange = event => {
    const request = this.state.request;
    const name = event.target.name;
    const value = event.target.value;
    request[name] = value;
    this.setState({ request: request });
  }

  handleSubmit = () => {
    const requests_route = APIRoutes.requests.create;
    let payload = this.state.request;
    payload["buyer_id"] = this.props.buyer.id;
    payload["artist_id"] = this.state.work.artist_id;
    payload["work_id"] = this.state.work.id;
    Requester.post(requests_route, payload).then(
      response => {
        window.location.href = '/works/' + this.props.work.id
      },
      error => {
        console.error(error);
      }
    );
  }

  render() {
    if (!this.state.componentDidMount) {
      return (
        <div><h5>Loading</h5></div>
      );
    }
    return (
      <div>
        <h2>{this.state.work.title}</h2>
        <h5>Request Type</h5>
        <select
          name="types"
          value={this.state.request.type}
          onChange={this.handleChange}
        >
          {
            Object.keys(this.state.request_types).map((obj, i) => {
              return <option key={i}>{obj}</option>
            })
          }
        </select>
        <h5>Message</h5>
        <textarea
          type="TEXT"
          name="message"
          value={this.state.request.comment}
          onChange={this.handleChange}
          rows={4}
        />
        <button onClick={this.handleSubmit} className="button-primary bg-indigo w4 mt2">
          Submit
        </button>
      </div>
    );
  }
}

export default DetailedWork;
