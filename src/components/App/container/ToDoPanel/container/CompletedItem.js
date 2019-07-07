import React from 'react';
import '../view/ToDoPanelView.css';
import checkBoxFilled from '../../../../../assets/icons/checkbox-filled-icon.svg';

class CompletedItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const toDoName = this.props.completedToDo.toDoName;
    return (
      <div className="completed-item-container">
        <button className="checkbox-btn">
         <img className="checkbox-filled-icon" src={checkBoxFilled} alt="checkbox-filled-icon"></img>
        </button>
        <h2 className="completed-item-text">{toDoName}</h2> 
    </div>
    );
  }
}

export default CompletedItem;