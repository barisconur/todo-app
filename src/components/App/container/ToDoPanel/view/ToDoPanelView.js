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
      this.setState({
        isCompletedShown: false,
      });
    }
  }

  render() {
    return (
      <Fragment>
        { this.displayToDoPanel () }
      </Fragment>
    );
  }

  displayToDoPanel = () => {
    if (this.props.searchedWord.length !== 0) {
      return <SearchPanel searchedWord= {this.props.searchedWord} newSelectedList= {this.sendNewSelected} 
      updateToDoContentPanel= {this.sendToDoItemToAppView}/>
    } else {
      return this.renderToDoPanel();
    }
  }

  sendNewSelected = (listItem) => {
    console.log(listItem);
    this.props.updateThisSelectedList(listItem);
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
            { this.renderSpecificEmptyPanel() }
          </div>
    
  }

  renderSpecificEmptyPanel = () => {
    const selectedList = this.props.renderThisSelectedList;

    switch(selectedList.listName) {
      case 'Inbox'    : return <div className="empty-todo-container"> 
                                <img className="empty-list-img" src={inboxIcon} alt="inbox-img"></img>
                                <h2 className="empty-list-text">{selectedList.listName + ' is empty. Please add some to-dos'}</h2>
                              </div>

      case 'Starred'  : return <div className="empty-todo-container"> 
                                <img className="empty-list-img" src={starIcon} alt="starred-img"></img>
                                <h2 className="empty-list-text">You have no Starred to-do</h2>
                              </div>
      
      case 'Today'    : return <div className="empty-todo-container"> 
                                <img className="empty-list-img" src={todayIcon} alt="today-img"></img>
                                <h2 className="empty-list-text">You have no to-do due today</h2>
                              </div>
                              
      case 'This Week': return <div className="empty-todo-container"> 
                                <img className="empty-list-img" src={weekIcon} alt="week-img"></img>
                                <h2 className="empty-list-text">You have no to-do due this week</h2>
                              </div>

      default         : return <div className="empty-todo-container"> 
                                <img className="empty-list-img" src={inboxIcon} alt="list-img"></img>
                                <h2 className="empty-list-text">{selectedList.listName + ' is empty. Please add some to-dos'}</h2>
                              </div>
    }
  }

  renderAddToDoComponent = () => {
    const selectedList = this.props.renderThisSelectedList;
    return <AddToDo selectedList= {selectedList} updateToDoChanges={this.sendSelectedListToAppView}/> 
  }

  sendSelectedListToAppView = (newSelectedList) => {
    this.props.updateThisSelectedList(newSelectedList);
  }

  sendToDoItemToAppView = (toDoItem) => {
    this.props.updateSelectedToDoItem(toDoItem);
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
      updateToDoChanges= {this.sendSelectedListToAppView} updateToDoContentPanel= {this.sendToDoItemToAppView}/>
    })
  } 

  showCompletedButton = () => {
    const selectedList = this.props.renderThisSelectedList;
    let completedToDos = [];
    
    if (selectedList.toDoItems !== undefined) {
      const allToDos = selectedList.toDoItems;
      if (allToDos.length !== 0) {
        allToDos.forEach((toDo) => { if (toDo.toDoStatus.isCompleted) completedToDos.push(toDo); 
        })
      }
      if(completedToDos.length === 0) return;
        return <Button className="show-completed-btn" variant="dark" size="sm" onClick={this.toggleShowButton}>
                SHOW COMPLETED TO-DOS
              </Button>
    }
  }

  toggleShowButton = () => {
    this.setState({
      isCompletedShown: !this.state.isCompletedShown
    });
  }
  
  renderCompletedItems = () => {
    if(!this.state.isCompletedShown) return;  

    const selectedList = this.props.renderThisSelectedList;
    let completedToDos = [];

    if (selectedList !== undefined) {
      const allToDos = selectedList.toDoItems;

      if (allToDos.length !== 0) {
        allToDos.forEach((toDo) => { if (toDo.toDoStatus.isCompleted) completedToDos.push(toDo);
        })
      }
        return completedToDos.map((toDoItem) => {
          return <ToDoItem selectedList= {selectedList} toDoItem={toDoItem} key={shortid.generate()}
          updateToDoChanges={this.sendSelectedListToAppView} updateToDoContentPanel= {this.sendToDoItemToAppView}/>
        })
      
    }
  }
}