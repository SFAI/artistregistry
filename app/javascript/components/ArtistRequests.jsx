import PropTypes from "prop-types";
import React from "react";
import CreateTransaction from "./CreateTransaction";
import StyledModal from "./StyledModal";

class ArtistRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inbox: [],
      display: [],
      state: 0
    };
    this.toggleState = ["Requests", "Pending", "Complete", "Archive"];
  }

  renderToggle() {
    return this.toggleState.map((state, i) => {
      return (
        <div key={i} onClick={() => this.display(i)} className={(state === "Requests" ? "bg-charcoal" : "bg-mustard") + " pa2 mt2 toggle"}>
          <h4 className="white">{state}</h4>
        </div>
      );
    });
  }

  display = (i) => {
    let display = []
    switch(this.toggleState[parseInt(i)]) {
      case "Requests":
        display = this.state.inbox;
        break;
      case "Pending":
        this.state.inbox.slice().map((request, i) => {
          if (request.request.open) {
            display.concat(request);
          }
        });
        break;
      case "Complete":
        this.state.inbox.slice().map((request, i) => {
          if (!request.request.open) {
            display.concat(request);
          }
        });
        break;
      case "Archive":
        break;
    }
    console.log(display);
    this.setState({ state: i, display: display });
  }

  componentDidMount = () => {
    this.fetchInboxData();
  };

  // TODO: add serializer
  fetchInboxData = () => {
    let requests_route = '';
    if (this.props.artist) {
      const artist_id = this.props.artist.id;
      requests_route = APIRoutes.artists.requests(artist_id);
    }
    if (this.props.buyer) {
      const buyer_id = this.props.buyer.id;
      requests_route = APIRoutes.buyers.requests(buyer_id);
    }
    Requester.get(requests_route).then(
      response => {
        let responseWithWorks = response;
        response.map((item) => {
          Requester.get(APIRoutes.works.show(item.request.work_id)).then((data) => {
            item.work = data;
            this.setState({ inbox: this.state.inbox.concat(item), display: this.state.display.concat(item) });
          });
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  RequestListItem = (props) => {
    const request = props.request;
    const id = request.request.id;
    const buyer = request.buyer;
    const artist = request.artist;
    const title = request.work.title;
    const thumbnail_url = request.work.thumbnail ? request.work.thumbnail : "https://cdn0.iconfinder.com/data/icons/typicons-2/24/image-128.png";
    const open = request.request.open;
    const created_timestamps = new Date(request.request.created_at).toLocaleDateString();
    const closed_timestamps = new Date(request.request.updated_at).toLocaleDateString();

    return (
      <div className="content-row">
        <div className="request-content">
          <div>
            <img src={thumbnail_url} width="128"/>
          </div>
          <ul className = "items">
            <li className="items group" id="labels">
              <div className="li-text"> Title </div>
              {buyer && <div className="li-text"> Buyer </div>}
              {artist && <div className="li-text"> Artist </div>}
              <div className = "li-text"> Placed on </div>

            </li>

            <li className="items group">
              <div className="li-text"> {title} </div>
              {buyer && <div className="li-text"> {buyer.name} </div>}
              {artist && <div className="li-text"> {artist.name} </div>}
              <div className="li-text" id="date"> {created_timestamps} </div>

            </li>
          </ul>
        </div>
        <div className="request-buttons w4">
          <StyledModal title="Complete">
            <CreateTransaction
              artist={this.props.artist}
              request_id={id}
            />
          </StyledModal>
          <button type="button" className="button-secondary b--charcoal w-100 mt2" value = {id} onClick = {()=>this.closeRequest(id)}>CLOSE</button>
        </div>
      </div>

    );

  }

  closeRequest = (id) => {
    const update_request_route = APIRoutes.requests.update(id);
    Requester.update(update_request_route, {open: false}).then((response) => {
      this.fetchInboxData();
    });
  }

  render() {
    console.log(this.state.display);
    return (
      <div className="mw9 center">
        <div className="w-20 fl pr3 mt6">
          {this.renderToggle()}
        </div>
        <div className="w-80 fl mt2">
          <h1>Requests</h1>
          {this.state.display.map((request) => (
            <div key={request.request.id} className="request pa3 bg-white mb3">
              <div className = "request-header">
                <h5>Purchase</h5>
                {request.request.open ? <h3>Pending</h3> : <h3>Closed</h3>}
              </div>
              <this.RequestListItem request = {request}/>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ArtistRequests;
