import React from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import '../view/ToDoPanelView.css';
import checkBoxFilled from '../../../../../assets/icons/checkbox-filled-icon.svg';

import appJson from '../../../../../app';

class CompletedItem extends React.Component {
  
  render() {
    return (
      <div className="completed-item-container">
        <Router>
          <span className="completed-item-wrapper">
            <Link to="/" className="checkbox-btn" onClick={this.undoCompletedToDo}>
              <img className="checkbox-icon" src={checkBoxFilled} alt="checkbox-Filled-icon"></img>
            </Link>

            <h2 className="completed-item-text">{this.props.toDoItem.toDoName}</h2> 
          </span>
        </Router>
    </div>
    );
  }

  undoCompletedToDo = () => {

    const selectedList = this.props.selectedList;
    const listItems = appJson.listItems; 
    const currentListIndex = listItems.findIndex(listItem => listItem.listID === selectedList.listID);

    const currentList = listItems[currentListIndex];
    const completedItems = currentList.completedItems;
    const toDoItemToUndo = this.props.toDoItem;
    const toDoIndex = completedItems.findIndex(toDoItem => completedItems.toDoID === toDoItemToUndo.listID);

    if (toDoIndex !== undefined) completedItems.splice(toDoIndex, 1);
    
    currentList.completedItems = completedItems;
    currentList.toDoItems.push(toDoItemToUndo);

    this.props.updateToDoChanges(currentList);
  }
}

export default CompletedItem;