import PropTypes from "prop-types";
import React from "react";
// import { standardError } from '../../../lib/alerts';
import CreateWorkModal from './CreateWorkModal.js'
import image from './IMG_1906.jpeg'

<<<<<<< HEAD
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

=======
/**
* @prop buyer: buyer currently logged in
* @prop artist: artist associated with works
*/
>>>>>>> master
class ArtistWorks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
<<<<<<< HEAD
      isOpen: false

    }

    // this.openModal = this.openModal.bind(this);
    // this._handleCreateWork = this._handleCreateWork.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
=======
      comment: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
>>>>>>> master
  }

  componentDidMount = () => {
    const artist_id = this.props.artist.id;
    const works_route = APIRoutes.artists.works(0);
    Requester.get(works_route).then(
      response => {
        this.setState({ works: response });
      },
      response => {
        console.err(response);
      }
    );
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }

<<<<<<< HEAD
  //
  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   // this.subtitle.style.color = '#f00';
  // }
  //
  // closeModal() {
  //   this.setState({modalIsOpen: false});
  // }


  // _handleCreateWork(params) {
  //     const works_route = APIRoutes.artists.works(0);
  //     Requester.post(works_route, params, (response) => {
  //       this.setState({ works: response });
  //     }, (response) => {console.err(response)});
  //   //   const successFunc = (responseData) => {
  //   //     this.setState({work: responseData});
  //   //   }
  //   // postRequest(`/api/works`, successFunc, standardError, params=params);
  // }
=======
  handleSubmit(event) {
    const artist_id = this.props.artist.id;
    const commissions_route = APIRoutes.commissions.create;
    const buyer_id = this.props.buyer.id;
    const payload = {
      "buyer_id": buyer_id,
      "artist_id": artist_id,
      "comment": this.state.comment
    }

    Requester.post(commissions_route, payload)
  }
>>>>>>> master

  render() {


    return (
      <div>
        These will be the artist works
        {this.state.works.map(work => (
          <div key={work.id}>
            <h3>{work.title}</h3>
            <p>{work.work_type}</p>
            <p>{work.media}</p>
            {work.attachment_url.map((attachment) =>
              <img src={attachment} width="200" height="200"/>
            )}
          </div>
<<<<<<< HEAD
        )}
        <CreateWorkModal/>
=======
        ))}

        <form onSubmit = {this.handleSubmit} name="commissionsForm">
          <textarea
            type="TEXT"
            name="comment"
            id="comment"
            value={this.state.comment}
            onChange = {this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>

        <div className="fl w-100 pa2">
          <h1>aaklsdj</h1>
        </div>

>>>>>>> master
      </div>
    );
  }
}

export default ArtistWorks;
