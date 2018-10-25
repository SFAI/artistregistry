import PropTypes from "prop-types";
import React from "react";
import Filters from "components/Filters";

class Works extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      searchParams: ""
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

  handleFilters = newSearchParams => {
    this.setState({
      searchParams: newSearchParams
    });
  };

  testFilteredWorksRoute = () => {
    if (this.state.searchParams === "") return;
    const works_route = APIRoutes.works.filtered_works(this.state.searchParams);

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

  // todo: artist_id => Artist.name
  render() {
    return (
      <div className="ma4">
        <div className="flex bg-grey">
          <Filters onFiltersChange={this.handleFilters} />
          <div>
            {this.state.works.map(work => {
              return (
                <div className="ba mb2 pa2" key={work.id}>
                  <h3>{work.title}</h3>
                  <p>{work.work_type}</p>
                  <p>{work.media}</p>
                  <p>{work.artist_name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <button onClick={this.testFilteredWorksRoute}> Test </button>
      </div>
    );
  }
}

export default Works;
