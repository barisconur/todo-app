import React from 'react';
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
        <Navbar selected={this.props.selected}/>
        <AddToDo toDoName={this.addToDoItem}/>
        <div className ="todo-items-container">
          {this.renderToDoItems()}
        </div>
      </div>
    );
  }

  addToDoItem = (toDoItemName, toDoID) => { // Add todo... ya basıldığında buraya gir
    this.props.addedItem(toDoItemName, toDoID);
  }

  renderToDoItems = () => {
    const selected = this.props.selected;
    if (selected !== undefined) {
      if (selected.toDoItems.length !== 0) {
        return selected.toDoItems.map((toDoItem) => {
          return <ToDoItem toDoItem={ toDoItem } key={ toDoItem.id } id={ toDoItem.id }/>
        })
      }
    } else {
      return null;
    }
  }
}

export default ToDoPanelView;