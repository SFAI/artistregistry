import PropTypes from "prop-types";
import React from "react";
import FormError from '../helpers/FormError';
import WorkFixedPanel from "../works/WorkFixedPanel";
import Button from "../helpers/Button";
import LoadingOverlay from "../helpers/LoadingOverlay";

/**
* @prop artist: artist to flag
* @prop user: buyer associated with flag
* @prop work: work to flag
*/

class FlagForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flaggingWork: false,
      errors: {
        text: '',
      },
      text: ""
    }
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ text: value });
  }

  checkErrors() {
    let errors = {
      text: ""
    };
    if (!this.state.text) {
      errors["text"] = "Please explain why you're flagging this work.";
    }
    return errors;
  }


  handleSubmit = (event) => {
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
      this.setState({ flaggingWork: true });

      let formData = new FormData();
      formData.append(`text`, this.state.text);

      let user = this.props.user
      for (var key in user) {
        formData.append(`user[`+key+`]`, user[key])
      }
      fetch(APIRoutes.works.flag(this.props.work.id), {
        method: 'PUT',
        body: formData,
        credentials: 'same-origin',
        headers: {
          "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
        }
      }).then((data) => {
        window.location = `/works/` + this.props.work.id;
      }).catch((data) => {
        console.error(data);
      });
    } 
  }

  render() {
    return (
      <div className="w-100">
        {this.state.flaggingWork ? <LoadingOverlay /> : null}
        <div className="fl w-30">
          <WorkFixedPanel work={this.props.work}/>
        </div>
        <div className="fl w-70 pl3">
          <h5>Tell us why this work should be flagged.</h5>
          <textarea
            type="TEXT"
            name="comment"
            id="comment"
            rows={4}
            value={this.state.text}
            onChange={this.handleChange}
            className="textarea"
          />
          <FormError error={this.state.errors["text"]}/>
          <Button type="button-primary" className="w4" color="moss" onClick={this.handleSubmit}>
            Flag
          </Button>
        </div>
      </div>
    );
  }
}

export default FlagForm;
