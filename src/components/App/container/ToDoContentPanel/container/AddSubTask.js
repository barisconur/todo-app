import React, { Fragment } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

import plusIcon from '../../../../../assets/icons/plus-icon.svg';

import '../view/ToDoContentPanelView.scss';
import { findCurrentToDoInJSON } from '../../../utils';

const shortid = require('shortid');

export default class AddSubTask extends React.Component {
  constructor(props) {
    super(props); 

    this.userInput = React.createRef();
    this.state = {
      subTaskName: ""
    }
  }

   render() {
      return (
        <Fragment>
            <span className="plus-icon-wrapper" onClick={this.addSubTask}>
                <img className="plus-icon" src={plusIcon} alt="plus-icon"></img>
            </span>

            { this.renderAddSubtaskField() }
        </Fragment>
      );
   } 

   renderAddSubtaskField = () => {
     if (!this.props.selectedToDo.toDoStatus.isCompleted) {
       return <InputGroup className="add-subtask-field" onKeyPress={this.handleEnterKeyEvent}>
                <FormControl className="subtask-field"
                ref= {this.userInput}
                placeholder="Add a subtask"
                aria-label="Subtask-name"
                aria-describedby="basic-addon2"
                onChange={ () => this.handleChange() }/>
          </InputGroup>
     } else {
      return <InputGroup className="add-subtask-field" onKeyPress={this.handleEnterKeyEvent}>
              <FormControl className="subtask-field"
              disabled
              ref= {this.userInput}
              placeholder="Add a subtask"
              aria-label="Subtask-name"
              aria-describedby="basic-addon2"
              onChange={ () => this.handleChange() }/>
            </InputGroup>
     }
   }

   handleEnterKeyEvent = (event) => {
     if (event.key === 'Enter') {
       this.addSubTask();
     }
   }

   addSubTask = () => {
    if (this.isNotEmpty(this.state.subTaskName)) {
      alert("Please enter not an empty text");
      return;
    }
    const selected = findCurrentToDoInJSON(this.props.selectedList, this.props.selectedToDo);
    const newSubTask = { subTaskID: shortid.generate(),
                         subTaskName: this.state.subTaskName,
                         isCompleted: false
                       }
    this.clearInput();

    selected.toDoDetails.subTaskList.push(newSubTask);
    this.props.updateSelectedToDo(selected);
   }

   isNotEmpty = (input) => (input.length === 0) ? true : false;

   clearInput = () => {
     this.userInput.current.value= "";
     this.userInput.current.placeholder= "Add a subtask"; 
  }

   handleChange = () => {
     this.setState({
      subTaskName: this.userInput.current.value
     });
   }

}