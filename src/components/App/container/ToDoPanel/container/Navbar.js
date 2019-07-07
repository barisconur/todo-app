import React from 'react';
import '../view/ToDoPanelView';

class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar">
              <span className="navbar-selected-list">{this.props.selectedList.listName}</span>
           </div>
        );
    }
}

export default Navbar;