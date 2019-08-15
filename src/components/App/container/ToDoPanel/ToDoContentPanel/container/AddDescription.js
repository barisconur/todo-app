import React, { Fragment } from 'react';

import renameIcon from '../../../../../../assets/icons/rename-icon.svg';

import { findCurrentListOfToDoInJSON, findCurrentToDoInJSON } from '../../../../utils';

import '../view/ToDoContentPanelView.scss';

export default class AddDescription extends React.Component {
  constructor(props) {
    super(props); 
    this.userInput = React.createRef();
  }

   render() {
      return (
        <Fragment>
            <span className="todo-icon-wrapper">
                <img className="rename-icon" src={renameIcon} alt="rename-icon"></img>
            </span>
            { this.renderDescriptionField() }
        </Fragment>
      );
   }

   renderDescriptionField = () => {
    if (this.props.selectedToDo === undefined) return;

    if (this.props.selectedToDo.toDoStatus.isCompleted) {
      return <textarea className="todo-description-field" rows='3' cols='50' 
            disabled
            ref= {this.userInput}
            value= {this.readDescriptionFromJSON()}
            name='description' placeholder='Add description...' 
            onChange = { () => this.handleChange() }
            data-autoresize />
    } else {
    return <textarea className="todo-description-field" rows='3' cols='50' 
            ref= {this.userInput}
            value= {this.readDescriptionFromJSON()}
            name='description' placeholder='Add description...' 
            onChange = { () => this.handleChange() }
            data-autoresize />
    }
   }

   handleChange = () => { 
     this.autoResizeTextArea();
     this.updateDescriptionInJSON (this.props.selectedList, this.props.selectedToDo);
     
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

    updateDescriptionInJSON = (list, toDo) => {
      const currentList = findCurrentListOfToDoInJSON(this.props.selectedToDo.listID);
      const currentToDo = findCurrentToDoInJSON(currentList, toDo);

      currentToDo.toDoDetails.toDoDescription = this.userInput.current.value; 
      this.props.updateSelectedToDo(currentToDo); 
    }

    readDescriptionFromJSON = () => {
      const currentList = findCurrentListOfToDoInJSON(this.props.selectedToDo.listID);
      const currentToDo = findCurrentToDoInJSON(currentList, this.props.selectedToDo);
  
      if (currentToDo === undefined) return;
  
      return currentToDo.toDoDetails.toDoDescription;
    }
}