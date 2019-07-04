import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../view/ListPanelView.css';
import listIcon from '../../../../../assets/list-icon.svg';
import removeIcon from '../../../../../assets/remove-icon.svg';

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toDoItems: []
    };
  }
  
  render() {
    return (
      <Router>
        <NavLink className="link"to={'/#list/' + this.props.id} onClick={this.sendListToView}>
          <div className="list-container">
            <img className="list-icon" src={listIcon} alt="list-icon"></img>
            <h2 className="list-text">{this.props.listItem.name}</h2> 
      
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

export default ListItem;