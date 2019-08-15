import React, { Fragment } from 'react';

import checkBoxIcon from '../../../../../../assets/icons/checkbox-icon.svg';
import checkBoxFilled from '../../../../../../assets/icons/checkbox-filled-icon.svg';
import removeIcon from '../../../../../..//assets/icons/remove-icon.svg';

import { findSubTaskInJSON, findSubTask } from '../../../../utils';

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
              { this.selectTextSource() }
              
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

  selectTextSource = () => {
    const isCompleted = this.props.subTask.isCompleted;
    switch(isCompleted) {
      case true: return  <h3 className="completed-subtask-text"> {this.props.subTask.subTaskName}</h3>
      default: return <h3 className="subtask-text"> {this.props.subTask.subTaskName}</h3>

    }
  }

  completeSubTask = () => {
    if (this.props.selectedToDo.toDoStatus.isCompleted) return;
    
    const subTaskStatus = this.state.isCompletedSubtask;
    const currSubTask = findSubTaskInJSON(this.props.selectedToDo.listID, this.props.selectedToDo, this.props.subTask);

    currSubTask.isCompleted = !subTaskStatus;

    this.setState({ isCompletedSubtask: !subTaskStatus });


  }

  removeSubTask = () => {
    if (this.props.selectedToDo.toDoStatus.isCompleted) return;

    const currentToDo = this.props.selectedToDo;
    const index = findSubTask(currentToDo, this.props.subTask);

    if (index !== undefined) {
      currentToDo.toDoDetails.subTaskList.splice(index, 1);
    }

    this.props.updateSelectedToDo(currentToDo);
  }
} 