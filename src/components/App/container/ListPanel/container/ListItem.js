import React from 'react';
import '../styles/App.css';
import listIcon from '../assets/list-icon.svg';
import removeIcon from '../assets/remove-icon.svg';
import '../styles/List.css';
import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, NavLink} from 'react-router-dom';
class List extends React.Component {
    state = {
        allItems: []
    }
    render() {
        const { listItem } = this.props;
        return (
            <Router>
                <div className="list-container">
                    <img className="list-icon-img" src={listIcon} alt="list-icon"></img>
                    <h2 className="list-text">
                        <NavLink to="/" onClick={this.handleClick}>{listItem.name}</NavLink>
                    </h2>
                    <Button className="remove-btn" variant="outline-danger" onClick={this.removeItem}>
                        <img className="remove-icon-img" src={removeIcon} alt="remove-icon"></img>
                    </Button>
                </div>
            </Router>
            
        );
    }  

    removeItem = () => {
       // selectedListse sil --> not working now 
        this.props.clearPrev();
        this.props.removeItem(this.props.id);
    }

    handleClick = () => {
        const listName = this.props.listItem.name;
        this.props.setList(listName);
    }
}

export default List;