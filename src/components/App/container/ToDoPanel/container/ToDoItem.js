import React from 'react';
import '../styles/App.css';
import checkBoxIcon from '../assets/checkbox-icon.svg';
import '../styles/ToDoItem.css';
import { Button, Card } from 'react-bootstrap';

class ToDoItem extends React.Component {

    render() {
        return (
                <Card>
                    <Card.Header>
                        <Button className="checkbox-btn" variant="light" onClick={this.removeItem}>
                            <img className="checkbox-icon-img" src={checkBoxIcon} alt="checkbox-icon"></img>
                        </Button>
                        <h2 className="todo-item-text">{this.props.name}</h2>
                    </Card.Header>
               </Card>
        );
    }

    removeItem = () => {
        this.props.removeItem();
    }
}

export default ToDoItem;