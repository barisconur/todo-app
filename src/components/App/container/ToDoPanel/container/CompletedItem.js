import React from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import checkBoxFilled from '../../../../../assets/icons/checkbox-filled-icon.svg';
import appJson from '../../../../../app';
import '../view/ToDoPanelView.css';

export default class CompletedItem extends React.Component {
  
  render() {
    const toDoItem = this.props.toDoItem;
    return (
      <div className="completed-item-container">
        <Router>
          <span className="completed-item-wrapper"> 
            <Link to="/" className="checkbox-btn" onClick={this.undoCompletedToDo}>
              <img className="checkbox-icon" src={checkBoxFilled} alt="checkbox-Filled-icon"></img>
            </Link>

            <h2 className="completed-item-text">{toDoItem.toDoName}</h2> 
          </span>
        </Router>
    </div>
    );
  }

  undoCompletedToDo = () => {
    const listItems = appJson.listItems;
    const selectedList = this.props.selectedList;

    const listIndex = listItems.findIndex(listItem => listItem.listID === selectedList.listID);
    const currentList = listItems[listIndex];
    const completedItems = listItems[listIndex].completedItems;

    const currentToDoItem = this.props.toDoItem;
    const currentToDoIndex = completedItems.findIndex(toDoItem => toDoItem.toDoID === currentToDoItem.toDoID);
    
    if (currentToDoIndex !== undefined) completedItems.splice(currentToDoIndex, 1);
     currentList.completedItems = completedItems;
     currentList.toDoItems.push(currentToDoItem);

    this.props.updateToDoChanges(currentList);
  }
}