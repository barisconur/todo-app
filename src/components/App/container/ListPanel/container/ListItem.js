import React from 'react';
import { BrowserRouter as Router, NavLink, Link} from 'react-router-dom';
import listIcon from '../../../../../assets/icons/list-icon.svg';
import removeIcon from '../../../../../assets/icons/remove-icon.svg';
import appJson from '../../../../../app';
import '../view/ListPanelView.css';

export default class ListItem extends React.Component {

  render() {
    const listItem = this.props.listItem;

    return (
      <Router>
        <div className="list-container">
          <NavLink className="list-link"to={'/#list/' + listItem.listID} onClick={this.setSelectedList}>
            <img className="list-icon" src={listIcon} alt="list-icon"></img>
            <h2 className="list-text">{listItem.listName}</h2> 
          </NavLink>
          { this.renderMotificationButtons() }
        </div>
      </Router>
    );
  }

  setSelectedList = () => {
    const listItem = this.props.listItem;
    appJson.selectedList = listItem;
    this.props.sendSelectedToView(listItem);
  }

  renderMotificationButtons = () => {
    const listItem = this.props.listItem;
    if (listItem.listID === 0) return; 

    return <span className="list-modification-wrapper">
            <Link to="/" className="remove-list-btn">
              <img className="remove-icon-image" src={removeIcon} alt="search-icon" onClick={this.removeList}></img>
            </Link>
          </span>
  }

  removeList = () => {
    const listItems = appJson.listItems;
    const currentList = this.props.listItem;
    const removedIndex = listItems.findIndex(listItem => listItem.listID === currentList.listID);

    if (removedIndex !== undefined) listItems.splice(removedIndex,1);

    if (currentList.listID === appJson.selectedList.listID) {
      appJson.selectedList = listItems[0]; 
      this.props.sendSelectedToView(listItems[0]);
    }
    this.props.updateList();
  }

  renameList = () => {
  //TO-DO
  }

}