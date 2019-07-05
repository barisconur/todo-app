import React from 'react';
import { Button } from 'react-bootstrap';
import '../view/ToDoPanelView';
import AddToDo from '../container/AddToDo';
import Navbar from '../container/Navbar';
import ToDoItem from '../container/ToDoItem';

class ToDoPanelView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="todo-container">
        <Navbar selected={this.props.selected} />
        <AddToDo toDoName={this.addToDoItem} />

        <div className="todo-items-container">
          {this.renderToDoItems()}
        </div>

        <div className="completed-items-container">
        <Button className="show-completed-btn" variant="warning">
          Show completed todos
        </Button>
        {this.renderCompletedItems()}
        </div>
      </div>
    );
  }

  addToDoItem = (toDoItemName, toDoID) => {
    this.props.addedItem(toDoItemName, toDoID);
  }

  removeToDo = (toDoItem, isRemoved) => {
    this.props.itemWillBeRemoved(toDoItem, isRemoved);
  }

  completeToDo = (toDoItem, isCompleted) => {
    console.log("sonucu todopanel e geldi app e iletilecek", toDoItem);
    this.props.itemWillBeCompleted(toDoItem, isCompleted);
  }

  renderToDoItems = () => {
    const selected = this.props.selected;
    if (selected !== undefined) {
      if (selected.toDoItems.length !== 0) {
        return selected.toDoItems.map((toDoItem) => {
          return <ToDoItem toDoItem={toDoItem} key={toDoItem.toDoID} id={toDoItem.toDoID}
            remove={this.removeToDo} complete={this.completeToDo} />
        })
    } else {
        return null;
      }
    }
  }

  renderCompletedItems = () => {
    const selected = this.props.selected;
    if (selected !== undefined) {
      if (selected.completedItems.length !== 0) {
        return selected.completedItems.map((completedToDo) => {
          return <ToDoItem toDoItem={completedToDo} key={completedToDo.toDoID} id={completedToDo.toDoID}
            remove={this.removeToDo} complete={this.completeToDo} />
        })
    } else {
        return null;
      }
    }
  }
}

export default ToDoPanelView;