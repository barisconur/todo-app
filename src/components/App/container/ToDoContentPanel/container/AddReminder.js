import React, { Fragment } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import reminderIcon from '../../../../../assets/icons/reminder-icon.svg';
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

        <DatePicker placeholderText="Set reminder"/>
      </Fragment>
    );
  }
}