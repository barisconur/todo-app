import React from 'react';
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
    selectedToDo: null,
    toDoPanelSize: 10
  }

  render() {
    const toDoPanelSize = this.state.toDoPanelSize;
    return (
      <div>
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

              <Col sm={10-toDoPanelSize} className="todo-content-panel-container">
                <ToDoContentPanelView selectedToDo= {this.state.selectedToDo}/>
              </Col>
            </Row>
          </Router>
        </Container>
      </div>
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

  setToDoItem = (toDoItem) => {
    console.log("current selected toDo:", this.state.selectedToDo);
    console.log("gelen todo: ", toDoItem);
    
    if (this.state.selectedToDo === toDoItem || this.state.selectedToDo === null) this.toggleToDoContentPanel();
    this.setState({
      selectedToDo: toDoItem,
    });
  }

  toggleToDoContentPanel = () => {
    if (this.state.toDoPanelSize === 10) {
      this.setState({ toDoPanelSize: 7 });
    } else {
      this.setState({ toDoPanelSize: 10 });
    }
  }

  isSearchFieldWritten = () => (this.state.searchedWord.length !== 0) ? true : false;

}