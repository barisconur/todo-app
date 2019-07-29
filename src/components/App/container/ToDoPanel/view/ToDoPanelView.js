import React, { Fragment } from 'react';
import { Button } from 'react-bootstrap';

import inboxIcon from '../../../../../assets/background-images/inbox-big-icon.svg';
import starIcon from '../../../../../assets/background-images/star-big-icon.svg';
import todayIcon from '../../../../../assets/background-images/today-big-icon.svg';
import weekIcon from '../../../../../assets/background-images/this-week-big-icon.svg';

import AddToDo from '../container/AddToDo';
import Navbar from '../container/Navbar';
import ToDoItem from '../container/ToDoItem';
import SearchPanel from '../container/SearchPanel';

import '../view/ToDoPanelView.scss';

const shortid = require('shortid');

export default class ToDoPanelView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCompletedShown: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.renderThisSelectedList !== prevProps.renderThisSelectedList) {
      this.setState({ isCompletedShown: false });
    }
  }

  sendSelectedListToAppView = (selectedList) => { this.props.updateSelectedList(selectedList) }

  sendToDoItemToAppView = (toDoItem) => { this.props.updateSelectedToDo(toDoItem) }

  render() {
    return (
      <Fragment>
        { this.displayToDoPanel () }
      </Fragment>
    );
  }

  displayToDoPanel = () => {
    if (this.props.searchedWord.length !== 0) {
      return <SearchPanel searchedWord= {this.props.searchedWord} newSelectedList= {this.sendSelectedListToAppView} 
      updateToDo= {this.sendToDoItemToAppView}/>
    } else {
      return this.renderToDoPanel();
    }
  }

  renderToDoPanel = () => {
    return ( 
      <Fragment>
         <Navbar newSelectedListName= {this.props.renderThisSelectedList.listName}/>
         { this.renderAddToDoComponent() }
         { this.renderOpeningScene() }

         <div className="completed-items-container">
          { this.showCompletedButton() }
          { this.renderCompletedItems() }
        </div>
      </Fragment>
    )
  }

  renderOpeningScene = () => {
    if (this.props.renderThisSelectedList.toDoItems.length === 0) {
      return this.renderEmptyListPanel();
    } else {
      return  <div className="todo-items-container">
                { this.renderToDoItems() }
              </div>        
    }
  }

  renderEmptyListPanel = () => {
    return <div className="empty-todo-panel-container">
            <div className="empty-todo-container">
              { this.renderImageSrc() }
              { this.renderTextSrc() }
            </div>
          </div>
    
  }

  renderImageSrc = () => {
    switch(this.props.renderThisSelectedList.listName) {
      case 'Inbox'    : return <img className="empty-list-img" src={inboxIcon} alt="inbox-img"></img>
      case 'Starred'  : return <img className="empty-list-img" src={starIcon} alt="starred-img"></img>
      case 'Today'    : return <img className="empty-list-img" src={todayIcon} alt="today-img"></img>
      case 'This Week': return <img className="empty-list-img" src={weekIcon} alt="week-img"></img>
      default         : return <img className="empty-list-img" src={inboxIcon} alt="list-img"></img> // bu değişecek
    }
  }

  renderTextSrc = () => {
    const selectedListName = this.props.renderThisSelectedList.listName;
    switch(selectedListName) {
      case 'Inbox'    : return <h2 className="empty-list-text">{selectedListName + ' is empty. Please add some to-dos'}</h2>
      case 'Starred'  : return <h2 className="empty-list-text">You have no Starred to-do</h2>
      case 'Today'    : return <h2 className="empty-list-text">You have no to-do due today</h2>
      case 'This Week': return <h2 className="empty-list-text">You have no to-do due this week</h2>
      default         : return <h2 className="empty-list-text">{selectedListName + ' is empty. Please add some to-dos'}</h2> // bu değişecek
    }
  }

  renderAddToDoComponent = () => {
    return <AddToDo selectedList={this.props.renderThisSelectedList} updateList={this.sendSelectedListToAppView}/> 
  }

  renderToDoItems = () => {
    const selectedList = this.props.renderThisSelectedList;
    let incompletedToDos = [];

    if (selectedList !== undefined) {
      const allToDos = selectedList.toDoItems;

      if (allToDos.length !== 0) {
        allToDos.forEach((toDo) => {if (!toDo.toDoStatus.isCompleted) incompletedToDos.push(toDo);  
        })
      }
    }
    return incompletedToDos.map((toDoItem) => {
      return <ToDoItem selectedList= {selectedList} toDoItem= {toDoItem} key={shortid.generate()}
      updateList= {this.sendSelectedListToAppView} updateToDo= {this.sendToDoItemToAppView}/>
    })
  } 

  showCompletedButton = () => {
    const selectedList = this.props.renderThisSelectedList;
    let completedToDos = [];
    
    if (selectedList.toDoItems !== undefined) {
      const allToDos = selectedList.toDoItems;
      if (allToDos.length !== 0) allToDos.forEach((toDo) => { if (toDo.toDoStatus.isCompleted) completedToDos.push(toDo) })
      
      if (completedToDos.length === 0) return;
        return <Button className="show-completed-btn" variant="dark" size="sm" onClick={this.toggleShowButton}>
                SHOW COMPLETED TO-DOS
              </Button>
    }
  }

  toggleShowButton = () => {this.setState({ isCompletedShown: !this.state.isCompletedShown })}
  
  renderCompletedItems = () => {
    if(!this.state.isCompletedShown) return;  

    const selectedList = this.props.renderThisSelectedList;
    let completedToDos = [];

    if (selectedList !== undefined) {
      const allToDos = selectedList.toDoItems;
      if (allToDos.length !== 0) allToDos.forEach((toDo) => { if (toDo.toDoStatus.isCompleted) completedToDos.push(toDo) })

      return completedToDos.map((toDoItem) => {
        return <ToDoItem selectedList= {selectedList} toDoItem={toDoItem} key={shortid.generate()}
        updateList={this.sendSelectedListToAppView} updateToDo= {this.sendToDoItemToAppView}/>
      })
    }
  }
}