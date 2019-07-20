import React, { Fragment } from 'react';

import AddDate from '../container/AddDate';
import AddReminder from '../container/AddReminder';

import checkBoxIcon from '../../../../../assets/icons/checkbox-icon.svg';
import checkboxFilled from '../../../../../assets/icons/checkbox-filled-icon.svg';

import '../view/ToDoContentPanelView.scss';

const shortid = require('shortid');

export default class ToDoContentPanelView extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="todo-content-container"> 
        { this.displayToDoName() }
        <div className="todo-date-container">
          <div className="set-date-container">
           <AddDate/>
          </div>

          <div className="set-reminder-container">
           <AddReminder/>
          </div>
          
          <hr></hr>
        </div>
      </div>
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

                <h2 className="todo-item-text" contentEditable>{selectedToDo.toDoName}</h2>
              </div>
              <hr></hr>
            </Fragment>
    }
  }
}