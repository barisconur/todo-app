import React, { Fragment } from 'react';

import checkBoxIcon from '../../../../../assets/icons/checkbox-icon.svg';
import checkBoxFilled from '../../../../../assets/icons/checkbox-filled-icon.svg';
import removeIcon from '../../../../../assets/icons/remove-icon.svg';

import '../view/ToDoContentPanelView.scss';

export default class SubTask extends React.Component {

  state = {
    isCompletedSubtask: false
  }
  render() {
    return (
      <Fragment>
        { this.renderSubTaskItem() }
      </Fragment>
    );
  }

  renderSubTaskItem = () => {
    return <div className="subtask-wrapper">
              <span className="checkbox-btn" onClick= {this.completeSubTask}>
               { this.selectCheckBoxSource() }
              </span>
             <h3 className="subtask-text"> {this.props.subTask.subTaskName}</h3>

             <span className="remove-btn" onClick= {this.removeSubTask}>
               <img className="remove-icon" src={removeIcon} alt="remove-icon"></img>
             </span>
           </div>
  }

  selectCheckBoxSource = () => {
    const isCompleted = this.props.subTask.isCompleted;
    switch(isCompleted) {
      case true: return <img className="checkbox-icon" src={checkBoxFilled} alt="checkbox-icon"></img>
      default: return <img className="checkbox-icon" src={checkBoxIcon} alt="checkbox-icon"></img>

    }
  }

  completeSubTask = () => {
    const selectedToDo = this.props.selectedToDo;
    const currSubTask = this.props.subTask;
    const currentSubTaskList = selectedToDo.toDoDetails.subTaskList;

    const subTaskStatus = this.state.isCompletedSubtask;

    const currIndex = currentSubTaskList.findIndex((subTask) => currSubTask.subTaskID === subTask.subTaskID);

    currentSubTaskList[currIndex].isCompleted = !subTaskStatus;

    this.setState({ isCompletedSubtask: !subTaskStatus });

    this.props.updateSelectedList(currentSubTaskList);

  }

  removeSubTask = () => {
    const selectedToDo = this.props.selectedToDo;
    const currSubTask = this.props.subTask;
    const currentSubTaskList = selectedToDo.toDoDetails.subTaskList;

    const currIndex = currentSubTaskList.findIndex((subTask) => currSubTask.subTaskID === subTask.subTaskID);

    if (currIndex !== undefined) currentSubTaskList.splice(currIndex, 1);
    
    this.props.updateSelectedList(currentSubTaskList);
  }
}