import React from 'react';
import '../view/ToDoPanelView';

class Navbar extends React.Component {

  render() {
      return (
        <div className="navbar">
          <span className="navbar-selected-list">{this.displaySelectedListName()}</span>
        </div>
      );
  }

  displaySelectedListName = () => {
    const selectedListName = this.props.newSelectedListName;
    if (selectedListName === undefined) return "Inbox";

    return selectedListName;
  }
}

export default Navbar;