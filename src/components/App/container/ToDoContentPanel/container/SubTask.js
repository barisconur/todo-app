import React, { Fragment } from 'react';

import checkBoxIcon from '../../../../../assets/icons/checkbox-icon.svg';
// import checkBoxFilled from '../../../../../assets/icons/checkbox-filled-icon.svg';
import removeIcon from '../../../../../assets/icons/remove-icon.svg';

// import appJson from '../../../../../app';

import '../view/ToDoContentPanelView.scss';

// const shortid = require('shortid');

export default class SubTask extends React.Component {

  render() {
    return (
      <Fragment>
        { this.renderSubTaskItem() }
      </Fragment>
    );
  }

  renderSubTaskItem = () => {
    return <div className="subtask-wrapper">
              <span className="checkbox-btn">
                <img className="checkbox-icon" src={checkBoxIcon} alt="checkbox-icon"></img>
              </span>
             <h3 className="subtask-text"> {this.props.subTask.subTaskName}</h3>

             <span className="remove-btn">
               <img className="remove-icon" src={removeIcon} alt="remove-icon"></img>
             </span>
           </div>
  }
}