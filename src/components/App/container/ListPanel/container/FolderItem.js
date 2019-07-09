import React from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import folderIcon from '../../../../../assets/icons/folder-icon.svg';
import dropDownIcon from '../../../../../assets/icons/dropdown-icon.svg';
import removeIcon from '../../../../../assets/icons/remove-icon.svg';
import appJson from '../../../../../app';
import '../view/ListPanelView.css';

export default class FolderItem extends React.Component {
  
  render() {
    const folderItem = this.props.folderItem;

    return (
      <Router>
        <div className="folder-container">
          <img className="folder-icon" src={folderIcon} alt="folder-icon"></img>
          <h2 className="folder-text">{folderItem.folderName}</h2>

          <span className="folder-modification-wrapper">
            <Link to="/" className="remove-list-btn">
              <img className="remove-icon-image" src={removeIcon} alt="search-icon" onClick={this.removeFolder}></img>
            </Link>
          </span>

          <span className="folder-dropdown-wrapper">
            <Link to="/" className="dropdown-btn">
             <img className="rename-icon-image" src={dropDownIcon} alt="dropdown-icon"></img>
            </Link>
          </span>
        </div>
      </Router>
      
    );
  }

  removeFolder = () => {
    const folderItems = appJson.folderItems;
    const currentFolder = this.props.folderItem;
    const removedIndex = folderItems.findIndex(folderItem => folderItem.listID === currentFolder.listID);

    if (removedIndex !== undefined) folderItems.splice(removedIndex,1);
    
    this.props.updateFolder();
  }
}