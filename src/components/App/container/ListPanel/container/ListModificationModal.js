import React, { Fragment } from 'react';
import 'react-contexify/dist/ReactContexify.min.css';

import { Modal, InputGroup, FormControl, Button } from 'react-bootstrap';

import '../view/ListPanelView.scss';

import appJson from '../../../../../app';

export default class ListModal extends React.Component {
  constructor(props) {
    super(props);

    this.userInput = React.createRef();

    this.state = {
      modifiedListName: ""
    };

  }

  render() {
    return (
      <Fragment>
        <Modal size="sm" show={this.props.isRenameModalOpen}
        onHide= {this.props.closeModal}
        aria-labelledby="example-modal-sizes-title-sm">
          <Modal.Body>
            <InputGroup className="mb-3" onKeyPress={this.handleEnterKey}>
              <FormControl
                ref= {this.userInput}
                type= "text"
                maxLength= "200"
                placeholder= "New list name..."
                aria-label="rename-list"
                aria-describedby="basic-addon2"
                onChange={() => this.setInputComingFromUser()}/>
            </InputGroup>
          </Modal.Body>
            
          <Modal.Footer>
            <Button className="modal-close-btn" variant="secondary" onClick={this.props.closeModal}> Close </Button>
            <Button className="modal-register-btn" variant="primary" onClick={this.renameList}> Save </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }

  handleEnterKey = (event) => {
    if (event.key === 'Enter') { 
      this.renameList();
    }
  }

  renameList = () => {
    let newListName = this.state.modifiedListName;
    if (this.isNotEmpty(newListName)) {
      alert("Please enter not an empty text");
      return;
    } 
  
    const listItems = appJson.listItems;
    const currentList = this.props.listItem;
    const renamedIndex = listItems.findIndex(listItem => listItem.listID === currentList.listID);

    listItems[renamedIndex].listName = newListName;
    currentList.listName = newListName;

    this.props.sendModalUpdate(currentList);
    this.props.updateList();
  }

  isNotEmpty = (input) => (input.length === 0) ? true : false;

  setInputComingFromUser = () => {
    this.setState({
      modifiedListName: this.userInput.current.value 
    })
  } 
}