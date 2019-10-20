import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
import CommissionsForm from "../commissions/CommissionsForm";
import WorkColumnPanel from "../works/WorkColumnPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEyeSlash,
  faEye,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../helpers/Button";
import {
  convertSnakeCase,
  splitCommaSeparatedArray,
} from "../../utils/strings";
import LoadingOverlay from "../helpers/LoadingOverlay";
import Unauthorized from "../helpers/Unauthorized";
import IconButton from "../helpers/IconButton";
var sfai_wallpaper = require("../../../assets/images/sfai_wallpaper.png");
/**
 * @prop user: user currently logged in
 * @prop userType: { "artist", "buyer" , "admin"}
 * @prop artist: artist associated with works
 */
class ArtistProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      artist: [],
      activeFilter: "All works",
      canEditProfile: false,
      showIncompleteBanner: true,
      componentDidMount: false,
    };
  }

  componentDidMount = () => {
    const { user, userType, artist } = this.props;
    const artist_id = artist.id;
    const works_route = APIRoutes.artists.works(artist_id);
    const artist_route = APIRoutes.artists.show(artist_id);
    Promise.all([Requester.get(works_route), Requester.get(artist_route)]).then(
      response => {
        const [works_response, artist_response] = response;
        let works_response_filtered;
        if (!user) {
          works_response_filtered = works_response.filter(
            work => work.hidden == false
          );
        } else if (
          userType == "admin" ||
          user.account_id == artist.account_id
        ) {
          works_response_filtered = works_response;
        } else {
          works_response_filtered = works_response.filter(
            work => work.hidden == false
          );
        }
        if (
          artist_response["program"] &&
          artist_response["program"].length > 0
        ) {
          let programs = splitCommaSeparatedArray(
            artist_response["program"]
          ).sort();
          programs = programs.filter(item => item != "");
          artist_response["program"] = programs;
        }
        this.setState({
          works: works_response_filtered,
          artist: artist_response,
          canEditProfile:
            userType === "artist" && user && user.id === artist.id,
          componentDidMount: true,
        });
      }
    );
  };

  reformatPrograms = p => {
    var programs = p;
    for (var i = 0; i < programs.length; i++) {
      programs[i] = convertSnakeCase(programs[i]);
    }
    if (programs.length == 0) {
      return programs;
    }
    return programs.join(", ");
  };

  getAvailability = activeFilter => {
    var availability = {
      "All works": ["active", "sold", "rented"],
      Available: ["active"],
      "Sold/Rented": ["sold", "rented"],
    };
    return availability[activeFilter];
  };

  navigateToEdit = () => {
    window.location = `/artists/${this.props.artist.id}/update`;
  };

  createNewWork = () => {
    window.location = `/works/new`;
  };

  updateWork = work_id => {
    window.location = `/works/${work_id}/edit`;
  };

  updateFeatured = (work_id, unhide = false) => {
    let newFeaturedId;
    if (unhide == true) {
      newFeaturedId = work_id;
    } else if (this.state.artist.featured_work_id != work_id) {
      return;
    } else {
      let newFeaturedWork = this.state.works
        .filter(work => work.id != work_id)
        .find(work => work.hidden == false);
      if (!newFeaturedWork) {
        newFeaturedId = newFeaturedWork;
      } else {
        newFeaturedId = newFeaturedWork.id;
      }
    }
    let formData = new FormData();
    formData.append(`artist[featured_work_id]`, newFeaturedId);
    fetch(APIRoutes.artists.update(this.props.artist.id), {
      method: "PUT",
      body: formData,
      credentials: "same-origin",
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content,
      },
    })
      .then(data => {
        window.location = `/artists/` + this.props.artist.id;
      })
      .catch(data => {
        console.error(data);
      });
  };

  deleteWork = work_id => {
    fetch(APIRoutes.works.delete(work_id), {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content,
      },
    })
      .then(data => {
        if (work_id == this.state.artist.featured_work_id) {
          this.updateFeatured(work_id);
        } else {
          window.location = `/artists/` + this.props.artist.id;
        }
      })
      .catch(data => {
        console.error(data);
      });
  };

  renderIncompleteProfileBanner = () => {
    const artist = this.state.artist;
    const completionStatus = {
      Name: Boolean(artist.name),
      Description: Boolean(artist.description),
      "Featured work": Boolean(artist.featured_work_id),
      Media: Boolean(artist.media),
      Program: Boolean(artist.program.length > 0),
      Year: Boolean(artist.year),
    };

    const sortedKeys = Object.keys(completionStatus).sort((x, y) => {
      return completionStatus[x] === completionStatus[y]
        ? 0
        : completionStatus[x]
        ? -1
        : 1;
    });

    let numCompleted = 0;
    for (let i = 0; i < sortedKeys.length; i++) {
      if (completionStatus[sortedKeys[i]]) {
        numCompleted++;
      }
    }

    if (numCompleted == sortedKeys.length) {
      return null;
    }

    const profileCompletePercent = Math.floor(
      (numCompleted / sortedKeys.length) * 100
    );

    return (
      <div className="incomplete-profile mv3 bg-white pa4 flex justify-between items-center">
        <div>
          <h2>Your profile is {profileCompletePercent}% complete</h2>
          <p>Fill in the remaining information to complete your profile.</p>
          <div className="flex mt4">
            <Button
              type="button-primary"
              className="w4 mr2"
              color="denim"
              onClick={this.navigateToEdit}
            >
              Edit Profile
            </Button>
            <Button
              type="button-tertiary"
              className="w4"
              color="denim"
              onClick={() => this.setState({ showIncompleteBanner: false })}
            >
              Dismiss
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap w-50 mv3">
          {sortedKeys.map((field, i) => {
            const isComplete = completionStatus[field];
            return (
              <div className="w-30 mv3" key={i}>
                <div className="flex items-center">
                  <div
                    className={
                      "flex justify-center items-center br-100 mr2 " +
                      (isComplete ? "complete" : "incomplete")
                    }
                  />
                  <div>{field}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  hideWork = work_id => {
    this.updateFeatured(work_id);
    let formData = new FormData();
    formData.append(`work[hidden]`, true);
    fetch(APIRoutes.works.update(work_id), {
      method: "PUT",
      body: formData,
      credentials: "same-origin",
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content,
      },
    })
      .then(data => {
        window.location = `/artists/` + this.props.artist.id;
      })
      .catch(data => {
        console.error(data);
      });
  };

  unHideWork = work_id => {
    if (!this.state.artist.featured_work_id) {
      this.updateFeatured(work_id, true);
    }
    let formData = new FormData();
    formData.append(`work[hidden]`, false);
    fetch(APIRoutes.works.update(work_id), {
      method: "PUT",
      body: formData,
      credentials: "same-origin",
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content,
      },
    })
      .then(data => {
        window.location = `/artists/` + this.props.artist.id;
      })
      .catch(data => {
        console.error(data);
      });
  };

  toggleHideWork = work => {
    if (work.hidden) {
      this.unHideWork(work.id);
    } else {
      this.hideWork(work.id);
    }
  };

  lockArtist = () => {
    fetch(APIRoutes.artists.lock_user(this.props.artist.id), {
      method: "PUT",
      credentials: "same-origin",
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content,
      },
    })
      .then(data => {
        window.location = `/artists/` + this.props.artist.id;
      })
      .catch(data => {
        console.error(data);
      });
  };

  unlockArtist = () => {
    fetch(APIRoutes.artists.unlock_user(this.props.artist.id), {
      method: "PUT",
      credentials: "same-origin",
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content,
      },
    })
      .then(data => {
        window.location = `/artists/` + this.props.artist.id;
      })
      .catch(data => {
        console.error(data);
      });
  };

  renderAvatar = avatar => {
    return avatar.url ? (
      <div className="h4 w4 br-100 overflow-hidden self-center mb4">
        <img style={{"objectFit":"cover"}} src={avatar.url} alt={name} />
      </div>
    ) : (
      <FontAwesomeIcon
        icon={faUserCircle}
        size="8x"
        className="gray mb4 self-center"
        alt={name}
      />
    );
  };

  renderHideButton = work => (
    <div className="flex mb2">
      <IconButton
        onClick={() => this.toggleHideWork(work)}
        isActiveIcon={work.hidden}
        activeIcon={faEye}
        inactiveIcon={faEyeSlash}
        text={work.hidden ? "Unhide" : "Hide"}
      />
    </div>
  );

  renderEditWorkButton = work => (
    <div className="flex mb2">
      <IconButton
        className="mr2"
        onClick={() => this.updateWork(work.id)}
        activeIcon={faEdit}
        text="Edit"
      />
    </div>
  );

  renderLockButton = locked_at => (
    <Button
      type="button-primary"
      className="w4"
      color="denim"
      onClick={locked_at ? this.unlockArtist : this.lockArtist}
    >
      {locked_at ? "UNLOCK" : "LOCK"}
    </Button>
  );

  renderEditProfileButton = () => (
    <IconButton
      className="ma2 absolute top-0 right-0"
      onClick={this.navigateToEdit}
      activeIcon={faEdit}
      text="Edit"
    />
  );

  renderNewWorkButton = () => (
    <Button
      type="button-primary"
      className="w4"
      color="denim"
      onClick={this.createNewWork}
    >
      New Work
    </Button>
  );

  renderGuidelines = () => (
    <div className="bg-charcoal pa3">
      <h2 className="white">Guidelines for contacting artists</h2>
      <ul className="white pl3" style={{"listStyleType":"disc"}}>
        <li>Be very clear about what it is you want.</li>
        <li>Be polite and courteous.</li>
        <li>Have a price-point in mind, and be up front about what you can afford.</li>
        <li>Don't offer "exposure" as payment.</li>
        <li>Don't be surprised if a contract comes into play for commissions, or if insurance is discussed for installation and exhibition.</li>
        <li>Once an agreement has been made, do what you say you are going to do.</li>
      </ul>
    </div>
  );

  renderFilteredWorks = () => {
    const { works, activeFilter, canEditProfile } = this.state;
    const filteredWorks = works.filter(work =>
      this.getAvailability(activeFilter).includes(work.availability)
    );
    if (filteredWorks.length === 0) {
      return (
        <div>
          <p className="tc">No works matching the selected filters.</p>
        </div>
      );
    }
    return (
      <div className="col-list-4">
        {filteredWorks.map(work => {
          return (
            <WorkColumnPanel work={work} key={work.id} hideArtistName={true}>
              {canEditProfile && this.renderEditWorkButton(work)}
              {this.props.userType == "admin" && this.renderHideButton(work)}
            </WorkColumnPanel>
          );
        })}
      </div>
    );
  };

  render() {
    const { activeFilter, artist, works, canEditProfile } = this.state;
    const { name, program, degree, year, media, description, avatar } = artist;
    const { artist: artist_prop, user, userType } = this.props;
    if (
      artist.hidden &&
      (user == null ||
        (user.account_id != artist_prop.account_id && userType != "admin"))
    ) {
      return <Unauthorized />;
    }
    if (!this.state.componentDidMount) {
      return <LoadingOverlay fullPage={true} itemType="Artist" />;
    }

    const featured_work = works.find(
      work => work.id === artist.featured_work_id
    );
    return (
      <div>
        {canEditProfile &&
          this.state.showIncompleteBanner &&
          this.renderIncompleteProfileBanner()}
        <div className="flex justify-between items-center">
          <h1> {name} </h1>
        </div>
        <div className="h7 flex">
          <div className="w-20-l flex flex-column pa3 w5 bg-white">
            {this.renderAvatar(avatar)}
            <div className="info pr3 scroll-denim overflow-y-auto">
              <h5 className="ttu">Program</h5>
              <p className="ttc"> {this.reformatPrograms(program)} </p>
              <h5 className="ttu">Media</h5>
              <p> {media} </p>
              <h5 className="ttu">Degree</h5>
              <p className="ttu">
                {degree} {year}
              </p>
            </div>
          </div>
          <div className="w-50-l mw-400 flex relative mh3">
            <img
              className="fit-cover h-100"
              src={
                featured_work
                  ? featured_work.featured_image.url
                  : sfai_wallpaper
              }
              alt={featured_work ? featured_work.title : ""}
            />
          </div>
          <div className="w-30-l mw-400 pa3 bg-white relative">
            {canEditProfile && this.renderEditProfileButton()}
            <h2>About the artist</h2>
            <div className="scroll-denim h6 pr3 overflow-y-auto">
              <p className="prewrap"> {description}</p>
            </div>
          </div>
        </div>
        <div className="mt5 mb3 flex justify-between items-center">
          <div>
            {["All works", "Available", "Sold/Rented"].map(filter => (
              <button
                onClick={() => this.setState({ activeFilter: filter })}
                key={filter}
                className={classNames(
                  "button b--none f6 mr3 w4",
                  activeFilter == filter ? "bg-denim white" : "bg-white denim"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
          {userType == "admin" && this.renderLockButton(artist.locked_at)}
          {canEditProfile && this.renderNewWorkButton()}
        </div>
        <div className="flex flex-wrap mb5">{this.renderFilteredWorks()}</div>
        {!canEditProfile && !this.props.blocked && (
          <div className="flex flex-row items-stretch mb4">
            <div className="w-50 pr2 dib flex flex-row items-stretch">
              {this.renderGuidelines()}
            </div>
            <div className="w-50 pl2 dib flex flex-row items-stretch">
              <CommissionsForm
                buyer={this.props.user}
                artist={this.props.artist}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ArtistProfile;
