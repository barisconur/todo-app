import React from 'react';
import '../view/ToDoPanelView';
import AddToDo from '../container/AddToDo';
import ToDoItem from '../container/ToDoItem';
import Navbar from '../container/Navbar';

class ToDoPanelView extends React.Component {
  constructor() {
    super();
    
    this.state = {
      toDoList: [],
      toDoName: "",
      toDoID: 0
    }
  }

  render() {
    return (
      <div className="todo-panel-container">
        <Navbar/>
        <AddToDo toDoName={this.addToDoItem}/>
      </div>
    );
  }

  addToDoItem = (toDoItemName) => {
    this.setItemName(toDoItemName);

    this.setState(prevState =>({
      toDoList:[...this.state.toDoList, { name: toDoItemName, id:this.state.toDoID }],
      todoID: prevState.todoID + 1
    }));
    console.log(this.state.toDoList);
  }

  setItemName(toDoName) {
    this.setState({
      toDoName: toDoName
    });
  }
}

export default ToDoPanelView;