import React from 'react';
import { Button } from 'react-bootstrap';
import '../view/ListPanelView.css';
import folderIcon from '../../../../../assets/folder-icon.svg';


class FolderItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listGroup: []
    };
  }
  
  render() {
    return (
      <div className="folder-container">
        <img className="folder-icon" src={folderIcon} alt="folder-icon"></img>
        <h2 className="folder-text">{this.props.folderItem.folderName}</h2> 
      </div>
    );
  }
}

export default FolderItem;