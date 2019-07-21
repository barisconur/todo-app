import React, { Fragment } from 'react';
import InlineEdit from 'react-text-inline-edit';

import AddDate from '../container/AddDate';
import AddReminder from '../container/AddReminder';
import AddDescription from '../container/AddDescription';
import AddSubTask from '../container/AddSubTask';
import SubTask from '../container/SubTask';

import checkBoxIcon from '../../../../../assets/icons/checkbox-icon.svg';
// import checkboxFilled from '../../../../../assets/icons/checkbox-filled-icon.svg';

import '../view/ToDoContentPanelView.scss';

// import appJson from '../../../../../app';

// const shortid = require('shortid');

export default class ToDoContentPanelView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoName: "",
      toDoDescription: ""
    }
  }

  render() {
    return (
      <Fragment>
        { this.displayToDoName() }

        <div className="todo-main-container">
          <div className="set-date-container"> <AddDate/> </div>
          <div className="set-reminder-container"> <AddReminder/> </div>
          <div className="set-tag-container"></div>
          <div className="set-star-level-container"></div>
        </div>
        <hr/>
        <div className="todo-description-container"> 
          <AddDescription updateToDoDescription= {this.setToDoDescription} selectedToDo={this.props.selectedToDo}/> 
        </div>

        <hr/>
        <div className="add-subtask-container"> <AddSubTask/> </div>

        <div className="subtask-items-container">
         { this.renderSubtasks() }
        </div>
        <hr/>
        <div className="attach-file-container"> </div>
      </Fragment>
    );
  }

  displayToDoName = () => {
    const selectedToDo = this.props.selectedToDo;

    if (selectedToDo !== undefined) {
      return <Fragment>
              <div className="todo-header">
                <span className="checkbox-btn">
                  <img className="checkbox-icon" src={checkBoxIcon} alt="checkbox-icon"></img>
                </span>

                <InlineEdit className="todo-item-text"
                validate={this.customValidateText}
                activeClassName="editing"
                text={this.props.selectedToDo.toDoName}
                paramName="text"
                change={this.renameToDoItem}/>

              </div>
              <hr id="todo-header-first-line"/>
            </Fragment>
    }
  }

  renameToDoItem = (data) => {
    const selectedToDo = this.props.selectedToDo;
    selectedToDo.toDoName = data.text;

    this.setState({toDoName: data.text}, () => {
      this.props.updateSelectedList(selectedToDo, this.state.toDoDescription);
    });
  } 

  customValidateText = (text) => (text.length > 0 && text.length < 64);

  setToDoDescription = (toDoDescription) => {
    const selectedToDo = this.props.selectedToDo;
    this.setState({toDoDescription: toDoDescription}, () => {
      this.props.updateSelectedList(selectedToDo, toDoDescription);
    });
  }
  
  renderSubtasks = () => {
    const selectedToDo = this.props.selectedToDo;
    selectedToDo.subTaskList = [{subTaskID: "olalala", subTaskName:"a"},
  {subTaskID: "SU", subTaskName: "sdkljfgsakdjadhjks"}];
    return selectedToDo.subTaskList.map((subTask) => {
      return <SubTask selectedToDo= {selectedToDo} subTask= {subTask} 
      key= {subTask.subTaskID} /> 
    })
  }
}
