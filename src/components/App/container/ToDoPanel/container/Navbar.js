import React from 'react';
import '../view/ToDoPanelView';
import appJson from '../../../../../app';

class Navbar extends React.Component {
  render() {
    console.log(appJson.selectedList);

      return (
        <div className="navbar">
          <span className="navbar-selected-list">{appJson.selectedList.listName}</span>
        </div>
      );
  }
}

export default Navbar;