import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import '../view/ListPanelView.css';

class StarredListItem extends React.Component {

  render() {
    return (
      <Router>
      <NavLink className="link"to={'/#starredList/'} onClick={this.sendListToView}>
        <div className="list-container">
          <img className="list-icon" src={this.props.listItem.listIcon} alt="list-icon"></img>
          <h2 className="list-text">{this.props.listItem.listName}</h2> 
        </div>
      </NavLink>
    </Router>
    );
  }
  
  sendListToView = () => {
    this.props.setSelectedList(this.props.listItem);
  }
}
    
export default StarredListItem;