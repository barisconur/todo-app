import React from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
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
      <Router>
         <span className="todo-item-wrapper">
          <Link to="/" className="checkbox-btn">
            <img className="checkbox-icon" src={checkBoxIcon} alt="checkbox-icon" onClick={this.completeToDo}></img>
          </Link>

          <h2 className="todo-item-text">{toDoName}</h2> 

          <Link to="/" className="remove-todo-btn" onClick={this.removeToDo}>
            <img className="remove-icon" src={removeIcon} alt="remove-icon" onClick={this.removeToDo}></img>
          </Link>

         </span>
      </Router>
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