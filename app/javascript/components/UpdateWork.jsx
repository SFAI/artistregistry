import PropTypes from "prop-types"
import React from 'react';
import WorkForm from './WorkForm.jsx';

class UpdateWork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      work: null,
      componentDidMount: false
    }
  }

  componentDidMount() {
    Requester.get(APIRoutes.works.show(this.props.work_id)).then(
      (response) => {
        response["images"] = [];
        this.setState({ work: response, componentDidMount: true });
      },
      (error) => {
        console.error(error);
      }
    )
  }

  render() {
    console.log(this.state.work);
    if (!this.state.componentDidMount) {
      return (
        <div><h2>Loading</h2></div>
      );
    }
    return (
      <div className="mw8 center pt3">
        <WorkForm
          work={this.state.work}
          route={APIRoutes.works.update(this.props.work_id)}
          method="PUT" />
      </div>
    )
  }
}

export default UpdateWork;
