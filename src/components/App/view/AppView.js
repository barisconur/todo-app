import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import ListPanelView from '../container/ListPanel/view/ListPanelView';
import ToDoPanelView from '../container/ToDoPanel/view/ToDoPanelView';
import ToDoContentPanelView from '../container/ToDoContentPanel/view/ToDoContentPanelView';

import appJson from '../../../app';

import './AppView.scss';

export default class AppView extends React.Component {
  state = {
    selectedList: appJson.selectedList,
    selectedToDo: undefined,
    searchedWord: "",
    isToDoContentPanelOpen: true,
    toDoPanelSize: 7
  }

  render() {
    const toDoPanelSize = this.state.toDoPanelSize;
    console.log(appJson);
    return (
      <Fragment>
        <Container id="app-container">
          <Router>
            <Row>
    
              <Col sm={2} className="list-panel-container">
                <ListPanelView setSelectedList={this.setSelectedList} setSearchedWord={this.setSearchedWord} 
                updateSearchField={this.isSearchFieldWritten()} />
              </Col>
              
              <Col sm={toDoPanelSize} className="todo-panel-container">
                <ToDoPanelView renderThisSelectedList={this.state.selectedList} selectedToDo={this.state.selectedToDo} 
                searchedWord={this.state.searchedWord} updateSelectedList={this.setSelectedList} updateSelectedToDo={this.setSelectedToDo} />
              </Col>
              
              { this.openToDoContentPanel() }

            </Row>
          </Router>
        </Container>
      </Fragment>
    );
  }

  setSelectedList = (newSelectedList) => {
    this.setState({ selectedList: newSelectedList });
    if (this.isSearchFieldWritten) this.setState({ searchedWord: "" });
  }

  setSelectedToDo = (toDo) => {
    this.setState({ selectedToDo: toDo });
  }

  setSearchedWord = (searchedWord) => {
    this.setState({
      searchedWord: searchedWord
    });
  }

  isSearchFieldWritten = () => (this.state.searchedWord.length !== 0) ? true : false;

  // handleToggleContentPanel = (toDoItem) => {
  //   if (this.state.selectedToDo === undefined) { // first time toDoItem is selected
  //     // console.log("if2");
  //     this.toggleToDoContentPanel();
  //   } else if (this.state.selectedToDo !== toDoItem && !this.state.isToDoContentPanelOpen) { // if different toDo is selected
  //     // console.log("if3");
  //     this.toggleToDoContentPanel();
  //   }
  //   if (this.state.selectedToDo === toDoItem) { // if same toDoItem is selected
  //     // console.log("if4");
  //     this.toggleToDoContentPanel();
  //   }
  //   let prevToDoItem = this.state.selectedToDo;
  //   this.setState({ selectedToDo: toDoItem}, () => {
  //     if (prevToDoItem !== toDoItem && toDoItem === undefined) { 
  //       this.closeToDoContentPanel() 
  //     }
  //   });
  // }

  // toggleToDoContentPanel = () => {
  //   const isPanelOpen = this.state.isToDoContentPanelOpen;
  //   if (isPanelOpen) {
  //     this.setState({ toDoPanelSize: 10 });
  //   } else {
  //     this.setState({ toDoPanelSize: 7 });
  //   }
  //   this.setState({ isToDoContentPanelOpen: !isPanelOpen } );
  // }

  // closeToDoContentPanel = () => {
  //   this.setState({
  //     toDoPanelSize: 10,
  //     isToDoContentPanelOpen: false
  //   });
  // }

  openToDoContentPanel = () => {
    if (this.state.isToDoContentPanelOpen) {
      return   <Col sm={3} className="todo-content-panel-container">
                <ToDoContentPanelView selectedList={this.state.selectedList} selectedToDo={this.state.selectedToDo}
                updateList={this.setSelectedList} setSelectedToDo= {this.setSelectedToDo}/>
               </Col>
    }
  }
}