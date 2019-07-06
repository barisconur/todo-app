import React from 'react';
import { Button } from 'react-bootstrap';
import '../view/ToDoPanelView.css';
import checkBoxIcon from '../../../../../assets/checkbox-icon.svg';
import removeIcon from '../../../../../assets/remove-icon.svg';

class ToDoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRemoved: false,
      isCompleted: false
    };
  }

  render() {
    return (
      <div className="todo-item-container">
        <button className="checkbox-btn" onClick={this.completeToDo}>
         <img className="checkbox-icon" src={checkBoxIcon} alt="checkbox-icon"></img>
        </button>
        <h2 className="todo-item-text">{this.props.toDoItem.toDoName}</h2> 
  
        <button className="remove-btn" onClick={this.removeToDo}>
         <img className="remove-icon" src={removeIcon} alt="remove-icon"></img>
        </button>
    </div>
    );
  }

  removeToDo = () => {
    this.setState({
      isRemoved: true
    }, () => {
      if (this.state.isRemoved) {
        this.props.remove(this.props.toDoItem, this.state.isRemoved);
      } 
    });
  }

  completeToDo = () => {
    this.setState({
      isCompleted: true
    }, () => {
      if (this.state.isCompleted) {
        this.props.complete(this.props.toDoItem, this.state.isCompleted);
      }
    });
  }
}

export default ToDoItem;