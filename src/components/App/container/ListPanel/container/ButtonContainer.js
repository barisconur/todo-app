import React from 'react';
import { Button } from 'react-bootstrap';
import '../view/ListPanelView.css';
import createIcon from '../../../../../assets/create-icon.svg';

class ButtonContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="create-buttons-container"> 
        <div className="create-list-container">
          <Button className="create-btn" variant="outline-primary" onClick={this.handleListModal}>
          <img className="create-icon" src={createIcon} alt="create-list-icon"></img>
          </Button>
          <h3 className="create-text">Create list</h3>
        </div>
  
        <div className="create-folder-container">
          <Button className="create-btn" variant="outline-primary" onClick={this.handleFolderModal}>
            <img className="create-icon" src={createIcon} alt="create-folder-icon"></img>
          </Button>
          <h3 className="create-text">Create folder</h3>
        </div>
    </div>
    );
  }

  handleListModal = () => {
    this.props.displayModal("list");
  }

  handleFolderModal = () => {
    this.props.displayModal("folder");
  }
}

export default ButtonContainer;