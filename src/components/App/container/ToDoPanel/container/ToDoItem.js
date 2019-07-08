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
    return (
      <Router>
         <span className="todo-item-wrapper">
          <Link to="/" className="checkbox-btn">
            <img className="checkbox-icon" src={checkBoxIcon} alt="checkbox-icon" onClick={this.completeToDo}></img>
          </Link>

          <h2 className="todo-item-text">Dummy Data</h2> 

          <Link to="/" className="remove-todo-btn" onClick={this.removeToDo}>
            <img className="remove-icon" src={removeIcon} alt="remove-icon" onClick={this.removeToDo}></img>
          </Link>

         </span>
      </Router>
    );
  }

  completeToDo = () => {
    //TO-DO
  }

  removeToDo = () => {
    //TO-DO
  }
}

export default ToDoItem;