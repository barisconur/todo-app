import React from 'react';
import { Button } from 'react-bootstrap';
import '../view/ToDoPanelView.css';
import checkBoxIcon from '../../../../../assets/checkbox-icon.svg';
import removeIcon from '../../../../../assets/remove-icon.svg';

class ToDoItem extends React.Component {
  render() {
    return (
      <div className="todo-item-container">
        <button className="checkbox-btn">
         <img className="checkbox-icon" src={checkBoxIcon} alt="checkbox-icon"></img>
        </button>
        <h2 className="todo-item-text">{this.props.toDoItem.name}</h2> 
  
        <button className="remove-btn">
         <img className="remove-icon" src={removeIcon} alt="remove-icon"></img>
        </button>
    </div>
    );
  }
}

export default ToDoItem;