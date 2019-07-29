import React, { Fragment } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import reminderIcon from '../../../../../assets/icons/reminder-icon.svg';

import { findCurrentListInJSON, findCurrentToDoInJSON } from '../../../utils';

import '../view/ToDoContentPanelView.scss';

export default class AddReminder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <span className="reminder-date-btn">
          <img className="reminder-icon" src={reminderIcon} alt="reminder-icon"></img>
        </span>

        <DatePicker placeholderText="Set reminder" 
        minDate={new Date()}
        isClearable={true}
        showTimeInput
        selected={this.readReminderDateFromJSON()}
        timeFormat="HH:mm"
        timeInputLabel="Time: "
        dateFormat="MMMM d, yyyy h:mm aa"
        onChange={this.handleChange}/>
      </Fragment>
    );
  }

  handleChange = (date) => { this.updateReminderDateInJSON(date, this.props.selectedList, this.props.selectedToDo) }

  updateReminderDateInJSON = (date, list, toDo) => {
    const currentList = findCurrentListInJSON(list);
    const currentToDo = findCurrentToDoInJSON(currentList, toDo);

    currentToDo.toDoDetails.reminderDate = date; 
  }


  readReminderDateFromJSON = () => {
    if (this.props.selectedToDo === undefined || this.props.selectedList === undefined) return;
    console.log(this.props.selectedList);
    const currentList = findCurrentListInJSON(this.props.selectedList);
    const currentToDo = findCurrentToDoInJSON(currentList, this.props.selectedToDo);

    if (currentToDo === undefined) return;

    return currentToDo.toDoDetails.reminderDate;
  }
}