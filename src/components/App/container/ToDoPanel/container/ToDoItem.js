import React from 'react';
import { Button } from 'react-bootstrap';
import '../view/ToDoPanelView.css';
import checkBoxIcon from '../../../../../assets/checkbox-icon.svg';
import removeIcon from '../../../../../assets/remove-icon.svg';

class ToDoItem extends React.Component {
  render() {
    return (
      <div className="todo-container">
        <img className="checkbox-icon" src={checkBoxIcon} alt="checkbox-icon"></img>
        <h2 className="todo-item-text">Item</h2> 
  
        <Button className="remove-btn" variant="outline-danger">
         <img className="remove-icon" src={removeIcon} alt="remove-icon"></img>
        </Button>
    </div>
    );
  }
}

export default ToDoItem;