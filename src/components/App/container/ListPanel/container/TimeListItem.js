import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import '../view/ListPanelView.css';

class TimeListItem extends React.Component {

  render() {
    return (
      <Router>
      <NavLink className="link"to={'/#list/' + 'burayaid gelcek'} onClick={this.setSelectedList}>
        <div className="list-container">
          {/* <img className="list-icon" src={list.listIcon} alt="list-icon"></img> */}
          <h2 className="list-text">Dummy data</h2> 
        </div>
      </NavLink>
    </Router>
    );
  }
  
  setSelectedList = () => {
    //TO-DO
  }
}
    
export default TimeListItem;