import PropTypes from "prop-types";
import React from "react";
import Filters from "components/Filters";

class Works extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      filters: {}
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
        filters: filters_response
      });
    });
  };

  getFilteredWorks = () => {
    // NOTE: Can't pass empty searchParams string to filtered_works
    // Possible fix by editing routes.fb, but not sure how -B.Y.
    const searchParams = this.filters.getQuery();

    const works_route = searchParams.length
      ? APIRoutes.works.filtered_works(searchParams)
      : APIRoutes.works.index;

    Requester.get(
      works_route).then(
        response => {
          this.setState({ works: response });
        },
        response => {
          console.error(response);
        }
      );
  };

  render() {
    const { filters, works } = this.state;

    return (
      <div className="mw9 center">
        <div className="fl w-20 pa3 mt5">
          <Filters
            ref={(node) => { this.filters = node }}
            filters={filters}
          />
          <button onClick={this.getFilteredWorks} className="button-secondary outline-magenta color-magenta"> Apply </button>
        </div>
        <div className="fl w-80">
          <h1>Artwork</h1>
          {works.map(work => {
            return (
              <div className="ba mb2 pa2" key={work.id}>
                <h3>{work.title}</h3>
                <p>{work.material}</p>
                <p>{work.medium}</p>
                <p>{work.artist_name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Works;
