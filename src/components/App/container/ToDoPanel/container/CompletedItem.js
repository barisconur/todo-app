import React from 'react';
import { Button } from 'react-bootstrap';
import '../view/ToDoPanelView.css';
import checkBoxFilled from '../../../../../assets/checkbox-filled-icon.svg';

class CompletedItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div className="completed-item-container">
        <button className="checkbox-btn">
         <img className="checkbox-filled-icon" src={checkBoxFilled} alt="checkbox-filled-icon"></img>
        </button>
        <h2 className="completed-item-text">{this.props.completedItem.completedItemName}</h2> 
    </div>
    );
  }
}

export default CompletedItem;