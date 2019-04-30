import PropTypes from "prop-types";
import React from "react";
import Filters from "./Filters";
import LoadingOverlay from "../helpers/LoadingOverlay";
import WorkColumnPanel from "./WorkColumnPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../helpers/Button";

/**
 * @prop userType: { "artist", "buyer", "admin"}
 * @prop work_count: total number of works from response
 * @prpo per_page: number of works to display on each page
*/
import ReactPaginate from 'react-paginate'

class Works extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      filters: {},
      isLoading: true,
      pageCount: 0,
      currentPage: 0,
      filtering: false
    };
  }

  componentDidMount = () => {
    const works_route = APIRoutes.works.index(1)
    const categories_route = APIRoutes.works.categories;
    Promise.all([
      Requester.get(works_route),
      Requester.get(categories_route)
    ]).then(response => {
      const [works_response, filters_response] = response;
      this.setState({
        works: works_response.works,
        filters: filters_response,
        isLoading: false,
        pageCount: Math.ceil(works_response.work_count / works_response.per_page)
      });
    });
  };

  getFilteredWorks = (page) => {
    // NOTE: Can't pass empty searchParams string to filtered_works
    // Possible fix by editing routes.fb, but not sure how -B.Y.
    const searchParams = this.filters.getQuery();
    this.setState({ isLoading: true });

    let works_route
    if (searchParams.length) {
      works_route = APIRoutes.works.filtered_works(searchParams, page)
    } else {
        works_route = APIRoutes.works.index(1)
    }

    Requester.get(
      works_route).then(
        response => {
          let works = response.works
          if (this.props.userType != "admin") {
            works = response.works.filter(work => work.hidden == false)
          }
          this.setState({
            works: works,
            isLoading: false,
            pageCount: Math.ceil(response.work_count / response.per_page),
            currentPage: 0,
            filtering: searchParams.length ? true : false
          });
        },
        response => {
          console.error(response);
        }
      );
  };

  updateFeatured = (work_id, unhide=false) => {
    let artist = this.state.works.find(work => work.id == work_id).artist
    let newFeaturedId
    if (unhide == true) {
      newFeaturedId = work_id
    } else if (artist.featured_work_id != work_id) {
      return
    } else {
      let newFeaturedWork = this.state.works.filter(work => work.artist.id == artist.id).filter(work => work.id != work_id).find(work => work.hidden == false)
      if (!newFeaturedWork) {
        newFeaturedId = newFeaturedWork
      } else {
        newFeaturedId = newFeaturedWork.id
      }
    }
    let formData = new FormData();
    formData.append(`artist[featured_work_id]`, newFeaturedId);
    fetch(APIRoutes.artists.update(artist.id), {
      method: 'PUT',
      body: formData,
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((data) => {
      window.location = `/artists/` + artist.id;
    }).catch((data) => {
      console.error(data);
    });
  }

  hideWork = (work_id) => {
    this.updateFeatured(work_id)
    let formData = new FormData();
    formData.append(`work[hidden]`, true);
    fetch(APIRoutes.works.update(work_id), {
      method: 'PUT',
      body: formData,
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((data) => {
      window.location = `/`
    }).catch((data) => {
      console.error(data);
    });
  }

  unHideWork = (work_id) => {
    let artist = this.state.works.find(work => work.id == work_id).artist
    if (!artist.featured_work_id) {
      this.updateFeatured(work_id, true)
    }
    let formData = new FormData();
    formData.append(`work[hidden]`, false);
    fetch(APIRoutes.works.update(work_id), {
      method: 'PUT',
      body: formData,
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((data) => {
      window.location = `/`
    }).catch((data) => {
      console.error(data);
    });
  }

  toggleHideWork = (work) => {
    if (work.hidden) {
      this.unHideWork(work.id);
    }
    else {
      this.hideWork(work.id);
    }
  }

  handlePageClick = data => {
    let selected = data.selected + 1;
    if (this.state.filtering) {
      this.getFilteredWorks(selected)
    } else {
        const works_route = APIRoutes.works.index(selected)
      Requester.get(
        works_route).then(
          response => {
            this.setState({
              works: response.works,
              currentPage: data.selected
            });
          },
        response => {
          console.error(response);
        }
        );
    }
  };

  render() {
    const { isLoading, pageCount, filters, works } = this.state;
    return (
      <div className="pt4">
        {isLoading ? <LoadingOverlay itemType="artwork" fullPage={true} /> : null}
        <div className="fl w-20 pa3 mt5">
          <Filters
            ref={(node) => { this.filters = node }}
            filters={filters}
            color="berry"
          />
          <button onClick={this.getFilteredWorks} className="button-primary bg-berry w-100"> Apply </button>
        </div>
        <div className="fl w-80 pb5">
          <div className="flex justify-between items-baseline">
            <h1>Artwork</h1>
            <nav className="li-berry pagination" role="navigation" aria-label="Pagination Navigation">
              <ReactPaginate
              previousLabel={"\u00ab"}
              nextLabel={"\u00bb"}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              activeClassName={'active'}
              disabledClassName={'hidden'}
              forcePage={this.state.currentPage}
              />
            </nav>
          </div>
          <div className="col-list-3">
            {works.map((work, i) => {
              return (
                <WorkColumnPanel key={i} work={work}>
                  {this.props.userType == "admin" &&
                    <Button type="hover-button" onClick={() => this.toggleHideWork(work)}>
                      <FontAwesomeIcon className="white" icon={work.hidden ? faEye : faEyeSlash} />
                      <h4 className="ml2 white">{work.hidden ? "Unhide" : "Hide"}</h4>
                    </Button>
                  }
                </WorkColumnPanel>
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
