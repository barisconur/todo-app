import React from 'react';
import '../styles/App.css';
import checkBoxIcon from '../assets/checkbox-icon.svg';
import '../styles/ToDoItem.css';
import { Button, Card } from 'react-bootstrap';

class ToDoItem extends React.Component {
    state = {
        name: "",
        description: ["test"]

    }
    render() {
        return (
            <Card>
                <Card.Header>
                    <Button className="checkbox-btn" variant="light" onClick={this.showDetails}>
                        <img className="checkbox-icon-img" src={checkBoxIcon} alt="checkbox-icon"></img>
                    </Button>
                    <h2 className="todo-item-text">dglksajdlkj</h2>
                </Card.Header>
            </Card>
        );
    }

    showDetails = () => {

    }
}

export default ToDoItem;