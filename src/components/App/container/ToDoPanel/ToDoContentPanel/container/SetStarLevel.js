import React, { Fragment } from 'react';
import StarRatings from 'react-star-ratings';

import clearIcon from '../../../../../../assets/icons/clear-icon.svg';

import { findCurrentToDoInJSON, findCurrentList } from '../../../../utils';

import '../view/ToDoContentPanelView.scss';

export default class SetStarLevel extends React.Component {

  render() {
    return (
      <Fragment>
        <h2 className="star-level-text">Star level: </h2>
        { this.renderStarLevel() }      
      </Fragment>   
    );
  }

  renderStarLevel = () => {
    if (!this.props.selectedToDo.toDoStatus.isCompleted) {
      return <Fragment>
               <StarRatings
                name='starLevel'
                rating= {this.readStarLevelFromJSON()}
                numberOfStars={5}
                starRatedColor= 'rgb(241, 241, 31)'
                starHoverColor= 'rgb(241, 241, 31)'
                starDimension= '33px'
                starSpacing= '2.5px'
                changeRating= {this.setStarLevel}/>

                { this.showClearStarLevel() }
            </Fragment>
    } else {
      return <StarRatings
              name='starLevel'
              rating= {this.readStarLevelFromJSON()}
              numberOfStars={5}
              starRatedColor= 'rgb(241, 241, 31)'
              starHoverColor= 'rgb(241, 241, 31)'
              starDimension= '33px'
              starSpacing= '2.5px'/>
    }
  }

  respondStarDimension = () => {
    //TO-DO starDimensionları responsive yap
  }

  setStarLevel = (newRating) => { this.updateStarLevelInJSON(newRating, this.props.selectedToDo) }

  updateStarLevelInJSON = (starLevel, toDo) => {
    const currentList = findCurrentList(toDo.listID);
    const currentToDo = findCurrentToDoInJSON(currentList, toDo);

    currentToDo.toDoStatus.isStarred = true;
    if (starLevel === 0) {
      currentToDo.toDoStatus.isStarred = false;
    }
    currentToDo.toDoDetails.starLevel = starLevel; 
    this.props.updateSelectedToDo(currentToDo);
  } 

  readStarLevelFromJSON = () => {
    if (this.props.selectedToDo === undefined) return;

    const currentList = findCurrentList(this.props.selectedToDo.listID);
    const currentToDo = findCurrentToDoInJSON(currentList, this.props.selectedToDo);    

    if (currentToDo === undefined) return; // if selected list is changes
    return currentToDo.toDoDetails.starLevel;
  }

  showClearStarLevel = () => {
    switch(this.readStarLevelFromJSON()) {
      case 0: return null;
      default: return   <span className="remove-star-wrapper" onClick={this.clearStarLevel}>
                          <img className="remove-icon" src={clearIcon} alt="clear-icon"></img>
                        </span>
    }
  }

  clearStarLevel = () => { this.updateStarLevelInJSON(0, this.props.selectedToDo) }
}