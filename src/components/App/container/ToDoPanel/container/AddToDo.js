import React from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import {InputGroup, FormControl } from 'react-bootstrap';
import '../view/ToDoPanelView';
import plusIcon from '../../../../../assets/icons/plus-icon.svg';
import appJson from '../../../../../app';

const shortid = require('shortid');

export default class AddToDo extends React.Component {
  constructor(props) {
    super(props);
    this.userInput = React.createRef();
    
    this.state = {
      input: "",
    }
  }

  render() {
    return (
        <div className="add-todo-container">
          <Router>
            <span className="add-item-wrapper">
              <Link to="/" className="add-item-btn" onClick={this.addTodoItem}>
               <img className="add-icon" src={plusIcon} alt="add-icon"/>
              </Link>
            </span>
          </Router>

          <InputGroup className="mb-3">
            <FormControl className="add-todo-field"
              ref= {this.userInput}
              type= "text"
              placeholder= "Add todo..." 
              aria-label="Todo-name"
              aria-describedby="basic-addon2"
              onChange={() => this.setInputComingFromUser()}/>
          </InputGroup>
        </div>
    );
  }

  addTodoItem = () => {
    const userInput = this.state.input;
    this.setInputComingFromUser();
    
    this.setState({
      toDoID: shortid.generate(),
      input: ""
    }, () => {
      this.clearInputField();
      const selectedList = this.props.selectedList;
      const listItems = appJson.listItems;
      const newToDoItem = {toDoID: this.state.toDoID, toDoName: userInput};

      const currentListIndex = appJson.listItems.findIndex(listItem => listItem.listID === selectedList.listID);
      const currentList = listItems[currentListIndex];

      currentList.toDoItems.push(newToDoItem);
      this.props.updateToDoChanges(currentList);
    });
  }

  setInputComingFromUser = () => {
    this.setState({
      input: this.userInput.current.value
    })
  }

  clearInputField = () => {
    this.userInput.current.value = "";
    this.userInput.current.placeholder = "Add todo...";
  }
}