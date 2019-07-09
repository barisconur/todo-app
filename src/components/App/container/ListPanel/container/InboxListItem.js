import React from 'react';
import { BrowserRouter as Router, NavLink} from 'react-router-dom';
import inboxIcon from '../../../../../assets/icons/inbox-icon.svg';
import appJson from '../../../../../app';
import '../view/ListPanelView.css';

export default class InboxListItem extends React.Component {

  render() {
    const listName = this.props.listItem.listName

    return (
      <Router>
        <div className="list-container">
          <NavLink className="list-link"to={'/#list/' + listName} onClick={this.setSelectedList}>
            <img className="list-icon" src={inboxIcon} alt="inbox-icon"></img>
            <h2 className="list-text">{listName}</h2> 
          </NavLink>
        </div>
      </Router>
    );
  }

  setSelectedList = () => {
    const listItem = this.props.listItem;
    appJson.selectedList = listItem;
    this.props.sendSelectedToView(listItem);
  }
}