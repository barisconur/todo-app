import React, { Fragment } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

import plusIcon from '../../../../../assets/icons/plus-icon.svg';

import '../view/ToDoContentPanelView.scss';

export default class AddSubTask extends React.Component {
  constructor(props) {
    super(props); 

    this.userInput = React.createRef();

    this.state = {
      toDoDescription: ""
    }
  }

   render() {
      return (
        <Fragment>
            <span className="plus-icon-wrapper">
                <img className="plus-icon" src={plusIcon} alt="plus-icon"></img>
            </span>

            <InputGroup className="add-subtask-field">
                <FormControl className="subtask-field"
                ref= {this.userInput}
                placeholder="Add a subtask"
                aria-label="Subtask-name"
                aria-describedby="basic-addon2"/>
            </InputGroup>
        </Fragment>
      );
   }

//    handleChange = () => {
//        console.log("tuppi");
//    }

//    search = () => {
//     this.setState({
//       searchedWord: this.userInput.current.value
//     }, () => {
//     //   this.props.sendSearchedWordToView(this.state.searchedWord);
//     });
//    }
}