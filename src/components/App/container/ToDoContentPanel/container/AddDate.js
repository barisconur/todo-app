import React, { Fragment } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import dateIcon from '../../../../../assets/icons/date-icon.svg';
import '../view/ToDoContentPanelView.scss';

export default class AddDate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: ""
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
        selected= {this.state.selectedDate}
        dateFormat="dd/MM/yyyy"
        onChange= {this.handleChange}/>
      </Fragment>
    );
  }

  handleChange = (date) => {
    this.setState({ selectedDate: date }, () => {
      this.props.sendDateToToDoItem(date);
    });
  }
}