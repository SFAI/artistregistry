import PropTypes from "prop-types";
import React from "react";
import Filters from "components/Filters";

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
        this.setState({ works: response });
      },
      response => {
        console.err(response);
      }
    );
  };

  render() {
    return (
      <div className="flex bg-grey ma4">
        <Filters />
        <div>
          {this.state.works.map(work => {
            return (
              <div className="ba mb2 pa2" key={work.id}>
                <h3>{work.title}</h3>
                <p>{work.work_type}</p>
                <p>{work.media}</p>
                <p>{work.artist_id}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Works;
