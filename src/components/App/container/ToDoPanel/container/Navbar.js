import React from 'react';
import { Button } from 'react-bootstrap';
import '../view/ToDoPanelView';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const listName = this.showListName();
        return (
            <div className="navbar">
              <span className="navbar-selected-list">{listName}</span>
           </div>
        );
    }

    showListName = () => {
        if (this.props.selected === undefined) {
            return "Inbox"
        } else {
            return this.props.selected.listName
        }
    }
}

export default Navbar;