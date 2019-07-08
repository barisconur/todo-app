import React from 'react';
import { BrowserRouter as Router, NavLink, Link} from 'react-router-dom';
import '../view/ListPanelView.css';
import removeIcon from '../../../../../assets/icons/remove-icon.svg';

class ListItem extends React.Component {
  // boş dönmemek için src a remove icon verdim oraya jsondan okunacak listIcon gelecek
  render() {
    return (
      <Router>
        <div className="list-container">
          <NavLink className="list-link"to={'/#list/' + "burayaidleri gelcek"} onClick={this.setSelectedList}>
            <img className="list-icon" src={removeIcon} alt="list-icon"></img>
            <h2 className="list-text">Dummy data</h2> 
          </NavLink>
          {this.renderMotificationButtons()}
        </div>
      </Router>
    );
  }

  setSelectedList = () => {
    //TO-DO jsonda selectedList i tıklanan yap
  }

  renderMotificationButtons = () => {
    //TO-DO
  }

  renameList = () => {
  //TO-DO
  }

  removeList = () => {
    //TO-DO
  }
}

export default ListItem;