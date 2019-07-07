import React from 'react';
import { BrowserRouter as Router, NavLink, Link} from 'react-router-dom';
import '../view/ListPanelView.css';
import removeIcon from '../../../../../assets/icons/remove-icon.svg';

class ListItem extends React.Component {
  
  render() {
    const list = this.props.listItem;
    return (
      <Router>
        <div className="list-container">
          <NavLink className="list-link"to={'/#list/' + list.listID} onClick={this.sendListToView}>
            <img className="list-icon" src={list.listIcon} alt="list-icon"></img>
            <h2 className="list-text">{list.listName}</h2> 
          </NavLink>
          {this.renderMotificationButtons()}
        </div>
      </Router>
    );
  }

  sendListToView = () => {
    const list = this.props.listItem;
    this.props.setSelectedList(list);
  }

  renderMotificationButtons = () => {
    const list = this.props.listItem;
    if (list.listID === 0) return; // Inbox static list renaming and deleting is not allowed

    return <span className="list-modification-wrapper">
            <Link to="/" className="remove-list-btn">
              <img className="remove-icon-image" src={removeIcon} alt="search-icon" onClick={this.removeList}></img>
            </Link>
          </span>
  }

  renameList = () => {
  //TO-DO
  console.log("henüz yapılmadı"); 
  }

  removeList = () => {
    const list = this.props.listItem;
    this.props.listToRemove(list);
    
  }
}

export default ListItem;