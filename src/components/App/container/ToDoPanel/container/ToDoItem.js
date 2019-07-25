import React, { Fragment } from 'react';
import { BrowserRouter as Router, NavLink} from 'react-router-dom';
import { MenuProvider, Menu, Item, Separator, Submenu } from 'react-contexify';

import checkBoxIcon from '../../../../../assets/icons/checkbox-icon.svg';
import checkBoxFilled from '../../../../../assets/icons/checkbox-filled-icon.svg';

import appJson from '../../../../../app';

import '../view/ToDoPanelView.scss';

const shortid = require('shortid');

export default class ToDoItem extends React.Component {

  render() {
    return (
      <Router>
         { this.renderToDoItem() }
      </Router>
    );
  }

  showToDoContentPanel = () => {
    const toDoItem = this.props.toDoItem;
    this.props.updateToDoContentPanel(toDoItem);
  }

  renderToDoItem = () => {
    const toDoItem = this.props.toDoItem;
    const uniqueID = shortid.generate();
    if (!toDoItem.toDoStatus.isCompleted) {
      return <Fragment>
                <MenuProvider id= {uniqueID}>
                  <span className="todo-item-wrapper">
                    <span className="checkbox-btn" onClick={this.toggleCompleteToDo}>
                      <img className="checkbox-icon" src={checkBoxIcon} alt="checkbox-icon"></img>
                    </span>

                    <NavLink to={"/todos/" + this.props.toDoItem.toDoID} className="todopanel-todo-link" onClick= {this.showToDoContentPanel}>
                      <h2 className="todo-item-text">{toDoItem.toDoName}</h2>
                      { this.showDueDate() }
                    </NavLink>
                  </span>
                </MenuProvider>
                { this.renderToDoMenu(uniqueID) }
             </Fragment>
    } else {
      return <span className="completed-item-wrapper">   

              <span className="checkbox-filled-btn" onClick={this.toggleCompleteToDo}>
                <img className="checkbox-filled-icon" src={checkBoxFilled} alt="checkbox-Filled-icon"></img>
              </span>
              <NavLink to={"/todos/" + this.props.toDoItem.toDoID} className="todopanel-todo-link" onClick= {this.showToDoContentPanel}>
              <h2 className="completed-item-text">{toDoItem.toDoName}</h2> 
              </NavLink> 

            </span>
    }
  }

  showDueDate = () => {
    const date = this.props.selectedDate;
    console.log(date);
    if (this.props.selectedDate !== undefined) {
      if (date !== null) {
        const currentDate = new Date().toDateString();
        const selectedDate = date.toDateString();
        const currentDateSplitted = currentDate.split(" ");
        const selectedDateSplitted = selectedDate.split(" ");
  
        let dateMessage = "";
        let selectedMonthAsNumber = "";
      
        if ((currentDateSplitted[1] === selectedDateSplitted[1]) && currentDateSplitted[3] === selectedDateSplitted[3]) {
          if (currentDateSplitted[2] === selectedDateSplitted[2]) {
            dateMessage = "Today";
          } else if (currentDateSplitted[2] - selectedDateSplitted[2] === -1) {
            dateMessage = "Tomorrow"
          } else {
            selectedMonthAsNumber = this.convertMonthToNumber(selectedDateSplitted);
            dateMessage = selectedDateSplitted[2] + "." + selectedMonthAsNumber + "." + selectedDateSplitted[3];  
          }
        } else {
          selectedMonthAsNumber = this.convertMonthToNumber(selectedDateSplitted);
          dateMessage = selectedDateSplitted[2] + "." + selectedMonthAsNumber + "." + selectedDateSplitted[3];  
        }
        return <h2 className="todo-item-date">{dateMessage}</h2>
      }
    }
  }

  convertMonthToNumber = (selectedDateSplitted) => {
    let month = "";

    switch(selectedDateSplitted[1]) {
      case 'Jan': month = "01"; break;
      case 'Feb': month = "02"; break;
      case 'Mar': month = "03"; break;
      case 'Apr': month = "04"; break;
      case 'May': month = "05"; break;
      case 'Jun': month = "06"; break;
      case 'Jul': month = "07"; break;
      case 'Aug': month = "08"; break;
      case 'Sep': month = "09"; break;
      case 'Oct': month = "10"; break;
      case 'Nov': month = "11"; break;
      case 'Dec': month = "12"; break;
    }
    return month;
  }

  renderToDoMenu = (uniqueID) => {
    return <Menu id= {uniqueID}>
            <Submenu label= "Move to-do to...">
              <Item >Foo</Item>
              <Item >Bar</Item>
            </Submenu>
          
            <Item >Save as pdf </Item>
            <Separator />
            <Item onClick= {this.removeToDo}>Remove to-do </Item>
           </Menu>
  }

  removeToDo = () => {
    const answer = window.confirm("Are you sure remove this todo?");
    if (!answer) return;

    const listItems = appJson.listItems;
    const selectedList = this.props.selectedList;
    const currentIndex = listItems.findIndex(listItem => listItem.listID === selectedList.listID);
    const currentList = listItems[currentIndex];

    const toDoItems = currentList.toDoItems;
    const currentToDoItem = this.props.toDoItem;
    const currentToDoIndex = toDoItems.findIndex((toDoItem) => toDoItem.toDoID === currentToDoItem.toDoID);

    if (currentToDoIndex !== undefined) toDoItems.splice(currentToDoIndex, 1);
    currentList.toDoItems = toDoItems;
    this.props.updateToDoContentPanel();

    if (this.props.isSearchRendering) {
      this.props.updateThisSearchPanel(listItems);
      return;
    }

    this.props.updateToDoChanges(currentList);
  }

  toggleCompleteToDo = (event) => {
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
    } else {
      currentToDo.toDoStatus.isCompleted = false;
    }

    if (this.props.isSearchRendering) {
      this.props.updateThisSearchPanel(listItems);
      return;
    }
    this.props.updateToDoChanges(currentList);
  }
}