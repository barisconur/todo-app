import React, { Fragment } from 'react';
import InlineEdit from 'react-text-inline-edit';

import AddDate from '../container/AddDate';
import AddReminder from '../container/AddReminder';
import AddDescription from '../container/AddDescription';
import AddSubTask from '../container/AddSubTask';
import SubTask from '../container/SubTask';
import SetStarLevel from '../container/SetStarLevel';

import checkBoxIcon from '../../../../../../assets/icons/checkbox-icon.svg';
import checkboxFilled from '../../../../../../assets/icons/checkbox-filled-icon.svg';

import { findCurrentToDoInJSON, findCurrentListOfToDoInJSON } from '../../../../utils';

import '../view/ToDoContentPanelView.scss';


export default class ToDoContentPanelView extends React.Component {

  sendSelectedToDoToAppView = (toDo) => { this.props.setSelectedToDo(toDo) } 

  render() {
    console.log(this.props.selectedList);
    console.log(this.props.selectedToDo);
    return (
      <Fragment> { this.renderContentPanel() } </Fragment>
    )
  }

  renderContentPanel = () => {
    if (this.props.selectedToDo === undefined) return;
    if (!this.props.selectedToDo.toDoStatus.isCompleted) {
      return <Fragment>
            { this.displayToDoName() }
            <hr id="todo-header-first-line"/>
            <div className="todo-main-container">

              <div className="set-date-container">
              <AddDate selectedList={this.props.selectedList} selectedToDo={this.props.selectedToDo}
              updateSelectedToDo={this.sendSelectedToDoToAppView}/> 
              </div>

              <div className="set-reminder-container"> 
              <AddReminder selectedList={this.props.selectedList} selectedToDo={this.props.selectedToDo}
              updateSelectedToDo={this.sendSelectedToDoToAppView}
              /> </div>
              <hr/>

              <div className="set-star-level-container"> 
              <SetStarLevel  selectedList={this.props.selectedList} selectedToDo={this.props.selectedToDo}
              updateSelectedToDo={this.sendSelectedToDoToAppView}/> 
              </div>
        
            </div>
            <hr/>
            <div className="todo-description-container"> 
              <AddDescription selectedList={this.props.selectedList} selectedToDo={this.props.selectedToDo}
              updateSelectedToDo={this.sendSelectedToDoToAppView}/> 
            </div>

            <hr/>
            <div className="add-subtask-container"> 
              <AddSubTask selectedList={this.props.selectedList} selectedToDo={this.props.selectedToDo}
              updateSelectedToDo={this.sendSelectedToDoToAppView}/> 
            </div>

            <div className="subtask-items-container">
              { this.renderSubtasks() }
            </div>
          </Fragment>
      } else {
        return <Fragment>
            { this.displayToDoName() }
            <hr id="todo-header-first-line"/>
            <div className="todo-main-container">

              <div className="set-date-container"> 
              <AddDate selectedList={this.props.selectedList} selectedToDo={this.props.selectedToDo}
              updateSelectedToDo={this.sendSelectedToDoToAppView}/> 
              </div>

              <div className="set-reminder-container"> 
              <AddReminder selectedList={this.props.selectedList} selectedToDo={this.props.selectedToDo}
              updateSelectedToDo={this.sendSelectedToDoToAppView}
              /> </div>
              <hr/>
              
              <div className="set-star-level-container"> 
              <SetStarLevel  selectedList={this.props.selectedList} selectedToDo={this.props.selectedToDo}
              updateSelectedToDo={this.sendSelectedToDoToAppView}/> 
              </div>
        
            </div>
            <hr/>
            <div className="todo-description-container"> 
              <AddDescription selectedList={this.props.selectedList} selectedToDo={this.props.selectedToDo}
              updateSelectedToDo={this.sendSelectedToDoToAppView}/> 
            </div>

            <hr/>
            <div className="add-subtask-container"> 
              <AddSubTask selectedList={this.props.selectedList} selectedToDo={this.props.selectedToDo}
              updateSelectedToDo={this.sendSelectedToDoToAppView}/> 
            </div>

            <div className="subtask-items-container">
              { this.renderSubtasks() }
            </div>
          </Fragment>
    }
  }

  displayToDoName = () => {
    switch(this.props.selectedToDo.toDoStatus.isCompleted) {
      case false: return <div className="todo-header">
                          <span className="checkbox-btn">
                            { this.selectCheckBoxSource() }
                          </span>
                          { this.displayToDoHeader() }
                         </div>
      default: return <div className="completed-todo-header">
                        <span className="checkbox-btn">
                          { this.selectCheckBoxSource() }
                        </span>
                        { this.displayToDoHeader() }
                    </div>
                    }
  }

  selectCheckBoxSource = () => {
    switch(this.props.selectedToDo.toDoStatus.isCompleted) {
      case false: return <img className="checkbox-icon" src={checkBoxIcon} alt="checkbox-icon" onClick={this.toggleCompleteToDo}></img>
      default: return <img className="checkbox-filled-icon" src={checkboxFilled} alt="checkbox-filled-icon" onClick={this.toggleCompleteToDo}></img>
    }
  }

  toggleCompleteToDo = (event) => {
    const currentList = findCurrentListOfToDoInJSON(this.props.selectedToDo.listID);
    const currentToDo = findCurrentToDoInJSON(currentList, this.props.selectedToDo);

    if (event.target.className === 'checkbox-icon' || event.target.className === 'checkbox-btn') {
      currentToDo.toDoStatus.isCompleted = true;
    } else {
      currentToDo.toDoStatus.isCompleted = false;
    }

    this.props.setSelectedToDo(currentToDo);
  }

  displayToDoHeader = () => {
    switch (this.props.selectedToDo.toDoStatus.isCompleted) {
      case false: return <InlineEdit className="todo-item-text"
                  validate={this.customValidateText}
                  activeClassName="editing"
                  text={this.props.selectedToDo.toDoName}
                  paramName="text"
                  change={this.renameToDoItem}/> 

      default: return <h2 className="completed-item-text">{this.props.selectedToDo.toDoName}</h2>
    }
  }

  renameToDoItem = (data) => {
    const selectedToDo = this.props.selectedToDo;
    selectedToDo.toDoName = data.text;
    
    let newSelected = findCurrentToDoInJSON(this.props.selectedList, selectedToDo);
    this.props.setSelectedToDo(newSelected);
  } 

  customValidateText = (text) => (text.length > 0 && text.length < 64);

  renderSubtasks = () => {
    const selectedToDo = this.props.selectedToDo;
    if (selectedToDo === undefined) return;

    const subTaskList = selectedToDo.toDoDetails.subTaskList;
    return subTaskList.map((subTask) => {
      return <SubTask selectedList={this.props.selectedList} selectedToDo={selectedToDo} subTask={subTask} key={subTask.subTaskID} 
      updateSelectedToDo={this.sendSelectedToDoToAppView}/> 
    })
  }
}
