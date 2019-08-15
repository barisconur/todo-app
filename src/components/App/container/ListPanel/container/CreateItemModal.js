import React from 'react';
import { Modal, InputGroup, FormControl, Button } from 'react-bootstrap';

import appJson from '../../../../../app';

import { isEmptyString, isEnterKeyPressed } from '../../../utils';

import '../view/ListPanelView.scss';

const shortid = require('shortid');

export default class CreateItemModal extends React.Component {
  constructor(props) {
    super(props);

    this.userInput = React.createRef();

    this.state = {
      input: "",
      listID: 4,
      folderID: 0
    }
  }

  render() {
    return (
      <Modal className="add-list-or-folder-modal" show={this.props.isModalShown} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New {this.props.whichModal}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputGroup className="mb-3" onKeyPress={this.handleEnterKey}>
            <FormControl
              ref= {this.userInput}
              type= "text"
              maxLength= "200"
              placeholder= {this.props.whichModal +" name"}
              aria-label={this.props.whichModal +"-name"}
              aria-describedby="basic-addon2"
              onChange={() => this.setInputComingFromUser()}/>
          </InputGroup>
        </Modal.Body>
      
        <Modal.Footer>
          <Button className="modal-close-btn" variant="secondary" onClick={this.props.closeModal}> Close </Button>
          <Button className="modal-register-btn" variant="primary" onClick={this.addNewItem}> Save </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  handleEnterKey = (e) => { if (isEnterKeyPressed(e)) this.addNewItem(); } 

  setInputComingFromUser = () => { this.setState({ input: this.userInput.current.value }); }

  addNewItem = () => {
    let input = this.state.input;
    if (isEmptyString(input)) {
      alert("Please enter not an empty text");
      return;
    }
    
    const folderItems = appJson.folderItems;

    if (this.props.whichModal === 'folder') {
      if (!this.checkFolderNameIsUnique(folderItems)) return;
      this.registerNewFolderItem(folderItems);  
    } else {
      const listItems = appJson.listItems;
      this.registerNewListItem(listItems);
    }
    
    this.clearInput();
    this.props.closeModal();
  }
  
  checkFolderNameIsUnique = (folderItems) => {
    for (let i = 0; i < folderItems.length; i++) {
      if (this.state.input === folderItems[i].folderName) {
        alert("You have already added a folder with this name");
        return false;
      }
    }
    return true;
  }

  registerNewFolderItem = (folderItems) => {
    const newFolder = { folderID: this.state.folderID,
                       folderName: this.state.input,
                       listGroup: []
                      };
      this.setState(prevState => {
       return {folderID: prevState.folderID + 1}
    })
    this.setState(prevState => {return { folderID: prevState.folderID++ }});
    folderItems.push(newFolder);
  }

  registerNewListItem = (listItems) => {
    this.setState(prevState => {return { listID: prevState.listID + 1}});
    const newList = { listID: this.state.listID,
                      listName: this.state.input,
                      toDoItems: [],
                      numberOfIncompletedToDoCount: 0
                    };
    const newSelectedList = newList;

    appJson.selectedList = newSelectedList;
    listItems.push(newSelectedList);
    this.props.sendSelectedListToAppView(newSelectedList);
  }

  clearInput = () => { this.setState({ input: "" });
  }
}