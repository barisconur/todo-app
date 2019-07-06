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
      isCompletedShown: false
    };
  }

  render() {
    return (
      <div className="todo-container">
        <Navbar selected={this.props.selected} />
        <AddToDo toDoName={this.addToDo} />

        <div className="todo-items-container">
          {this.renderToDoItems()}
        </div>

        <div className="completed-items-container">
        <Button className="show-completed-btn" variant="warning" onClick={this.toggleShowButton}>
          Show completed todos
        </Button>
        {this.renderCompletedItems()}
        </div>
      </div>
    );
  }

  addToDo = (toDoItemName, toDoID) => {
    this.props.itemWillBeRegistered(toDoItemName, toDoID);
  }

  removeToDo = (toDoItem, isRemoved) => {
    this.props.itemWillBeRemoved(toDoItem, isRemoved);
  }

  completeToDo = (toDoItem, isCompleted) => {
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
    if(!this.state.isCompletedShown) return;
    const selected = this.props.selected;

    if (selected !== undefined) {
      if (selected.completedItems !== undefined) {
        return selected.completedItems.map((completedToDo) => {
          return <CompletedItem completedItem={completedToDo} key={shortid.generate()}/>
        })
    } else {
        return null;
      }
    }
  }

  toggleShowButton = () => {
    this.setState({
      isCompletedShown: !this.state.isCompletedShown
    });
  }
}

export default ToDoPanelView;