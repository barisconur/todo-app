import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../view/ListPanelView.css';
import listIcon from '../../../../../assets/list-icon.svg';
import removeIcon from '../../../../../assets/remove-icon.svg';

class ListItem extends React.Component {
  render() {
    return (
      <Router>
        <NavLink to={'/#list/' + this.props.id}>
          <div className="list-container">
            <img className="list-icon" src={listIcon} alt="list-icon"></img>
            <h2 className="list-text">{this.props.listItem.name}</h2> 
      
            <Button className="remove-btn" variant="outline-danger">
              <img className="remove-icon" src={removeIcon} alt="remove-icon"></img>
            </Button>
          </div>
        </NavLink>
      </Router>
    );
  }
}

export default ListItem;