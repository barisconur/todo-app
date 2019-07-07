import React from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import '../view/ToDoPanelView.css';
import checkBoxFilled from '../../../../../assets/icons/checkbox-filled-icon.svg';

class CompletedItem extends React.Component {
  
  render() {
    const toDoName = this.props.completedToDo.toDoName;
    return (
      <div className="completed-item-container">
        <Router>
          <span className="completed-item-wrapper">
            <Link to="/" className="checkbox-btn">
              <img className="checkbox-icon" src={checkBoxFilled} alt="checkbox-Filled-icon" onClick={this.completeToDo}></img>
            </Link>

            <h2 className="completed-item-text">{toDoName}</h2> 
          </span>
        </Router>
    </div>
    );
  }
}

export default CompletedItem;