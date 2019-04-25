import PropTypes from "prop-types";
import React from "react";
import Panel from "../helpers/Panel";
import FormError from "../helpers/FormError";
import LoadingOverlay from "../helpers/LoadingOverlay";

class CommissionsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commissions_types: {},
      commission: {
        comment: "",
        types: 0
      },
      errors: {
        comment: "",
        commission_type: "",
      },
      updatingCommission: false,
      componentDidMount: false
    }
  }

  componentDidMount = () => {
    const commissions_types_route = APIRoutes.commissions.types;
    Requester.get(commissions_types_route).then((response) => {
      this.setState({ commissions_types: response, componentDidMount: true });
    }, (error) => {
      console.error(error);
    });
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
      this.setState({ updatingCommission: true })
      const artist_id = this.props.artist.id;
      const buyer_id = this.props.buyer.id;
      const commissions_route = APIRoutes.commissions.create;

      let payload = this.state.commission;
      payload["buyer_id"] = buyer_id;
      payload["artist_id"] = artist_id;

      Requester.post(commissions_route, payload).then(
        response => {
          window.location.href = '/artists/' + this.props.artist.id
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  handleChange = event => {
    const commission = this.state.commission;
    const name = event.target.name;
    const value = event.target.value;
    commission[name] = value;
    this.setState({ commission: commission });
  }

  checkErrors = () => {
    let errors = {
      comment: "",
      commission_type: "",
    }
    if (!this.state.commission.comment) {
      errors["comment"] = "This field cannot be empty.";
    }
    return errors;
  }

  render() {
    if (!this.state.componentDidMount) {
      return (
        <div><p>Loading</p></div>
      );
    }
    if (!this.props.buyer) {
      return (
        <Panel
        color="denim"
        title="Contact the Artist"
        >
          <div className="pa3">
            <p className="mb4">Log in to your account to contact artists.</p>
            <a className="pointer denim mb1" href="../artists/sign_in">Log in (Artist) »</a>
            <a className="pointer denim" href="../buyers/sign_in">Log in (Patron) »</a>
          </div>
        </Panel>
      );
    }
    return (
      <Panel
        color="denim"
        title="Contact the Artist"
      >
        {this.state.updatingCommission ? <LoadingOverlay /> : null}
        <h5>Inquiry Type</h5>
        <FormError error={this.state.errors["commission_type"]}/>
        <select
          name="types"
          value={this.state.commission.types}
          onChange={this.handleChange}
          className="w-100 select mt2 ttc"
        >
          {  Object.keys(this.state.commissions_types).map((obj, i) => { return <option key={i}>{obj}</option> }) }
        </select>
        <h5 className="mt2">Message</h5>
        <FormError error={this.state.errors["comment"]}/>
        <textarea
          type="TEXT"
          name="comment"
          id="comment"
          value={this.state.commission.comment}
          onChange={this.handleChange}
          rows={4}
          className="w-100 mt2 textarea"
        />
        <button onClick={this.handleSubmit} className="button-primary bg-denim w4 mt2">
          Submit
        </button>
      </Panel>
    );
  }
}

export default CommissionsForm;
