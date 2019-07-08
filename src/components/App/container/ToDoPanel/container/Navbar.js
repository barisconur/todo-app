import React from 'react';
import '../view/ToDoPanelView';
import appJson from '../../../../../app';

class Navbar extends React.Component {
  render() {
    const { selectedListName } = appJson.selectedList.listName;
      return (
        <div className="navbar">
          <span className="navbar-selected-list">{selectedListName}</span>
        </div>
      );
  }
}

export default Navbar;