import React from 'react';
import { Button } from 'react-bootstrap';
import '../view/ToDoPanelView';
import AddToDo from '../container/AddToDo';
import Navbar from '../container/Navbar';
import ToDoItem from '../container/ToDoItem';
import CompletedItem from '../container/CompletedItem';

const shortid = require('shortid');

class ToDoPanelView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCompletedShown: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.renderThisSelectedList !== prevProps.renderThisSelectedList) {
      this.setState({
        isCompletedShown: false
      });
    }
  }

  render() {
    const selectedList = this.props.renderThisSelectedList;

    return (
      <div className="todo-container">
        <Navbar newSelectedListName= {selectedList.listName}/>
        { this.renderAddToDoComponent() }
        <div className="todo-items-container">
          { this.renderToDoItems() }
        </div>

        <div className="completed-items-container">
          { this.showCompletedButton() }
          { this.renderCompletedItems() }
        </div>
      </div>
    );
  }
  //

  renderAddToDoComponent = () => {
    const selectedList = this.props.renderThisSelectedList;
    if (selectedList !== undefined) {
      if (selectedList.listID !== 0 && typeof selectedList.listID !== "string") return;
      return <AddToDo selectedList= {selectedList} updateToDoChanges={this.sendUpdatedSelectedToView}/>
    }
  }

  sendUpdatedSelectedToView = (newSelected) => {
    this.props.updateThisSelectedList(newSelected);
  }

  renderToDoItems = () => {
    const selectedList = this.props.renderThisSelectedList;

    if (selectedList !== undefined) {
      if (selectedList.toDoItems !== undefined) {
        return selectedList.toDoItems.map((toDoItem) => {
          return <ToDoItem selectedList= {selectedList} toDoItem={toDoItem} key={shortid.generate()}
          updateToDoChanges={this.sendUpdatedSelectedToView}/>
        })
      }
    }
  }

  renderCompletedItems = () => {
    if(!this.state.isCompletedShown) return;
    const selectedList = this.props.renderThisSelectedList;

    if (selectedList !== undefined) {
      if (selectedList.completedItems !== undefined) {
        return selectedList.completedItems.map((toDoItem) => {
          return <CompletedItem selectedList= {selectedList} toDoItem={toDoItem} key={shortid.generate()}
          updateToDoChanges={this.sendUpdatedSelectedToView}/>
        })
      }
    }
  }

  showCompletedButton = () => {
    const selectedList = this.props.renderThisSelectedList;
    if (selectedList.completedItems !== undefined) {
      if(selectedList.completedItems.length === 0) return;
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
}

export default ToDoPanelView;