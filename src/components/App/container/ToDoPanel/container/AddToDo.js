import React from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import {InputGroup, FormControl } from 'react-bootstrap';
import '../view/ToDoPanelView';
import plusIcon from '../../../../../assets/icons/plus-icon.svg';

class AddToDo extends React.Component {
  constructor(props) {
    super(props);
    this.userInput = React.createRef();
    
    this.state = {
      input: "",
      toDoID: -1
    }
  }

  render() {
    return (
        <div className="add-todo-container">
          <Router>
            <span className="add-item-wrapper">
              <Link to="/" className="add-item-btn" onClick={this.sendInputToView}>
               <img className="add-icon" src={plusIcon} alt="add-icon"/>
              </Link>
            </span>
          </Router>

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
    
    this.setState(prevState =>({
      toDoID: prevState.toDoID + 1
    }), () => {
      this.clearInputField();
      this.setState ({
        input: ""
      });
      const newToDo = {toDoID: this.state.toDoID, toDoName: userInput};
      this.props.sendNewToDoValues(newToDo);
    });
  }

  setInputComingFromUser = () => {
    this.setState({
      input: this.userInput.current.value
    })
  }

  clearInputField = () => {
    this.userInput.current.value = "";
    this.userInput.current.placeholder = "Add todo...";
  }
}

export default AddToDo;