import React, { Fragment } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import reminderIcon from '../../../../../../assets/icons/reminder-icon.svg';

import { findCurrentToDoInJSON, findCurrentListOfToDoInJSON } from '../../../../utils';

import '../view/ToDoContentPanelView.scss';

export default class AddReminder extends React.Component {

  render() {
    return (
      <Fragment>
        <span className="reminder-date-btn">
          <img className="reminder-icon" src={reminderIcon} alt="reminder-icon"></img>
        </span>
        { this.renderReminderDatePicker() }
      </Fragment>
    );
  }

  renderReminderDatePicker = () => {
    if (this.props.selectedToDo === undefined) return;

    if (this.props.selectedToDo.toDoStatus.isCompleted) {
      return <DatePicker placeholderText="Set reminder" 
              minDate={new Date()}
              selected={this.readReminderDateFromJSON()}
              showTimeInput
              timeFormat="HH:mm"
              timeInputLabel="Time: "
              dateFormat="MMMM d, yyyy h:mm aa"
              onChange={this.handleChange}
              disabled={true} />
    } else {
      return  <DatePicker placeholderText="Set reminder" 
              minDate={new Date()}
              selected={this.readReminderDateFromJSON()}
              isClearable={true}
              showTimeInput
              timeFormat="HH:mm"
              timeInputLabel="Time: "
              dateFormat="MMMM d, yyyy h:mm aa"
              onChange={this.handleChange}/>
    }
  }

  handleChange = (date) => { this.updateReminderDateInJSON(date, this.props.selectedToDo) }

  updateReminderDateInJSON = (date, toDo) => {
    const currentList = findCurrentListOfToDoInJSON(this.props.selectedToDo.listID);
    const currentToDo = findCurrentToDoInJSON(currentList, toDo);

    currentToDo.toDoDetails.reminderDate = date; 

    this.props.updateSelectedToDo(currentToDo);
  }


  readReminderDateFromJSON = () => {
    const currentList = findCurrentListOfToDoInJSON(this.props.selectedToDo.listID);
    const currentToDo = findCurrentToDoInJSON(currentList, this.props.selectedToDo);

    if (currentToDo === undefined) return; // if selected list is changes

    return currentToDo.toDoDetails.reminderDate;
  }
}