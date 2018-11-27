import PropTypes from "prop-types";
import React from "react";
import Filters from "./Filters";
import Touchable from 'rc-touchable';

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
  
  navigateToWork = (id) => {
    window.location = `/works/${id}`;
  }

  render() {
    const { filters, works } = this.state;

    return (
      <div className="mw9 center pt4">
        <div className="fl w-20 pa3 mt5">
          <Filters
            ref={(node) => { this.filters = node }}
            filters={filters}
          />
          <button onClick={this.getFilteredWorks} className="button-primary bg-magenta w-100"> Apply </button>
        </div>
        <div className="fl w-80 pb5">
          <h1>Artwork</h1>
          <div className="col-list">
          {works.map(work => {
            return (
              <Touchable key={work.id} onPress={() => this.navigateToWork(work.id)}>
                <div className="mb3 pa3 w-100 work-item bg-white pointer" key={work.id}>
                  {work.featured_image && <img src={work.featured_image.url} className="mb3"/>}
                  <h3>{work.title}</h3>
                  <h6>{work.artist_name}</h6>
                  <h6 className="work-material">{work.material}</h6>
                </div>
              </Touchable>
            );
          })}
          </div>
        </div>
      </div>
    );
  }
}

export default Works;
