import PropTypes from "prop-types";
import React from "react";
import Panel from '../helpers/Panel';
import FormError from '../helpers/FormError';

class RequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      available: this.props.work_status === "active" ? true : false,
      request: {
        message: "",
        types: 0
      },
      request_types: {},
      errors: {
        message: "",
        login: ""
      },
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
    let errors = this.checkErrors();

    let hasErrors = false;
    Object.keys(errors).forEach((key) => {
      if (errors[key]) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      this.setState({ errors: errors });
    } else {
      const requests_route = APIRoutes.requests.create;
      let payload = this.state.request;
      payload["buyer_id"] = this.props.buyer.id;
      payload["artist_id"] = this.props.artist_id;
      payload["work_id"] = this.props.work_id;
      Requester.post(requests_route, payload).then(
        response => {
          window.location.href = '/works/' + this.props.work_id
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  checkErrors() {
    let errors = {
      message: "",
      login: ""
    }

    if (!this.state.request.message) {
      errors["message"] = "This field cannot be empty."
    }
    if (!this.props.buyer) {
      errors["login"] = "You must be logged in to request a work."
    }

    return errors;
  }

  render() {
    if (!this.state.componentDidMount) {
      return (
        <div><h5>Loading</h5></div>
      );
    }
    if (!this.state.available) {
      return (
        <div className="mw6">
          <Panel
            color="magenta"
            title="Request Artwork"
          >
            <div className="pa3">
              <h2 className="magenta">Sorry!</h2>
              <h6>This work has been {this.props.work_status}.</h6>
            </div>
          </Panel>
        </div>
      );
    }
    return (
      <div className="mw6">
        <Panel
          color="magenta"
          title="Request Artwork"
        >
          <h5>Request Type</h5>
          <select
            name="types"
            value={this.state.request.type}
            onChange={this.handleChange}
            className="input-dropdown"
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
            className="textarea"
          />
          <FormError error={this.state.errors["message"]}/>
          <FormError error={this.state.errors["login"]}/>
          <button onClick={this.handleSubmit} className="button-primary bg-magenta w4 mt2">
            Submit
          </button>
        </Panel>
      </div>
    );
  }
}

export default RequestForm;
