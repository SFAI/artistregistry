import PropTypes from "prop-types";
import React from "react";
import WorkForm from "./WorkForm";
import LoadingOverlay from "../helpers/LoadingOverlay";
import Unauthorized from "../helpers/Unauthorized";

class UpdateWork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      work: null,
      componentDidMount: false,
      updatingWork: false,
    };
  }

  componentDidMount() {
    Requester.get(APIRoutes.works.show(this.props.work_id)).then(
      response => {
        response["featured_image"] = response.featured_image.name;
        this.setState({ work: response, componentDidMount: true });
      },
      error => {
        console.error(error);
      }
    );
  }

  render() {
    const { work_id, artist_account_id, current_user } = this.props;
    if (!current_user || current_user.account_id != artist_account_id) {
      return <Unauthorized />;
    }
    if (!this.state.componentDidMount) {
      return <LoadingOverlay fullPage={true} />;
    }
    return (
      <div className="mw6 center pt3">
        <h1>Update Work</h1>
        <WorkForm
          work={this.state.work}
          route={APIRoutes.works.update(work_id)}
          method="PUT"
        />
      </div>
    );
  }
}

export default UpdateWork;
