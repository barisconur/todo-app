import React from 'react';
import { Button } from 'react-bootstrap';

import '../view/ToDoContentPanelView.scss';

const shortid = require('shortid');

export default class ToDoContentPanelView extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="todo-content-container"> 
        { this.displayToDoName() }
      </div>
    );
  }

  displayToDoName = () => {
      const selectedToDo = this.props.selectedToDo;
      if (selectedToDo !== null) {
          return <h1>{selectedToDo.toDoName}</h1>
      }
  }
}