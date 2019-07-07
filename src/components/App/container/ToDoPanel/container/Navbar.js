import React from 'react';
import { Button } from 'react-bootstrap';
import '../view/ToDoPanelView';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navbar">
              <span className="navbar-selected-list">{this.props.selectedList.listName}</span>
           </div>
        );
    }
}

export default Navbar;