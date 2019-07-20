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
    searchedWord: "",
    selectedToDo: undefined,
    isToDoContentPanelOpen: false,
    toDoPanelSize: 10
  }

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
                updateThisSelectedList= {this.setSelectedList} updateSelectedToDoItem= {this.setToDoItem}/>
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
    if (selectedToDo === toDoItem || selectedToDo === undefined || toDoItem === undefined) {
      if (toDoItem === undefined && !this.state.isToDoContentPanelOpen) {
        return;
      }
      this.toggleToDoContentPanel();
    }

    this.setState({
      selectedToDo: toDoItem,
    });
  }

  toggleToDoContentPanel = () => {
    const isPanelOpen = this.state.isToDoContentPanetoggleToDoContentPanellOpen;

    if (isPanelOpen) {
      this.setState({ toDoPanelSize: 10 });
    } else {
      this.setState({ toDoPanelSize: 7 });
    }
    this.setState({ isToDoContentPanelOpen: !isPanelOpen });
  }

  openToDoContentPanel = () => {
    if (this.state.isToDoContentPanelOpen) {
      return   <Col sm={3} className="todo-content-panel-container">
                <ToDoContentPanelView selectedToDo= {this.state.selectedToDo}/>
               </Col>
    }
  }
}