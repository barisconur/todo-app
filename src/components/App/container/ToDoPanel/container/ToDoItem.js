import React from 'react';
import '../view/ToDoPanelView.css';
import checkBoxIcon from '../../../../../assets/icons/checkbox-icon.svg';
import removeIcon from '../../../../../assets/icons/remove-icon.svg';

class ToDoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRemoved: false,
      isCompleted: false
    };
  }

  render() {
    const toDoName = this.props.toDoItem.toDoName
    return (
      <div className="todo-item-container">
        <button className="checkbox-btn" onClick={this.completeToDo}>
         <img className="checkbox-icon" src={checkBoxIcon} alt="checkbox-icon"></img>
        </button>
        <h2 className="todo-item-text">{toDoName}</h2> 
  
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
        this.props.itemToRemove(this.props.toDoItem, this.state.isRemoved);
      } 
    });
  }

  completeToDo = () => {
    this.setState({
      isCompleted: true
    }, () => {
      if (this.state.isCompleted) {
        this.props.itemToComplete(this.props.toDoItem, this.state.isCompleted);
      }
    });
  }
}

export default ToDoItem;