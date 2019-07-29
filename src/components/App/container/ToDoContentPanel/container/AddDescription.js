import React, { Fragment } from 'react';

import renameIcon from '../../../../../assets/icons/rename-icon.svg';

import { findCurrentListInJSON, findCurrentToDoInJSON } from '../../../utils';

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

            <textarea className="todo-description-field" rows='3' cols='50' 
            ref= {this.userInput}
            name='description' placeholder='Add description...' 
            onChange = { () => this.handleChange() }
            data-autoresize
            ></textarea>
        </Fragment>
      );
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
      const currentList = findCurrentListInJSON(list);
      const currentToDo = findCurrentToDoInJSON(currentList, toDo);

      currentToDo.toDoDetails.toDoDescription = this.userInput.current.value; 
      this.props.updateSelectedToDo(currentToDo); 
    }

    // readDescriptionFromJSON = () => {
    //   if (this.props.selectedToDo === undefined) return;
    //   const currentList = findCurrentListInJSON(this.props.selectedList);
    //   const currentToDo = findCurrentToDoInJSON(currentList, this.props.selectedToDo);
  
    //   if (currentToDo === undefined) return;
  
    //   return currentToDo.toDoDetails.toDoDescription;
    // }
}