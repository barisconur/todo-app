import React, { Fragment } from 'react';

import renameIcon from '../../../../../assets/icons/rename-icon.svg';

import '../view/ToDoContentPanelView.scss';

export default class AddDescription extends React.Component {
  constructor(props) {
    super(props); 

    this.userInput = React.createRef();

    this.state = {
      toDoDescription: ""
    }
  }

   render() {
     const toDoDescription = this.props.selectedToDo.toDoDetails.toDoDescription;
     console.log(toDoDescription);
      return (
        <Fragment>
            <span className="todo-icon-wrapper">
                <img className="rename-icon" src={renameIcon} alt="rename-icon"></img>
            </span>

            <textarea className="todo-description-field" rows='3' cols='50' 
            ref= {this.userInput}
            name='description' placeholder='Add description...' 
            onChange = { () => this.autoResizeTextArea() }
            onKeyPress = {this.handleChange}
            defaultValue= {toDoDescription}
            data-autoresize
            ></textarea>
        </Fragment>
      );
   }

   autoResizeTextArea = () => {
    document.querySelectorAll('[data-autoresize]').forEach(function (element) {
        element.style.boxSizing = 'border-box';
        var offset = element.offsetHeight - element.clientHeight;
        document.addEventListener('input', function (event) {
          event.target.style.height = 'auto';
          event.target.style.height = event.target.scrollHeight + offset + 'px';
        });
        element.removeAttribute('data-autoresize');
      });
   }

   handleChange = (event) => {
    if (event.key === 'Enter') {      
        this.props.updateToDoDescription(this.userInput.current.value);
    };
  }
}