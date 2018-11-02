import PropTypes from "prop-types";
import React from "react";
// import { standardError } from '../../../lib/alerts';
import CreateWorkModal from './CreateWorkModal.js'
import image from './IMG_1906.jpeg'

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

class ArtistWorks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      isOpen: false

    }

    // this.openModal = this.openModal.bind(this);
    // this._handleCreateWork = this._handleCreateWork.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount = () => {
    const artist_id = this.props.artist.id;
    const works_route = APIRoutes.artists.works(0);
    Requester.get(works_route, (response) => {
      this.setState({ works: response });
    }, (response) => {console.err(response)});
  }

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

  render() {


    return (
      <div>
        These will be the artist works
        {this.state.works.map((work) =>
          <div key={work.id}>
            <h3>{work.title}</h3>
            <p>{work.work_type}</p>
            <p>{work.media}</p>
            {work.attachment_url.map((attachment) =>
              <img src={attachment} width="200" height="200"/>
            )}
          </div>
        )}
        <CreateWorkModal/>
      </div>
    );
  }
}

export default ArtistWorks;
