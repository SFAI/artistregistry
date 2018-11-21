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
      state: 0,
      componentDidMount: false,
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
        this.state.inbox.map((request, i) => {
          display.push(i);
        });
        break;
      case "Pending":
        this.state.inbox.map((request, i) => {
          if (request.request.open) {
            display.push(i);
          }
        });
        break;
      case "Complete":
        this.state.inbox.slice().map((request, i) => {
          if (!request.request.open && request.receipt) {
            display.push(i);
          }
        });
        break;
      case "Archive":
        this.state.inbox.slice().map((request, i) => {
          if (!request.request.open && !request.receipt) {
            display.push(i);
          }
        });
        break;
    }
    this.setState({ state: i, display: display });
  }

  componentDidMount = () => {
    this.fetchInboxData();
    this.setState({ componentDidMount: true });
  };

  // TODO: add serializer
  fetchInboxData = () => {
    this.setState({ inbox: [], display: [] }, () => {
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
          response.map((item, i) => {
            Requester.get(APIRoutes.works.show(item.request.work_id)).then((data) => {
              item.work = data;
              this.setState({ inbox: this.state.inbox.concat(item), display: this.state.display.concat(i) });
            });
          });
        },
        error => {
          console.error(error);
        }
      );
    });
  }

  getAttr = (request) => {
    let attr = {
      "Request Id": request.request.id,
      "Buyer": request.buyer.name,
      "Artist": request.artist.name,
      "Title": request.work.title,
      "Placed": new Date(request.request.updated_at).toLocaleDateString(),
    };

    if (!request.open && request.receipt) {
      if (request.receipt.transaction_type === "rental") {
        attr["Start Date"] = request.receipt.start_date;
        attr["End Date"] = request.receipt.end_date;
      }
      attr["Price"] = request.receipt.price;
      attr["Purchase Date"] = request.receipt.purchase_date;
    }

    return (
      <div className="attr">
        <div className="key">
          {
            Object.keys(attr).map((obj, i) => {
              return <p key={i}>{obj}</p>
            })
          }
        </div>
        <div className="value">
          {
            Object.keys(attr).map((obj, i) => {
              return <p key={i}>{attr[obj]}</p>
            })
          }
        </div>
      </div>
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
          <div className = "items">
            {
              this.getAttr(request)
            }
          </div>
        </div>
        <div className="request-buttons w4">
          {
            request.request.open ? (
              <div className="w4">
                <StyledModal title="Complete">
                  <CreateTransaction
                    artist={this.props.artist}
                    request_id={id}
                  />
                </StyledModal>
                <button type="button" className="button-secondary b--charcoal w-100 mt2" value = {id} onClick = {()=>this.closeRequest(id)}>CLOSE</button>
              </div>
            ) : (
              <div className = "closed-request-button w4">
                <p> You closed this request on {closed_timestamps} </p>
              </div>
            )
          }
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
    console.log(this.state.inbox);
    if (!this.state.componentDidMount) {
      return (
        <div><h2>Loading</h2></div>
      );
    }
    return (
      <div className="mw9 center">
        <div className="w-20 fl pr3 mt6">
          {this.renderToggle()}
        </div>
        <div className="w-80 fl mt2">
          <h1>Requests</h1>
          {this.state.display.map((i) => (
            <div key={this.state.inbox[i].request.id} className="request pa3 bg-white mb3">
              <div className = "request-header">
                <h3>{this.state.inbox[i].request.types}</h3>
                {
                  this.state.inbox[i].request.open ? (
                    <h3>Pending</h3>
                  ) : (
                    this.state.inbox[i].receipt ? (
                      <h3>Complete</h3>
                    ) : (
                      <h3>Closed</h3>
                    )
                  )
                }
              </div>
              <this.RequestListItem request = {this.state.inbox[i]}/>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ArtistRequests;
