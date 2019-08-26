import React, { Fragment } from 'react';
import { Button } from 'react-bootstrap';

import ToDoItem from '../container/ToDoItem';
import Navbar from './Navbar';

import todayIcon from '../../../../../assets/background-images/today-big-icon.svg';
import weekIcon from '../../../../../assets/background-images/this-week-big-icon.svg';

import appJson from '../../../../../app';

import { groupByListID, orderToDoSet, getAllToDos } from '../../../utils';

import '../view/ToDoPanelView.scss';

const shortid = require('shortid');

export default class DueTimePanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toDos: [],
      toDoSet: []
    };
  }

  componentWillMount() { this.setToDos() }
  
  componentDidUpdate(prevProps) { 
    if (this.props.selectedList.listID !== prevProps.selectedList.listID) this.setToDos();
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
    const currDate = new Date().toDateString();
    return list.filter((toDoItem) => {
      if (toDoItem.toDoDetails.dueDate === null) return;
      let selectedDate = toDoItem.toDoDetails.dueDate;
      if (this.props.selectedList.listID === 2) {
        if (selectedDate.toDateString() === currDate) return true;
        return false;
      } else {
        if ((selectedDate.toDateString().split(" ")[3] === currDate.split(" ")[3])
         && selectedDate.toDateString().split(" ")[1] === currDate.split(" ")[1]) {
          if (selectedDate.toDateString().split(" ")[2] - currDate.split(" ")[2] < 7) {
            return true;
          }
          return false;
        }
      }
      return false;
    });
  }

  updateToDo = (toDoItem) => { this.props.updateToDo(toDoItem) }

  updateListItems = (updatedListItems) => {
    this.setState({ listItems: updatedListItems }, () => {
      this.setToDos();
    });
  }

  render() { 
    return <Fragment> { this.renderToDoPanel(this.state.toDoSet) } </Fragment>
  }

  renderToDoPanel = (toDoSet) => {
    if (toDoSet === undefined) return;

    if (toDoSet.length === 0) {
      return this.renderNotFoundPanel();
    } else {
      return <div className="all-items-container">
         <Navbar newSelectedListName= {this.props.selectedList.listName}></Navbar>
         { this.renderToDoSet() } 
         </div>
    }
  }

  renderNotFoundPanel = () => {
    return <div className="not-found-container"> { this.renderNotFoundPageSrc() } </div>
  }

  renderNotFoundPageSrc = () => {
    if (this.props.selectedList.listID === undefined) return;
    switch (this.props.selectedList.listID) {
      case 2    : return <Fragment>
                          <img className="empty-list-img" src={todayIcon} alt="today-img"></img>
                          <h2 className="empty-list-text">You have no to-do due today</h2>
                       </Fragment>
      default   : return <Fragment>
                          <img className="empty-list-img" src={weekIcon} alt="week-img"></img>
                          <h2 className="empty-list-text">You have no to-do due this week</h2>
                        </Fragment>
    }
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
