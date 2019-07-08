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
        <Navbar/>
        <div className="todo-items-container">
        </div>

        <div className="completed-items-container">
        </div>
      </div>
    );
  }

  renderAddToDoComponent = () => {
    //TO-DO
  }

  renderToDoItems = () => {
   //TO-DO
  }

  renderCompletedItems = () => {
    //TO-DO
  }

  showCompletedButton = () => {
    //TO-DO
  }

  toggleShowButton = () => {
    this.setState({
      isCompletedShown: !this.state.isCompletedShown
    });
  }
}

export default ToDoPanelView;