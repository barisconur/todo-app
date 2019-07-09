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
    console.log("buraya girmemeli!!!!!  ");
    const listItems = appJson.listItems;
    const currentList = this.props.selectedList;
    const listIndex = listItems.findIndex(listItem => listItem.listID === currentList.listID);

    const completedItems = listItems[listIndex].completedItems;
    const toDoItemToUndo = this.props.toDoItem;
    const toDoIndex = completedItems.findIndex(toDoItem => completedItems.toDoID === toDoItemToUndo.listID);

    if (toDoIndex !== undefined) {
      completedItems.splice(toDoIndex, 1);
    }
    console.log(completedItems, "completedItemlardan silinmiş hali");
    listItems[listIndex].completedItems = completedItems;
    listItems[listIndex].toDoItems.push(toDoItemToUndo);
    console.log(listItems[listIndex], "toDoItem a geçirdiği hali");
    this.props.updateToDoChanges(listItems[listIndex]);
  }
}

export default CompletedItem;