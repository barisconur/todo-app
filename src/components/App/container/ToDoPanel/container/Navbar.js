import React from 'react';

import '../view/ToDoPanelView.scss';

export default class Navbar extends React.Component {

  render() {
      return (
        <div className="navbar-container">
          <span className="navbar-header">{ this.displaySelectedListName() }</span>
        </div>
      );
  }

  displaySelectedListName = () => {
    const selectedListName = this.props.newSelectedListName;
    if (selectedListName === undefined) return "Inbox";

    return selectedListName;
  }
}