import PropTypes from "prop-types";
import React from "react";
import Filters from "./Filters";
import LoadingOverlay from "../helpers/LoadingOverlay";
import WorkColumnPanel from "./WorkColumnPanel";
import ReactPaginate from 'react-paginate'

const perPage = 6

class Works extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      filters: {},
      isLoading: true,
      pageCount: 0,
      workStartIndex: 0,
      workEndIndex: 0
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
        isLoading: false,
        pageCount: Math.ceil(works_response.length / perPage),
        workStartIndex: 0,
        workEndIndex: perPage
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
            isLoading: false,
            pageCount: Math.ceil(response.length / perPage)
          });
        },
        response => {
          console.error(response);
        }
      );
  };

  handlePageClick = data => {
    let selected = data.selected;
    this.setState({
      workStartIndex: selected * perPage,
      workEndIndex: (selected+1) * perPage
    })
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
          <div className="flex justify-between items-baseline">
            <h1>Artwork</h1>
            <nav className="li-magenta pagination" role="navigation" aria-label="Pagination Navigation">
              <ReactPaginate
              previousLabel={"\u00ab"}
              nextLabel="&raquo;"
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              activeClassName={'active'}
              disabledClassName={'hidden'}
              />
            </nav>
          </div>
          <div className="col-list-3">
            {works.slice(this.state.workStartIndex, this.state.workEndIndex).map((work, i) => {
              return (
                <WorkColumnPanel key={i} work={work} />
              );
            })}
          </div>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default Works;
