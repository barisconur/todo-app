import React from 'react';
import { Modal, InputGroup, FormControl, Button } from 'react-bootstrap';
import '../view/ListPanelView.css';
import appJson from '../../../../../app';

const shortid = require('shortid');

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
          <Button className="modal-register-btn" variant="primary" onClick={this.addItemToItems}>
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

  addItemToItems = () => {
    this.setInputComingFromUser();

    if (this.isNotEmpty(this.state.input)) {
      alert("Please enter not an empty text");
      return; 
    } 
    const folderItems = appJson.folderItems;
    console.log(folderItems);

    if (this.props.whichModal === 'folder') {
      if (!this.checkFolderNameIsUnique(folderItems)) return;
      this.registerNewFolderItemToJson(folderItems);
    } else {
      const listItems = appJson.listItems;
      this.registerNewListItemToJson(listItems);
    }
    
    this.clearInput();
    this.props.closeModal();
  }

  setInputComingFromUser = () => {
    this.setState({
      input: this.userInput.current.value
    });
  }

  isNotEmpty = (input) => (input.length === 0) ? true : false;

  checkFolderNameIsUnique = (folderItems) => {
    for (let i = 0; i < folderItems.length; i++) {
      if (this.state.input === folderItems[i].folderName) {
        alert("You have already added a folder with this name");
        return false;
      }
    }
    return true;
  }

  registerNewFolderItemToJson = (folderItems) => {
    const newFolder = { folderID: shortid.generate(),
                       folderName: this.state.input,
                       listGroup: []
                      };
    folderItems.push(newFolder);
  }

  registerNewListItemToJson = (listItems) => {
    const newList = { listID: shortid.generate(),
                      listName: this.state.input 
                    }
    const newSelected = { listID: newList.listID,
                          listName: newList.listName,
                          toDoItems: [],
                          completedItems: []
                        }

    listItems.push(newSelected);
    appJson.selectedList = newSelected;
    this.props.sendSelectedListToView(newSelected);
  }

  clearInput = () => {
    this.setState({
      input: ""
    });
  }
}

export default ModalContainer;