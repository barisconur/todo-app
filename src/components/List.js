import React from 'react';
import '../styles/App.css';
import listIcon from '../assets/list-icon.svg';
import removeIcon from '../assets/remove-icon.svg';
import '../styles/List.css';
import { Button } from 'react-bootstrap';

class List extends React.Component {
    state = {
        allItems: ["test"]
    }
    render() {
        const { listItem } = this.props;
        return (
            <div className="list-container">
                <img className="list-icon-img" src={listIcon} alt="list-icon"></img>
                <h2 className="list-text">
                 <a onClick={this.showItems}>{listItem.name}</a>
                </h2>
                <Button className="remove-btn" variant="outline-danger" onClick={this.removeItem}>
                    <img className="remove-icon-img" src={removeIcon} alt="remove-icon"></img>
                </Button>
            </div>
        );
    }  

    removeItem = () => {
        this.props.removeItem(this.props.id);
    }

    showItems = () => {
        this.props.showItems(this.state.allItems);
    }
}

export default List;