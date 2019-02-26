import PropTypes from "prop-types";
import React from "react";
import Filters from "./Filters";
import LoadingOverlay from "../helpers/LoadingOverlay";
import WorkColumnPanel from "./WorkColumnPanel";

class Works extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      filters: {},
      isLoading: true
    };
  }

  componentDidMount = () => {
    const works_route = APIRoutes.works.index;
    const categories_route = APIRoutes.works.categories;
    Promise.all([
      Requester.get(works_route),
      Requester.get(categories_route)
    ]).then(response => {
      const [works_response, filters_response] = response;
      this.setState({
        works: works_response,
        filters: filters_response,
        isLoading: false
      });
    });
  };

  getFilteredWorks = () => {
    // NOTE: Can't pass empty searchParams string to filtered_works
    // Possible fix by editing routes.fb, but not sure how -B.Y.
    const searchParams = this.filters.getQuery();
    this.setState({ isLoading: true });

    const works_route = searchParams.length
      ? APIRoutes.works.filtered_works(searchParams)
      : APIRoutes.works.index;

    Requester.get(
      works_route).then(
        response => {
          this.setState({
            works: response,
            isLoading: false
          });
        },
        response => {
          console.error(response);
        }
      );
  };

  render() {
    const { filters, works } = this.state;
    return (
      <div className="pt4">
        {this.state.isLoading ? <LoadingOverlay itemType="artwork" fullPage={true} /> : null}
        <div className="fl w-20 pa3 mt5">
          <Filters
            ref={(node) => { this.filters = node }}
            filters={filters}
          />
          <button onClick={this.getFilteredWorks} className="button-primary bg-magenta w-100"> Apply </button>
        </div>
        <div className="fl w-80 pb5">
          <h1>Artwork</h1>
          <div className="col-list-3">
            {works.map((work, i) => {
              return (
                <WorkColumnPanel key={i} work={work} />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Works;
