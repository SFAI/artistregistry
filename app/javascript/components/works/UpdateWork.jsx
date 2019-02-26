import PropTypes from "prop-types"
import React from 'react';
import WorkForm from './WorkForm.jsx';
import LodaingOverlay from '../helpers/LodaingOverlay.jsx'

class UpdateWork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      work: null,
      componentDidMount: false,
      updatingWork: false
    }
  }

  componentDidMount() {
    Requester.get(APIRoutes.works.show(this.props.work_id)).then(
      (response) => {
        response["featured_image"] = response.featured_image.name;
        this.setState({ work: response, componentDidMount: true });
      },
      (error) => {
        console.error(error);
      }
    )
  }

  render() {
    if (!this.state.componentDidMount) {
      return (
        <div><h2>Loading</h2></div>
      );
    }
    return (
      <div className="mw6 center pt3">
        <h1>Update Work</h1>
        <WorkForm
          work={this.state.work}
          route={APIRoutes.works.update(this.props.work_id)}
          method="PUT" />
      </div>
    )
  }
}

export default UpdateWork;
