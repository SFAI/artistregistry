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
          console.err(response);
        }
      );
  };

  render() {
    const { filters, works } = this.state;

    return (
      <div className="mh4">
        <div className="pt4 flex bg-grey">
          <Filters
            ref={(node) => { this.filters = node }}
            filters={filters}
          />
          <div>
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
        <button onClick={this.getFilteredWorks}> Apply </button>
      </div>
    );
  }
}

export default Works;
