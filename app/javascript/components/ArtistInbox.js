import PropTypes from "prop-types";
import React from "react";

class ArtistInbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inbox: []
    };
  }

  componentDidMount = () => {
    this.fetchInboxData();
  };

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
        let responseWithWorks = [];
        responseWithWorks = response;

        let works = {};

        response.map((item) => {
          Requester.get(APIRoutes.works.show(item.request.work_id)).then(
            data => {
              item.work = data;
              this.setState({ inbox: this.state.inbox.concat(item) });
            }
            )
        });
      
      },
      response => {
        console.error(response);
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
      <ul className="content-row">
        <li className="items"> <img src={thumbnail_url} width="128"></img> </li>
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
       {open ? 
        <li className="open-request-button" id = "last">
            <button type="button" className = "f6 link dim pa3 mb2 dib white bg-dark-gray" value = {id} onClick = {()=>this.closeRequest(id)}>  CLOSE REQUEST </button>      
        </li> 
        :
        <div className = "closed-request-button" id = "last">
          <p> You closed this request on {closed_timestamps} </p>
        </div>
        } 
      </ul>

    );

  }

  closeRequest = (id) => {
    const update_request_route = APIRoutes.requests.update(id);
    Requester.update(update_request_route, {open: false}).then((response) => {
      this.fetchInboxData();
    });
  }

  render() {
    return (
      <div>
        
        <ul>
        {this.state.inbox.map((request) => (

          <li key={request.request.id} className = "list-row">
            <div className = "request-header"> {request.request.open ? <div className="request-status"> Pending </div> : <div className="request-status"> Closed </div>} <div className = "request-label"> Purchase </div>  </div>
            <this.RequestListItem request = {request}/>
            
          </li>
        

        ))}
        </ul>
      </div>
    );
  }
}

export default ArtistInbox;
