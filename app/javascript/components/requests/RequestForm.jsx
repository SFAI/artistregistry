import PropTypes from "prop-types";
import React from "react";
import Panel from "../helpers/Panel";
import FormError from "../helpers/FormError";
import LoadingOverlay from "../helpers/LoadingOverlay";

/**
 * @prop buyer: Logged-in buyer account information
 * @prop artistId: Artist ID related to the work for this form
 * @prop workId: Work ID related to this form
 * @prop workStatus: {sold, rented, available}
 */

class RequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      available: this.props.workStatus === "active" ? true : false,
      request: {
        message: "",
        types: "sale",
      },
      request_types: {},
      errors: {
        message: "",
        exist: "",
      },
      exist: false,
      updatingRequest: false,
      componentDidMount: false,
    };
  }

  static propTypes = {
    buyer: PropTypes.object,
    artistId: PropTypes.number.isRequired,
    workId: PropTypes.number.isRequired,
    workStatus: PropTypes.string.isRequired,
  };

  componentDidMount = () => {
    this.checkExist("sale");
    const requests_types_route = APIRoutes.requests.types;
    Requester.get(requests_types_route).then(
      response => {
        this.setState({ request_types: response, componentDidMount: true });
      },
      error => {
        console.error(error);
      }
    );
  };

  handleChange = event => {
    const request = this.state.request;
    const name = event.target.name;
    const value = event.target.value;
    request[name] = value;
    this.setState({ request: request });
    if (event.target.name == "types") {
      this.checkExist(value);
    }
  };

  handleSubmit = () => {
    let errors = this.checkErrors();

    let hasErrors = false;
    Object.keys(errors).forEach(key => {
      if (errors[key]) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      this.setState({ errors: errors });
    } else {
      this.setState({ updatingRequest: true });
      const requests_route = APIRoutes.requests.create;
      let payload = this.state.request;
      payload["buyer_id"] = this.props.buyer.id;
      payload["artist_id"] = this.props.artistId;
      payload["work_id"] = this.props.workId;
      Requester.post(requests_route, payload).then(
        response => {
          window.location.href = "/works/" + this.props.workId;
        },
        error => {
          console.error(error);
        }
      );
    }
  };

  checkErrors() {
    let errors = {
      message: "",
      exist: "",
    };

    if (!this.state.request.message) {
      errors["message"] = "This field cannot be empty.";
    }
    if (this.state.exist) {
      errors["exist"] =
        "You have already made a request under this request type.";
    }
    return errors;
  }

  checkExist = request_type => {
    const { buyer, artistId, workId } = this.props;
    if (buyer == null) {
      return;
    } else {
      let stringifiedSearchParams = [
        `buyer_id=${buyer.id}`,
        `artist_id=${artistId}`,
        `work_id=${workId}`,
        `types=${request_type}`,
      ].join("&");

      let request_route = APIRoutes.requests.request_exist(
        stringifiedSearchParams
      );
      Requester.get(request_route).then(
        response => {
          if (response.length != 0) {
            this.setState({ exist: true });
          } else {
            this.setState({ exist: false });
          }
        },
        response => {
          console.error(response);
        }
      );
    }
  };

  render() {
    if (!this.state.componentDidMount) {
      return (
        <div>
          <h5>Loading</h5>
        </div>
      );
    }
    if (!this.state.available) {
      return (
        <div className="mw6">
          <Panel color="berry" title="Request Artwork">
            <div className="pa3">
              <h2 className="berry">Sorry!</h2>
              <h6>This work has been {this.props.workStatus}.</h6>
            </div>
          </Panel>
        </div>
      );
    }
    if (!this.props.buyer) {
      return (
        <div className="mw6">
          <Panel color="berry" title="Request Artwork">
            <div className="pa3">
              <p className="mb4"> Log in to your account to request artwork.</p>
              <a className="pointer berry" href="../buyers/sign_in">
                Log in (Patron) »
              </a>
            </div>
          </Panel>
        </div>
      );
    }
    return (
      <div className="w-100">
        <Panel color="berry" title="Request Artwork">
          {this.state.updatingRequest ? <LoadingOverlay /> : null}
          <h5>Request Type</h5>
          <select
            name="types"
            value={this.state.request.types}
            onChange={this.handleChange}
            className="input-dropdown ttc"
          >
            {Object.keys(this.state.request_types).map((obj, i) => {
              return <option key={i}>{obj}</option>;
            })}
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
          <FormError error={this.state.errors["message"]} />
          <FormError error={this.state.errors["exist"]} />
          <button
            onClick={this.handleSubmit}
            className="button-primary bg-berry w4 mt2"
          >
            Submit
          </button>
        </Panel>
      </div>
    );
  }
}

export default RequestForm;
