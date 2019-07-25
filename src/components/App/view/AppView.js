import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import ListPanelView from '../container/ListPanel/view/ListPanelView';
import ToDoPanelView from '../container/ToDoPanel/view/ToDoPanelView';
import ToDoContentPanelView from '../container/ToDoContentPanel/view/ToDoContentPanelView';

import appJson from '../../../app';

import './AppView.scss';

const fs = require('fs');

export default class AppView extends React.Component {
  state = {
    selectedList: appJson.selectedList,
    searchedWord: "",
    selectedToDo: undefined,
    selectedDate: undefined,
    isToDoContentPanelOpen: false,
    toDoPanelSize: 10
  }


  // componentDidUpdate() {
  //   let searchStatus = false;
  //   if (this.state.isSearchRendering !== searchStatus) {
  //     this.closeToDoContentPanel();
  //   }
  // }

  render() {
    const toDoPanelSize = this.state.toDoPanelSize;
    return (
      <Fragment>
        <Container id="app-container">
          <Router>
            <Row>
    
              <Col sm={2} className="list-panel-container">
                <ListPanelView setSelectedList= {this.setSelectedList} setSearchedWord= {this.setSearchedWord} 
                updateSearchField= {this.isSearchFieldWritten()} />
              </Col>
              
              <Col sm={toDoPanelSize} className="todo-panel-container">
                <ToDoPanelView renderThisSelectedList= {this.state.selectedList} searchedWord= {this.state.searchedWord}
                updateThisSelectedList= {this.setSelectedList} updateSelectedToDoItem= {this.setToDoItem} 
                selectedDate= {this.state.selectedDate}/>
              </Col>
              
              { this.openToDoContentPanel() }

            </Row>
          </Router>
        </Container>
      </Fragment>
    );
  }

  setSelectedList = (newSelectedList) => {
    this.setState({
      selectedList: newSelectedList,
      searchedWord: "" 
    });
  }

  setSearchedWord = (searchedWord) => {
    this.setState({
      searchedWord: searchedWord
    });
  }

  isSearchFieldWritten = () => (this.state.searchedWord.length !== 0) ? true : false;

  setToDoItem = (toDoItem) => {
    const selectedToDo = this.state.selectedToDo;
    console.log("selectedTodo: ", selectedToDo);
    console.log("toDoItem", toDoItem);
    console.log("isContentPAnelOPen", this.state.isToDoContentPanelOpen);

    if (selectedToDo === toDoItem || selectedToDo === undefined) {
      this.toggleToDoContentPanel();
    } 
    this.setState({ selectedToDo: toDoItem });
  }

  toggleToDoContentPanel = () => {
    const isPanelOpen = this.state.isToDoContentPanelOpen;
    if (isPanelOpen) {
      this.setState({ toDoPanelSize: 10 });
    } else {
      this.setState({ toDoPanelSize: 7 });
    }
    this.setState({ isToDoContentPanelOpen: !isPanelOpen } );
  }

  closeToDoContentPanel = () => {
    this.setState({ 
      toDoPanelSize: 10,
      isToDoContentPanelOpen: !this.state.isToDoContentPanelOpen
    }, () => {
      console.log(this.state.isToDoContentPanelOpen);
    });
  }

  openToDoContentPanel = () => {
    if (this.state.isToDoContentPanelOpen) {
      return   <Col sm={3} className="todo-content-panel-container">
                <ToDoContentPanelView selectedToDo= {this.state.selectedToDo} updateSelectedList= {this.updateSelectedList} 
                updateSelectedList2={this.updateSel} selectedDate= {this.setSelectedDate}/>
               </Col>
    }
  }

  setSelectedDate = (date) => {
    this.setState({ selectedDate: date });
    
  }

  updateSel = (subTaskList) => {
    const selectedToDo = this.state.selectedToDo;

    const listItems = appJson.listItems;
    const index = listItems.findIndex(listItem => listItem.listID === selectedToDo.listID);
    const currentList = listItems[index];

    const selectedToDoIndex = currentList.toDoItems.findIndex(toDo => toDo.toDoID === selectedToDo.toDoID);
    currentList.toDoItems[selectedToDoIndex].toDoDetails.subTaskList = subTaskList;

    this.setState({
      selectedList: currentList
    });

  }

  updateSelectedList = (toDo) => {
    const listItems = appJson.listItems;
    const index = listItems.findIndex(listItem => listItem.listID === toDo.listID);
    const currentList = listItems[index];

    const toDoItems = currentList.toDoItems;
    const toDoIndex = toDoItems.findIndex((toDoItem) => toDoItem.toDoID === toDo.toDoID);
    const selectedToDo = toDo; /// update here
    
    this.setState({ 
      selectedList: currentList,
      selectedToDo: selectedToDo
    });
  }

  updateSelectedList = (toDo, toDoDescription) => {
    const listItems = appJson.listItems;
    const index = listItems.findIndex(listItem => listItem.listID === toDo.listID);
    const currentList = listItems[index];

    const toDoItems = currentList.toDoItems;
    const toDoIndex = toDoItems.findIndex((toDoItem) => toDoItem.toDoID === toDo.toDoID);
    const selectedToDo = toDoItems[toDoIndex];

    selectedToDo.toDoDetails.toDoDescription = toDoDescription;
    
    this.setState({ 
      selectedList: currentList,
      selectedToDo: selectedToDo
    });
  }
}