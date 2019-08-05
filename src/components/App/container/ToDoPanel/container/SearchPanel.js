import React, { Fragment } from 'react';
import { Button } from 'react-bootstrap';

import ToDoItem from '../container/ToDoItem';
import searchIcon from '../../../../../assets/background-images/search-big-icon.svg';

import appJson from '../../../../../app';

import { groupByListID, orderToDoSet, getAllToDos } from '../../../utils';

import '../view/ToDoPanelView.scss';

const shortid = require('shortid');

export default class SearchPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toDos: [],
      toDoSet: []
    };
  }

  componentWillMount() { this.setToDos() }

  componentDidUpdate(prevProps, prevStates) {
    if (this.props.searchedWord !== prevProps.searchedWord) this.setToDos();
    if (this.state.listItems !== prevStates.listItems) this.setToDos();
  }
  
  setToDos = () => { 
    this.setState({ toDos: getAllToDos() }, () => {
      this.searchInSet(this.state.toDos);
    })
  }

  searchInSet = (todos) => { 
    const foundedToDos = this.search(todos);
    const toDoSet = groupByListID(foundedToDos);
    const orderedToDoSet = orderToDoSet(toDoSet);

    this.setState({ toDoSet: orderedToDoSet });
  }

  search = (list) => {
    if (list === undefined) return;
    const searchedWord = this.props.searchedWord;
    return list.filter(toDoItem => toDoItem.toDoName.toLowerCase().includes(searchedWord.toLowerCase()));
  } 

  updateToDo = (toDoItem) => {
    this.props.updateToDo(toDoItem);
  }

  updateListItems = (updatedListItems) => {
    this.setState({ listItems: updatedListItems }, () => {
      this.setToDos();
    });
  }

  render() { 
    return (
      <Fragment> { this.renderSearchPanel(this.state.toDoSet) } </Fragment> 
    );
  }

  renderSearchPanel = (toDoSet) => {
    if (toDoSet === undefined) return;

    if (toDoSet.length === 0) {
      return this.renderNotFoundPanel()
    } else {
      return <div className="all-items-container"> { this.renderToDoSet() } </div>
    }
  }

  renderNotFoundPanel = () => {
    return <div className="not-found-container">
             <img className="search-img" src={searchIcon} alt="search-img"></img>
             <h2 className="searched-word-text"><strong> "{this.props.searchedWord}"</strong> is not found</h2>
           </div>
  }

  renderToDoSet = () => {
    const toDoSet = this.state.toDoSet;
    if (toDoSet !== undefined) {
        return toDoSet.map((toDoGroup => {
          const listName = toDoGroup[0].listName;
          return <div className="todo-items-container">
                   <Button variant="info" className="list-group-tag" onClick={() =>this.renderSelectedList(listName)}>
                     {listName} 
                   </Button>
                   {this.renderToDoGroupItem(toDoGroup)}
                 </div>
        }))
    }
  }

  renderToDoGroupItem = (toDoGroup) => {
    const listItems = appJson.listItems;
    const currentIndex = listItems.findIndex(listItem => listItem.listID === toDoGroup[0].listID);
    const selectedList = listItems[currentIndex];
    
    return toDoGroup.map((toDoItem) => {
      return <Fragment>
              <ToDoItem selectedList= {selectedList} toDoItem={toDoItem} key={shortid.generate()}
              updateList= {this.props.updateThisSelectedList} isSearchRendering= {true}
              updateThisSearchPanel= {this.updateListItems} updateToDo= {this.updateToDo} />
            </Fragment>
    })
  }

  renderSelectedList = (listName) => {
    const listItems = appJson.listItems;
    const currentIndex = listItems.findIndex(listItem => listItem.listName === listName);
    const selectedList = listItems[currentIndex];
    
    this.props.updateSelectedList(selectedList);
  }
} 
