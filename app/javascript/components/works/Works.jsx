import PropTypes from "prop-types";
import React from "react";
import Filters from "./Filters";
import LoadingOverlay from "../helpers/LoadingOverlay";
import WorkColumnPanel from "./WorkColumnPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../helpers/Button";

/** @prop userType: { "artist", "buyer", "admin" }
*/
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
    const works_route = this.props.userType == "admin"
      ? APIRoutes.works.index
      : APIRoutes.works.filtered_artist_hidden
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
          let works
          if (this.props.userType == "admin") {
            works = response
          } else {
            works = response.filter(work => work.hidden == false)
          }
          this.setState({
            works: works,
            isLoading: false,
            pageCount: Math.ceil(works.length / perPage)
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
      let newFeaturedWork = this.state.works.filter(work => work.id != work_id).find(work => work.hidden == false)
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
  handlePageClick = data => {
    let selected = data.selected;
    this.setState({
      workStartIndex: selected * perPage,
      workEndIndex: (selected+1) * perPage
    })
  };

  render() {
    const { isLoading, pageCount, filters, works, workStartIndex, workEndIndex } = this.state;
    return (
      <div className="pt4">
        {isLoading ? <LoadingOverlay itemType="artwork" fullPage={true} /> : null}
        <div className="fl w-20 pa3 mt5">
          <Filters
            ref={(node) => { this.filters = node }}
            filters={filters}
            color="magenta"
          />
          <button onClick={this.getFilteredWorks} className="button-primary bg-magenta w-100"> Apply </button>
        </div>
        <div className="fl w-80 pb5">
          <div className="flex justify-between items-baseline">
            <h1>Artwork</h1>
            <nav className="li-magenta pagination" role="navigation" aria-label="Pagination Navigation">
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
              />
            </nav>
          </div>
          <div className="col-list-3">
            {works.slice(workStartIndex, workEndIndex).map((work, i) => {
              return (
                <div>
                  <WorkColumnPanel key={i} work={work}>
                      {work.hidden == false && this.props.userType == "admin" &&
                      <Button className="ml2" type="hover-button" onClick={() => this.hideWork(work.id)}>
                        <FontAwesomeIcon className="white" icon={faTrash} />
                        <h4 className="ml2 white">Hide</h4>
                      </Button>
                      }
                      {work.hidden == true && this.props.userType == "admin" &&
                      <Button className="ml2" type="hover-button" onClick={() => this.unHideWork(work.id)}>
                        <FontAwesomeIcon className="white" icon={faTrash} />
                        <h4 className="ml2 white">Unhide</h4>
                      </Button>
                      }
                  </WorkColumnPanel>
                </div>
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
