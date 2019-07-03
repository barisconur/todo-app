import React from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import '../view/ToDoPanelView';
import createIcon from '../../../../../assets/create-icon.svg';
import ToDoItem from '../container/ToDoItem';

class ToDoPanelView extends React.Component {
  constructor(props) {
    super(props);
    this.userInput = React.createRef();
    this.state = {
      input: ""
    }
  }

  render() {
    return (
      <div className="add-todo-container">
        <Button className="add-item-btn" variant="success" onClick={this.sendInputToView}>
          <img src={createIcon} alt="add-todo-icon"></img>
        </Button>
          <InputGroup className="mb-3">
            <FormControl className="add-todo-field"
              ref= {this.userInput}
              type= "text"
              placeholder= "Add todo..." 
              aria-label="Todo-name"
              aria-describedby="basic-addon2"
              onChange={() => this.setInputComingFromUser()}
            />
          </InputGroup>
    </div>
    );
  }

  sendInputToView = () => {
    const userInput = this.state.input;

    this.setInputComingFromUser();
    this.props.toDoName(userInput);
  }

  setInputComingFromUser = () => {
    this.setState({
      input: this.userInput.current.value
    })
  }
}

export default ToDoPanelView;