import React from 'react';
import { BrowserRouter as Router, NavLink} from 'react-router-dom';

import checkBoxIcon from '../../../../../assets/icons/checkbox-icon.svg';
import checkBoxFilled from '../../../../../assets/icons/checkbox-filled-icon.svg';
import removeIcon from '../../../../../assets/icons/remove-icon.svg';

import appJson from '../../../../../app';

import '../view/ToDoPanelView.scss';

export default class ToDoItem extends React.Component {

  render() {
    return (
      <Router>
        <NavLink to={"/todos/" + this.props.toDoItem.toDoID} className="todopanel-todo-link" onClick= {this.showToDoContentPanel}>
          { this.renderToDoItem() }
       </NavLink>
      </Router>
    );
  }

  showToDoContentPanel = () => {
    const toDoItem = this.props.toDoItem;
    this.props.updateToDoContentPanel(toDoItem);
  }

  renderToDoItem = () => {
    const toDoItem = this.props.toDoItem;

    if (!toDoItem.toDoStatus.isCompleted) {
      return <span className="todo-item-wrapper">
        <span className="checkbox-btn" onClick={this.handleToDoItem}>
          <img className="checkbox-icon" src={checkBoxIcon} alt="checkbox-icon"></img>
        </span>

        <h2 className="todo-item-text">{toDoItem.toDoName}</h2> 

        <span className="remove-todo-btn" onClick={this.handleToDoItem}>
          <img className="remove-icon" src={removeIcon} alt="remove-icon"></img>
        </span>
      </span>
    } else {
      return <span className="completed-item-wrapper">    
        <span className="checkbox-filled-btn" onClick={this.handleToDoItem}>
          <img className="checkbox-filled-icon" src={checkBoxFilled} alt="checkbox-Filled-icon"></img>
        </span>

        <h2 className="completed-item-text">{toDoItem.toDoName}</h2> 

        <span className="remove-todo-btn" onClick={this.handleToDoItem}>
          <img className="remove-icon" src={removeIcon} alt="remove-icon"></img>
        </span>
      </span>
    }
  }

  handleToDoItem = (event) => {
    const listItems = appJson.listItems;
    const selectedList = this.props.selectedList;
    const currentIndex = listItems.findIndex(listItem => listItem.listID === selectedList.listID);
    const currentList = listItems[currentIndex];

    const toDoItems = currentList.toDoItems;
    const currentToDoItem = this.props.toDoItem;
    const currentToDoIndex = toDoItems.findIndex((toDoItem) => toDoItem.toDoID === currentToDoItem.toDoID);
    const currentToDo = toDoItems[currentToDoIndex];

    if (event.target.className === 'checkbox-icon' || event.target.className === 'checkbox-btn') {
      currentToDo.toDoStatus.isCompleted = true;
    } else if (event.target.className === 'checkbox-filled-icon' || event.target.className === 'checkbox-filled-btn') {
      currentToDo.toDoStatus.isCompleted = false;
    } else {
      if (currentToDoIndex !== undefined) toDoItems.splice(currentToDoIndex, 1);
      currentList.toDoItems = toDoItems;
    } 

    if (this.props.isSearchRendering) {
      this.props.updateThisSearchPanel(listItems);
      return;
    }

    this.props.updateToDoChanges(currentList);
  }
}