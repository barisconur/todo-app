import React from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import {InputGroup, FormControl } from 'react-bootstrap';

import plusIcon from '../../../../../assets/icons/plus-icon.svg';

import appJson from '../../../../../app';

import '../view/ToDoPanelView.scss';

const shortid = require('shortid');

export default class AddToDo extends React.Component {
  constructor(props) {
    super(props);

    this.userInput = React.createRef();
    
    this.state = {
      input: ""
    }
  }

  render() {
    return (
        <div className="add-todo-container">
          <Router>
            <span className="add-item-wrapper">
              <Link to="/" className="add-item-btn" onClick= {this.addTodoItem}>
               <img className="add-icon" src={plusIcon} alt="add-icon"/>
              </Link>
            </span>
          </Router>

          <InputGroup className="mb-3" onKeyPress={this.eventHandlerForEnterKey}>
            <FormControl className="add-todo-field"
              ref= {this.userInput}
              type= "text"
              maxLength= "200"
              placeholder= "Add a todo..." 
              aria-label="Todo-name"
              aria-describedby="basic-addon2"
              onChange={() => this.setInputComingFromUser()}/>
          </InputGroup>
        </div>
    );  
  }

  eventHandlerForEnterKey = (event) => {
    if (event.key === 'Enter') {
      this.addTodoItem();
    }
  }

  addTodoItem = () => {
    const userInput = this.state.input;
    if (userInput === "") {
      alert("You cannot add blank todo");
      return;
    }
    this.setState({
      toDoID: shortid.generate(),
      input: ""
    }, () => {
      this.clearInputField();
      const listItems = appJson.listItems;
      const selectedList = this.props.selectedList;
      
      const newToDoDetails = { creationDate: new Date(),
                               dueDate: null, 
                               reminderDate: null, 
                               starLevel: 0,
                               toDoDescription: "",
                               subTaskList: [],                           
                              };

      const newToDoStatus = { isStarred: false, 
                              isCompleted: false,
                              isDueTimeSet: false,
                            };
                            
      const newToDoItem = { listID: selectedList.listID,
                            toDoID: this.state.toDoID, 
                            toDoName: userInput, 
                            toDoStatus: newToDoStatus,
                            toDoDetails: newToDoDetails
                          };
      
      let currentIndex = appJson.listItems.findIndex(listItem => listItem.listID === selectedList.listID);
      let currentList = listItems[currentIndex];
      
      if (1 <= selectedList.listID && selectedList.listID <= 3) {  
        appJson.selectedList = currentList;
        currentList = listItems[0];
      } 
      appJson.selectedList = currentList;
      this.props.updateToDoChanges(currentList);
      
      currentList.toDoItems.push(newToDoItem);
    });
  }

  setInputComingFromUser = () => {
    this.setState({ input: this.userInput.current.value });
  }

  clearInputField = () => {
    this.userInput.current.value = "";
    this.userInput.current.placeholder = "Add a todo...";
  }
}