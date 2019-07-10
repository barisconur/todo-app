import React from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import checkBoxIcon from '../../../../../assets/icons/checkbox-icon.svg';
import removeIcon from '../../../../../assets/icons/remove-icon.svg';
import appJson from '../../../../../app';
import '../view/ToDoPanelView.css';

export default class ToDoItem extends React.Component {

  render() {
    const toDoItem = this.props.toDoItem;

    return (
      <Router>
         <span className="todo-item-wrapper">
          <Link to="/" className="checkbox-btn" onClick={this.handleToDoItem}>
            <img className="checkbox-icon" src={checkBoxIcon} alt="checkbox-icon"></img>
          </Link>

          <h2 className="todo-item-text">{toDoItem.toDoName}</h2> 

          <Link to="/" className="remove-todo-btn" onClick={this.handleToDoItem}>
            <img className="remove-icon" src={removeIcon} alt="remove-icon"></img>
          </Link>

         </span>
      </Router>
    );
  }

  handleToDoItem = (event) => {
    const listItems = appJson.listItems;
    const selectedList = this.props.selectedList;
    const currentIndex = listItems.findIndex(listItem => listItem.listID === selectedList.listID);

    const currentList = listItems[currentIndex];
    const toDoItems = currentList.toDoItems;
    const currentToDoItem = this.props.toDoItem;
    const currentToDoIndex = toDoItems.findIndex((toDoItem) => toDoItem.toDoID === currentToDoItem.toDoID);
  
    if (currentToDoIndex !== undefined) toDoItems.splice(currentToDoIndex, 1);

    currentList.toDoItems = toDoItems;
    if (event.target.className === "checkbox-icon") currentList.completedItems.push(currentToDoItem);

    this.props.updateToDoChanges(currentList);
  }
}