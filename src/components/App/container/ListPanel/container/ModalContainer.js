import React from 'react';
import { Modal, InputGroup, FormControl, Button } from 'react-bootstrap';
import '../view/ListPanelView.css';

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.userInput = React.createRef();
    this.state = {
      input: ""
    }
  }

  render() {
    return (
      <Modal className="add-list-or-folder-modal" show={this.props.isModalShown} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New {this.props.whichModal}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              ref= {this.userInput}
              type= "text"
              placeholder= {this.props.whichModal +" name"}
              aria-label={this.props.whichModal +"-name"}
              aria-describedby="basic-addon2"
              onChange={() => this.setInputComingFromUser()}
              />
          </InputGroup>
        </Modal.Body>
      
        <Modal.Footer>
          <Button className="modal-close-btn" variant="secondary" onClick={this.props.closeModal}>
          Close
          </Button>
          <Button className="modal-register-btn" variant="primary" onClick={this.sendInputToView}>
          Register
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  handleToggle = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  sendInputToView = () => {
    const userInput = this.state.input;
    this.setInputComingFromUser();

    if (this.isNotEmpty(this.state.input)) {
      alert("Please enter not an empty text");
      return; 
    } 

    if (this.props.whichModal === 'folder') {
      for (let i = 0; i < this.props.folderNames.length; i++) {
        if (userInput === this.props.folderNames[i]) {
          alert("You have already added a folder with this name");
          return;
        }
      }          
    }
    
    this.props.itemName(userInput);
    this.clearInput();
    this.props.closeModal();
  }

  setInputComingFromUser = () => {
    this.setState({
      input: this.userInput.current.value
    });
  }

  isNotEmpty = (input) => {
    return (input.length === 0) ? true : false;
  }

  clearInput = () => {
    this.setState({
      input: ""
    });
  }
}

export default ModalContainer;