import React from 'react';
import { Dropdown, ButtonToolbar, DropdownButton } from 'react-bootstrap';

import '../view/ToDoPanelView.scss';

export default class Navbar extends React.Component {

  render() {
      return (
        <div className="navbar-container">
          <span className="navbar-header">{ this.displaySelectedListName() }</span>

          <ButtonToolbar className="navbar-menu-wrapper">
            <DropdownButton variant="outline-info" drop="left" key="left" title="">
                <Dropdown.Item href="#/action-1" eventKey= "1">Manage tags</Dropdown.Item>
                <Dropdown.Item href="#/action-2" eventKey= "2">Change background image</Dropdown.Item>
            </DropdownButton>
          </ButtonToolbar>
        </div>
      );
  }

  displaySelectedListName = () => {
    const selectedListName = this.props.newSelectedListName;
    if (selectedListName === undefined) return "Inbox";

    return selectedListName;
  }
}