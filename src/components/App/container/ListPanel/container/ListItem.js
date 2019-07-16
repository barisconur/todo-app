import React from 'react';
import { BrowserRouter as Router, NavLink} from 'react-router-dom';

import inboxIcon from '../../../../../assets/icons/inbox-icon.svg';
import starredIcon from '../../../../../assets/icons/star-icon.svg';
import todayIcon from '../../../../../assets/icons/today-icon.svg';
import weekIcon from '../../../../../assets/icons/this-week-icon.svg';
import listIcon from '../../../../../assets/icons/list-icon.svg';
import removeIcon from '../../../../../assets/icons/remove-icon.svg';
import appJson from '../../../../../app';

import '../view/ListPanelView.css';

export default class ListItem extends React.Component {

  render() {
    return (
      <Router>
        <div className="list-container">
          { this.renderList() }
        </div>
      </Router>
    );
  }

  renderList = () => {
    const listItem = this.props.listItem;
    const listName = listItem.listName.toLowerCase();
    const listID = listItem.listID;

    if (typeof listID === 'number') {
      return <NavLink className="list-link" to={'/lists/' + listName} onClick={this.setSelectedList}>
                { this.selectIconSource(listID) }
                <h2 className="list-text">{listItem.listName}</h2>
             </NavLink>
    } else {
      return <NavLink className="list-link" to={'/lists/' + listID} onClick={this.setSelectedList}>
              <img className="list-icon" src={listIcon} alt="list-icon"></img>
              <h2 className="list-text">{listItem.listName}</h2>
              { this.renderModificationButtons() }
             </NavLink>
    }
  }

  selectIconSource = (listID) => {
    switch(listID) {
      case 0: return <img className="inbox-icon" src={inboxIcon} alt="inbox-icon"></img>
      case 1: return <img className="starred-icon" src={starredIcon} alt="starred-icon"></img>
      case 2: return <img className="today-icon" src={todayIcon} alt="today-icon"></img>
      case 3: return <img className="week-icon" src={weekIcon} alt="week-icon"></img>
      default: return null;
    }
  }

  setSelectedList = () => { this.props.sendSelectedToView(this.props.listItem); }

  renderModificationButtons = () => {
    return <span className="list-modification-wrapper">
              <img className="remove-icon-image" src={removeIcon} alt="search-icon" onClick={this.removeList}></img>
          </span>
  }

  removeList = () => {
    const listItems = appJson.listItems;
    const currentList = this.props.listItem;
    const removedIndex = listItems.findIndex(listItem => listItem.listID === currentList.listID);

    if (removedIndex !== undefined) listItems.splice(removedIndex,1);
    console.log(currentList);
    console.log(appJson.selectedList);
    if (currentList.listID === appJson.selectedList.listID) {
      appJson.selectedList = listItems[0]; 
      this.props.sendSelectedToView(listItems[0]);
    }
  }

  // renameList = () => {
  // //TO-DO
  // }

}