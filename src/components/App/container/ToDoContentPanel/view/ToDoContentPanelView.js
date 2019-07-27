import React, { Fragment } from 'react';
import InlineEdit from 'react-text-inline-edit';

import AddDate from '../container/AddDate';
import AddReminder from '../container/AddReminder';
import AddDescription from '../container/AddDescription';
import AddSubTask from '../container/AddSubTask';
import SubTask from '../container/SubTask';
import SetStarLevel from '../container/SetStarLevel';
import SetTag from '../container/SetTag';

import checkBoxIcon from '../../../../../assets/icons/checkbox-icon.svg';
import checkboxFilled from '../../../../../assets/icons/checkbox-filled-icon.svg';

import '../view/ToDoContentPanelView.scss';
import { findCurrentToDoInJSON } from '../../../utils';

export default class ToDoContentPanelView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoName: "",
      isToDoCompleted: false
    }
  }

  render() {
    return (
      <Fragment>
        { this.displayToDoName() }
        <hr id="todo-header-first-line"/>
        <div className="todo-main-container">

          <div className="set-date-container"> 
          <AddDate selectedList={this.props.selectedList} selectedToDo={this.props.selectedToDo}
          updateSelectedList={this.sendSelectedListToAppView} updateSelectedToDo={this.sendSelectedToDoToAppView}/> 
          </div>

          <div className="set-reminder-container"> 
          <AddReminder selectedList={this.props.selectedList} selectedToDo={this.props.selectedToDo}
          updateSelectedList={this.sendSelectedListToAppView} updateSelectedToDo={this.sendSelectedToDoToAppView}
          /> </div>
          <hr/>
          <div className="set-tag-container"> <SetTag/> </div>
          
          <div className="set-star-level-container"> 
          <SetStarLevel  selectedList={this.props.selectedList} selectedToDo={this.props.selectedToDo}
          updateSelectedList={this.sendSelectedListToAppView} updateSelectedToDo={this.sendSelectedToDoToAppView}/> 
          </div>
    
        </div>
        <hr/>
        <div className="todo-description-container"> 
          <AddDescription selectedList={this.props.selectedList} selectedToDo={this.props.selectedToDo}
          updateSelectedList={this.sendSelectedListToAppView} updateSelectedToDo={this.sendSelectedToDoToAppView}/> 
        </div>

        <hr/>
        <div className="add-subtask-container"> 
          <AddSubTask selectedList={this.props.selectedList} selectedToDo={this.props.selectedToDo}
          updateSelectedList={this.sendSelectedListToAppView} updateSelectedToDo={this.sendSelectedToDoToAppView}/> 
        </div>

        <div className="subtask-items-container">
          { this.renderSubtasks() }
        </div>
      </Fragment>
    )
  }

  sendSelectedListToAppView = (list) => { this.props.setSelectedList(list) } 

  sendSelectedToDoToAppView = (toDo) => { this.props.setSelectedToDo(toDo) } 

  displayToDoName = () => {
    const selectedToDo = this.props.selectedToDo;
    if (selectedToDo !== undefined) {
      return <div className="todo-header">
              <span className="checkbox-btn">
                { this.selectCheckBoxSource() }
              </span>
              { this.displayToDoHeader() }
            </div>
            
    }
  }
  selectCheckBoxSource = () => {
    switch(this.state.isToDoCompleted) {
      case false: return <img className="checkbox-icon" src={checkBoxIcon} alt="checkbox-icon"></img>
      default: return <img className="checkbox-filled-icon" src={checkboxFilled} alt="checkbox-filled-icon"></img>
    }
  }

  displayToDoHeader = () => {
    switch (this.state.isToDoCompleted) {
      case false: return <InlineEdit className="todo-item-text"
                  validate={this.customValidateText}
                  activeClassName="editing"
                  text={this.props.selectedToDo.toDoName}
                  paramName="text"
                  change={this.renameToDoItem}/> 

      default: return <InlineEdit className="todo-item-text"
                  validate={this.customValidateText}
                  text={this.props.selectedToDo.toDoName}
                  paramName="text" /> 
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


  renderSubtasks = () => {
    const selectedToDo = findCurrentToDoInJSON(this.props.selectedList, this.props.selectedToDo);
    return selectedToDo.toDoDetails.subTaskList.map((subTask) => {
      return <SubTask selectedList={this.props.selectedList} selectedToDo={selectedToDo} subTask={subTask} key={subTask.subTaskID} 
      updateSelectedList={this.sendSelectedListToAppView} updateSelectedToDo={this.sendSelectedToDoToAppView}/> 
    })
  }
}
