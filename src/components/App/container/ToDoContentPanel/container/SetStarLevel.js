import React, { Fragment } from 'react';
import StarRatings from 'react-star-ratings';

import clearIcon from '../../../../../assets/icons/clear-icon.svg';

import { findCurrentListInJSON, findCurrentToDoInJSON } from '../../../utils';

import '../view/ToDoContentPanelView.scss';

export default class SetStarLevel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <h2 className="star-level-text">Star level: </h2>

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
    );
  }

  respondStarDimension = () => {
    //TO-DO starDimensionları responsive yap
  }

  setStarLevel = (newRating) => { this.updateStarLevelInJSON(newRating, this.props.selectedList, this.props.selectedToDo) }

  updateStarLevelInJSON = (starLevel, list, toDo) => {
    const currentList = findCurrentListInJSON(list);
    const currentToDo = findCurrentToDoInJSON(currentList, toDo);

    currentToDo.toDoStatus.isStarred = true;
    currentToDo.toDoDetails.starLevel = starLevel; 

    this.props.updateSelectedList(currentList);
    this.props.updateSelectedToDo(currentToDo);
  } 

  readStarLevelFromJSON = () => {
    const currentList = findCurrentListInJSON(this.props.selectedList);
    const currentToDo = findCurrentToDoInJSON(currentList, this.props.selectedToDo);

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

  clearStarLevel = () => { this.updateStarLevelInJSON(0, this.props.selectedList, this.props.selectedToDo) }
}