import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import '../view/ListPanelView.css';
import starIcon from '../../../../../assets/icons/star-icon.svg';

class StarredListItem extends React.Component {

  render() {
    const listName = this.props.listItem.listName;

    return (
      <Router>
      <NavLink className="link"to={'/#list/' + listName} onClick={this.setSelectedList}>
        <div className="list-container">
          <img className="list-icon" src={starIcon} alt="star-icon"></img>
          <h2 className="list-text">{ listName }</h2> 
        </div>
      </NavLink>
    </Router>
    );
  }

  setSelectedList = () => {
    //TO-DO jsona vercen 
  }
}
    
export default StarredListItem;