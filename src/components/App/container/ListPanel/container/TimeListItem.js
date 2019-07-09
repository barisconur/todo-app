import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import '../view/ListPanelView.css';
import todayIcon from '../../../../../assets/icons/today-icon.svg';
import weekIcon from '../../../../../assets/icons/this-week-icon.svg';

import appJson from '../../../../../app';

class TimeListItem extends React.Component {

  render() {
    const listName = this.props.listItem.listName;

    return (
      <Router>
      <NavLink className="link"to={'/#list/' + listName} onClick={this.setSelectedList}>
        <div className="list-container">
          { this.showTodayOrWeekIcon() }
          <h2 className="list-text">{listName}</h2> 
        </div>
      </NavLink>
    </Router>
    );
  }

  showTodayOrWeekIcon = () => {
    const listName = this.props.listItem.listName;

    if (listName === "Today") {
      return <img className="list-icon" src={todayIcon} alt="today-icon"></img>
    }
    return <img className="list-icon" src={weekIcon} alt="this-week-icon"></img>
  }
  
  setSelectedList = () => {
    const listItem = this.props.listItem;
    appJson.selectedList = listItem;
    this.props.sendSelectedToView(listItem);
  }
}
    
export default TimeListItem;