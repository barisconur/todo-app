import React from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import '../view/ListPanelView.css';
import folderIcon from '../../../../../assets/icons/folder-icon.svg';
import dropDownIcon from '../../../../../assets/icons/dropdown-icon.svg';

class FolderItem extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const folderItem = this.props.folderItem;
    return (
      <Router>
        <div className="folder-container">
          <img className="folder-icon" src={folderIcon} alt="folder-icon"></img>
          <h2 className="folder-text">{folderItem.folderName}</h2>
          <span className="folder-dropdown-wrapper">
            <Link to="/" className="dropdown-btn">
             <img className="rename-icon-image" src={dropDownIcon} alt="dropdown-icon"></img>
            </Link>
          </span>
        </div>
      </Router>
      
    );
  }
}

export default FolderItem;