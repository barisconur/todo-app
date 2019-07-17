import React from 'react';
import { Button } from 'react-bootstrap';
import AddToDo from '../container/AddToDo';
import Navbar from '../container/Navbar';
import ToDoItem from '../container/ToDoItem';
import SearchPanel from '../container/SearchPanel';
import appJson from '../../../../../app'
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
      return <SearchPanel searchedWord= {this.props.searchedWord}/>
    } else {
      return this.renderToDoPanel();
    }
  }

  renderToDoPanel = () => {
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
      return <h1>Please add some todos in this panel</h1>
    } else {
      return  <div className="todo-items-container">
                { this.renderToDoItems() }
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