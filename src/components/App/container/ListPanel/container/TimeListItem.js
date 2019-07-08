import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import '../view/ListPanelView.css';

class TimeListItem extends React.Component {

  render() {
    const list = this.props.listItem;
    return (
      <Router>
      <NavLink className="link"to={'/#list/' + list.listName} onClick={this.sendListToView}>
        <div className="list-container">
          <img className="list-icon" src={list.listIcon} alt="list-icon"></img>
          <h2 className="list-text">{list.listName}</h2> 
        </div>
      </NavLink>
    </Router>
    );
  }
  
  sendListToView = () => {
    this.props.setSelectedList(this.props.listItem);
  }
}
    
export default TimeListItem;