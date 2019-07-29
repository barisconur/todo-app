import React, { Fragment } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import dateIcon from '../../../../../assets/icons/date-icon.svg';

import { findCurrentListInJSON, findCurrentToDoInJSON } from '../../../utils';

import '../view/ToDoContentPanelView.scss';

export default class AddDate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dueDate: null
    }
  }

  render() {
    return (
      <Fragment>
        <span className="due-date-btn">
          <img className="date-icon" src={dateIcon} alt="date-icon"></img>
        </span>

        <DatePicker placeholderText="Set due date" 
        minDate={new Date()}
        isClearable={true}
        selected={this.readDueDateFromJSON()}
        dateFormat="dd/MM/yyyy"
        onChange={this.handleChange}/>
      </Fragment>
    );
  }

  handleChange = (date) => { this.updateDueDateInJSON(date, this.props.selectedList, this.props.selectedToDo) }

  updateDueDateInJSON = (date, list, toDo) => {
    const currentList = findCurrentListInJSON(list);
    const currentToDo = findCurrentToDoInJSON(currentList, toDo);

    currentToDo.toDoStatus.isDueTimeSet = true;
    currentToDo.toDoDetails.dueDate = date; 

    this.props.updateSelectedToDo(currentToDo);
  }

  readDueDateFromJSON = () => {
    if (this.props.selectedToDo === undefined) return;
    const currentList = findCurrentListInJSON(this.props.selectedList);
    const currentToDo = findCurrentToDoInJSON(currentList, this.props.selectedToDo);

    if (currentToDo === undefined) return;

    return currentToDo.toDoDetails.dueDate;
  }

}