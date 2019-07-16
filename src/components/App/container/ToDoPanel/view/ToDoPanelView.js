import React from 'react';
import { Button } from 'react-bootstrap';
import AddToDo from '../container/AddToDo';
import Navbar from '../container/Navbar';
import ToDoItem from '../container/ToDoItem';
import CompletedItem from '../container/CompletedItem';
import SearchPanel from '../container/SearchPanel';
import '../view/ToDoPanelView.css';
import appJson from '../../../../../app'
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

     <div className="todo-items-container">
       { this.renderToDoItems() }
     </div>

     <div className="completed-items-container">
       {/* { this.showCompletedButton() } */}
       {/* { this.renderCompletedItems() } */}
     </div>
   </div>
    )
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
    if (selectedList !== undefined) {
      if (selectedList.toDoItems !== undefined) {
        return selectedList.toDoItems.map((toDoItem) => {
          return <ToDoItem selectedList= {selectedList} toDoItem= {toDoItem} key={shortid.generate()}
          updateToDoChanges= {this.sendSelectedListToAppView}/>
        })
      }
    }
  } 

  // showCompletedButton = () => {
  //   const selectedList = this.props.renderThisSelectedList;

  //   if (selectedList.completedItems !== undefined) {
  //     if(selectedList.completedItems.length === 0) return;
  //       return <Button className="show-completed-btn" variant="dark" size="sm" onClick={this.toggleShowButton}>
  //               SHOW COMPLETED TO-DOS
  //             </Button>
  //   }
  // }

  toggleShowButton = () => {
    this.setState({
      isCompletedShown: !this.state.isCompletedShown
    });
  }
  
  // renderCompletedItems = () => {
  //   if(!this.state.isCompletedShown) return;
  //   const selectedList = this.props.renderThisSelectedList;

  //   if (selectedList !== undefined) {
  //     if (selectedList.completedItems !== undefined) {
  //       return selectedList.completedItems.map((toDoItem) => {
  //         return <CompletedItem selectedList= {selectedList} toDoItem={toDoItem} key={shortid.generate()}
  //         updateToDoChanges={this.sendSelectedListToAppView} updateToDoWithoutSelectList={this.updateSelectedList}/>
  //       })
  //     }
  //   }
  // }
}