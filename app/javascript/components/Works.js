import PropTypes from "prop-types";
import React from "react";

class Works extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: []
    };
  }

  componentDidMount = () => {
    const works_route = APIRoutes.works.index;
    Requester.get(
      works_route,
      response => {
        console.log(response);
        this.setState({ works: response });
      },
      response => {
        console.err(response);
      }
    );
  };

  render() {
    return (
      <div>
        These are all the works
        {this.state.works.map(work => (
          <div key={work.id}>
            <h3>{work.title}</h3>
            <p>{work.work_type}</p>
            <p>{work.media}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Works;
