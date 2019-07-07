import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../view/ListPanelView.css';
import removeIcon from '../../../../../assets/icons/remove-icon.svg';

class TimeListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
      <NavLink className="link"to={'/#timeList/'} onClick={this.sendListToView}>
        <div className="list-container">
          <img className="list-icon" src={this.props.listItem.listIcon} alt="list-icon"></img>
          <h2 className="list-text">{this.props.listItem.listName}</h2> 
    
          <Button className="list-remove-btn" variant="outline-danger">
            <img className="remove-icon" src={removeIcon} alt="remove-icon"></img>
          </Button>
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