import React from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import '../view/ToDoPanelView.css';
import checkBoxIcon from '../../../../../assets/icons/checkbox-icon.svg';
import removeIcon from '../../../../../assets/icons/remove-icon.svg';

import appJson from '../../../../../app';

class ToDoItem extends React.Component {

  render() {
    const toDo = this.props.toDoItem;

    return (
      <Router>
         <span className="todo-item-wrapper">
          <Link to="/" className="checkbox-btn" onClick={this.completeToDo}>
            <img className="checkbox-icon" src={checkBoxIcon} alt="checkbox-icon"></img>
          </Link>

          <h2 className="todo-item-text">{toDo.toDoName}</h2> 

          <Link to="/" className="remove-todo-btn" onClick={this.removeToDo}>
            <img className="remove-icon" src={removeIcon} alt="remove-icon"></img>
          </Link>

         </span>
      </Router>
    );
  }

  completeToDo = () => {
    const listItems = appJson.listItems;
    const currentList = this.props.selectedList;
    const listIndex = listItems.findIndex(listItem => listItem.listID === currentList.listID);

    const toDoItems = listItems[listIndex].toDoItems;
    const toDoItemToCompleted = this.props.toDoItem;
    const toDoIndex = toDoItems.findIndex(toDoItem => toDoItems.toDoID === toDoItemToCompleted.toDoID);

    if (toDoIndex !== undefined) {
      toDoItems.splice(toDoIndex, 1);
    }
    listItems[listIndex].toDoItems = toDoItems;
    listItems[listIndex].completedItems.push(toDoItemToCompleted);

    this.props.updateToDoChanges(listItems[listIndex]);
  }

  removeToDo = () => {
    const listItems = appJson.listItems;
    const currentList = this.props.selectedList;
    const listIndex = listItems.findIndex(listItem => listItem.listID === currentList.listID);

    const toDoItems = listItems[listIndex].toDoItems;
    const toDoItemToRemoved = this.props.toDoItem;
    const toDoIndex = toDoItems.findIndex(toDoItem => toDoItems.toDoID === toDoItemToRemoved.toDoID);
    console.log("removedan önce list",toDoItems);
    console.log("silinecekItem", toDoItemToRemoved);
    console.log("silinecek item in indexi", toDoIndex);
    if (toDoIndex !== undefined) {
      toDoItems.splice(toDoIndex, 1);
    }
    console.log("silindikten sonra liste", toDoItems);

    listItems[listIndex].toDoItems = toDoItems;
    this.props.updateToDoChanges(listItems[listIndex]);
  }
}

export default ToDoItem;