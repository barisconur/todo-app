import React from 'react';
import { BrowserRouter as Router, Link, NavLink} from 'react-router-dom';
import checkBoxIcon from '../../../../../assets/icons/checkbox-icon.svg';
import removeIcon from '../../../../../assets/icons/remove-icon.svg';
import appJson from '../../../../../app';
import '../view/ToDoPanelView.css';

export default class ToDoItem extends React.Component {

  render() {
    const toDoItem = this.props.toDoItem;
    console.log("gelen todo item", toDoItem);

    return (
      <Router>
        <NavLink to={"/todos/" + toDoItem.toDoID} className="todopanel-todo-link">
          <span className="todo-item-wrapper">
            <span className="checkbox-btn" onClick={this.handleToDoItem}>
              <img className="checkbox-icon" src={checkBoxIcon} alt="checkbox-icon"></img>
            </span>

            <h2 className="todo-item-text">{toDoItem.toDoName}</h2> 

            <span className="remove-todo-btn" onClick={this.handleToDoItem}>
              <img className="remove-icon" src={removeIcon} alt="remove-icon"></img>
            </span>

          </span>
        </NavLink>
        
      </Router>
    );
  }

  // handleToDoItem = (event) => {
  //   const listItems = appJson.listItems;
  //   const selectedList = this.props.selectedList;
  //   const currentIndex = listItems.findIndex(listItem => listItem.listID === selectedList.listID);

  //   const currentList = listItems[currentIndex];
  //   const toDoItems = currentList.toDoItems;
  //   const currentToDoItem = this.props.toDoItem;
  //   const currentToDoIndex = toDoItems.findIndex((toDoItem) => toDoItem.toDoID === currentToDoItem.toDoID);

  //   if (currentToDoIndex !== undefined) toDoItems.splice(currentToDoIndex, 1);

  //   currentList.toDoItems = toDoItems;
  //   if (event.target.className === "checkbox-icon" || event.target.className === "checkbox-btn") currentList.completedItems.push(currentToDoItem);
  //   if (this.props.isSearchRendering) {
  //     return;
  //   }
  //   this.props.updateToDoChanges(currentList);
  // }
}