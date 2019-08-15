import React from 'react';
import { BrowserRouter as Router, NavLink} from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { MenuProvider, Menu, Item, Separator, Submenu } from 'react-contexify';

import checkBoxIcon from '../../../../../assets/icons/checkbox-icon.svg';
import checkBoxFilled from '../../../../../assets/icons/checkbox-filled-icon.svg';

import { findCurrentToDoInJSON, findCurrentToDoIndex, findCurrentList } from '../../../utils';

import appJson from '../../../../../app';

import '../view/ToDoPanelView.scss';

export default class ToDoItem extends React.Component {

  render() {
    const toDoItem = this.props.toDoItem;
    return (
      <Router>
        <MenuProvider id= {toDoItem.toDoID}>
          { this.renderToDoItem(toDoItem) }
        </MenuProvider>

        { this.renderToDoMenu(toDoItem.toDoID) }
      </Router>
    );
  }

  updateToDo = () => { this.props.updateToDo(this.props.toDoItem) }

  renderToDoItem = (toDoItem) => {
    const status = this.props.toDoItem.toDoStatus.isCompleted;
    switch(status) {
      case false: return <span className="todo-item-wrapper">
                          <span className="checkbox-btn" onClick={this.toggleCompleteToDo}>
                            <img className="checkbox-icon" src={checkBoxIcon} alt="checkbox-icon"></img>
                          </span>

                          <NavLink to={"/todos/" + toDoItem.toDoID} className="todopanel-todo-link" onClick= {this.updateToDo}>
                            <h2 className="todo-item-text">{toDoItem.toDoName}</h2>
                            { this.showDueDate() }
                          </NavLink>
                          <div className="star-level-container"> { this.showStars() }</div>
                        </span>

     case true: return <span className="completed-item-wrapper">   
                        <span className="checkbox-filled-btn" onClick={this.toggleCompleteToDo}>
                          <img className="checkbox-filled-icon" src={checkBoxFilled} alt="checkbox-Filled-icon"></img>
                        </span>

                        <NavLink to={"/todos/" + this.props.toDoItem.toDoID} className="todopanel-todo-link" onClick={this.updateToDo}>
                        <h2 className="completed-item-text">{toDoItem.toDoName}</h2> 
                        { this.showDueDate() }
                        </NavLink> 
                        <div className="star-level-container"> { this.showStars() }</div>
                      </span>

     default : return null;
    }
  }

  toggleCompleteToDo = (event) => {
    const currentList = this.props.toDoItem.listID;
    const currentToDo = findCurrentToDoInJSON(currentList, this.props.toDoItem);

    if (event.target.className === 'checkbox-icon' || event.target.className === 'checkbox-btn') {
      currentToDo.toDoStatus.isCompleted = true;
    } else {
      currentToDo.toDoStatus.isCompleted = false;
    }

    if (this.props.isSearchRendering) {
      this.props.updateThisSearchPanel(appJson.listItems);
      this.props.updateToDo(currentToDo);
      return;
    }

    this.props.updateToDo(currentToDo);
  }

  showDueDate = () => {
    const selectedDate = this.props.toDoItem.toDoDetails.dueDate;
    if (selectedDate === null) return;
    if (selectedDate !== undefined) return <h2 className="todo-item-date">{ this.setDateMessage(selectedDate) }</h2>
  }

  showStars = () => {
    const starCount = this.props.toDoItem.toDoDetails.starLevel;
    if (starCount !== undefined) {
      if (this.props.toDoItem.toDoStatus.isCompleted) {
        return  <StarRatings className="todo-item-star-rating"
        name='starLevel'
        rating= {starCount}
        numberOfStars={5}
        starEmptyColor= 'rgb(255, 255, 255)'
        starRatedColor= 'rgb(241, 241, 31)'
        starDimension= '25px'
        starSpacing= '0.1px'/>
      } else {
        return  <StarRatings className="todo-item-star-rating"
        name='starLevel'
        rating= {starCount}
        numberOfStars={5}
        starRatedColor= 'rgb(241, 241, 31)'
        starHoverColor= 'rgb(241, 241, 31)'
        starDimension= '25px'
        starSpacing= '0.1px'
        changeRating= {this.setStarLevel}/>
      }
    }
  }

  setStarLevel = (newRating) => { this.updateStarLevelInJSON(newRating, this.props.toDoItem.listID, this.props.toDoItem) }

  updateStarLevelInJSON = (starLevel, listID, toDo) => {
    const currentList = findCurrentList(listID);
    const currentToDo = findCurrentToDoInJSON(currentList, toDo);

    currentToDo.toDoStatus.isStarred = true;
    currentToDo.toDoDetails.starLevel = starLevel;
    this.props.updateToDo(currentToDo);
  } 

  readStarLevelFromJSON = () => {
    if (this.props.selectedToDo === undefined) return;
    
    const currentList = findCurrentList(this.props.toDoItem.listID);
    const currentToDo = findCurrentToDoInJSON(currentList, this.props.toDoItem);

    return currentToDo.toDoDetails.starLevel;
  }

  setDateMessage = (date) => {
    let dateMessage = "";
    let selectedMonthAsNumber = "";

    const currentDate = new Date().toDateString();
    const selectedDate = date.toDateString();

    const currDateArr = currentDate.split(" ");
    const selectedDateArr = selectedDate.split(" ");

    selectedMonthAsNumber = this.convertMonthToNumber(selectedDateArr);
    if ((currDateArr[1] === selectedDateArr[1]) && currDateArr[3] === selectedDateArr[3]) {
      if (currDateArr[2] === selectedDateArr[2]) {
        dateMessage = "Today";
      } else if (currDateArr[2] - selectedDateArr[2] === -1) {
        dateMessage = "Tomorrow"
      } else {
        dateMessage = selectedDateArr[2] + "." + selectedMonthAsNumber + "." + selectedDateArr[3];  
      }
    } else {
      dateMessage = selectedDateArr[2] + "." + selectedMonthAsNumber + "." + selectedDateArr[3];  
    }
    return dateMessage;
  }

  convertMonthToNumber = (selectedDateArr) => {
    let month = "";

    switch(selectedDateArr[1]) {
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
      default: month = -1;
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
            <Item onClick={this.removeToDo}>Remove to-do </Item>
           </Menu>
  }

  removeToDo = () => {
    const answer = window.confirm("Are you sure remove this todo?");
    if (!answer) return;

    const currentList = findCurrentList(this.props.toDoItem.listID);
    const index = findCurrentToDoIndex(currentList, this.props.toDoItem);
    
    if (index !== undefined) currentList.toDoItems.splice(index, 1);
    this.props.updateToDo();

    if (this.props.isSearchRendering) {
      this.props.updateThisSearchPanel(appJson.listItems);
      return;
    }
    this.props.updateList(currentList);
  }
}