import React from 'react';
import { Button } from 'react-bootstrap';

import inboxIcon from '../../../../../assets/background-images/inbox-big-icon.svg';
import starIcon from '../../../../../assets/background-images/star-big-icon.svg';
import todayIcon from '../../../../../assets/background-images/today-big-icon.svg';
import weekIcon from '../../../../../assets/background-images/this-week-big-icon.svg';

import AddToDo from '../container/AddToDo';
import Navbar from '../container/Navbar';
import ToDoItem from '../container/ToDoItem';
import SearchPanel from '../container/SearchPanel';
import '../view/ToDoPanelView.css';

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
      <div className="todo-container"> 
        { this.displayPanel () }
      </div>
    );
  }

  displayPanel = () => {
    if (this.props.searchedWord.length !== 0) {
      return <SearchPanel searchedWord= {this.props.searchedWord} newSelectedList= {this.sendNewSelected}/>
    } else {
      return this.renderToDoPanel();
    }
  }

  sendNewSelected = (listItem) => {
    console.log(listItem);
    this.props.updateThisSelectedList(listItem);
  }

  renderToDoPanel = () => {
    console.log(this.props.renderThisSelectedList);
    return ( 
      <div className="render-todo-container">
        <Navbar newSelectedListName= {this.props.renderThisSelectedList.listName}/>
        { this.renderAddToDoComponent() }
        { this.renderOpeningScene() }

     <div className="completed-items-container">
       { this.showCompletedButton() }
       { this.renderCompletedItems() }
     </div>
   </div>
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
                                <h2 className="empty-list-text">{selectedList.listName + ' is empty. Please add some todos'}</h2>
                              </div>

      case 'Starred'  : return <div className="empty-todo-container"> 
                                <img className="empty-list-img" src={starIcon} alt="starred-img"></img>
                                <h2 className="empty-list-text">{selectedList.listName + " You have no Starred todo"}</h2>
                              </div>
      
      case 'Today'    : return <div className="empty-todo-container"> 
                                <img className="empty-list-img" src={todayIcon} alt="today-img"></img>
                                <h2 className="empty-list-text">{selectedList.listName + " You have no todo due today "}</h2>
                              </div>
      case 'This Week': return <div className="empty-todo-container"> 
                                <img className="empty-list-img" src={weekIcon} alt="week-img"></img>
                                <h2 className="empty-list-text">{selectedList.listName + " You have no todo due this week"}</h2>
                              </div>

      default         : return <div className="empty-todo-container"> 
                                <img className="empty-list-img" src={inboxIcon} alt="list-img"></img>
                                <h2 className="empty-list-text">{selectedList.listName + ' is empty. Plase add some todos'}</h2>
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
      updateToDoChanges= {this.sendSelectedListToAppView}/>
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
          updateToDoChanges={this.sendSelectedListToAppView}/>
        })
      
    }
  }
}