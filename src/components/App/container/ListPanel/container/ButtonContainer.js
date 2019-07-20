import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

import plusIcon from '../../../../../assets/icons/plus-icon.svg';

import '../view/ListPanelView.scss';

export default class ButtonContainer extends React.Component {
  
  render() {
    return (
      <Router>
        <div className="create-buttons-container"> 
          <hr/>
          <div className="create-list-wrapper">
            <NavLink className="link" to="/#create/list/" onClick={this.handleListModal}>
              <img className="create-icon" src={plusIcon} alt="create-list-icon"/>
              <h3 className="create-text">Create list</h3>
            </NavLink>
          </div>

          <div className="create-folder-wrapper">
            <NavLink className="link" to="/#create/folder/" onClick={this.handleFolderModal}>
              <img className="create-icon" src={plusIcon} alt="create-folder-icon"/>
              <h3 className="create-text">Create folder</h3>
            </NavLink>
          </div>   
        </div>
      </Router>
    );
  }

  handleListModal = () => {
    this.props.displayModal("list");
    
  }

  handleFolderModal = () => {
    this.props.displayModal("folder");
  }
}