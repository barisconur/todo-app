import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import ListPanelView from '../container/ListPanel/view/ListPanelView';
import ToDoPanelView from '../container/ToDoPanel/view/ToDoPanelView';

import appJson from '../../../app';

import './AppView.scss';

export default class AppView extends React.Component {
  state = {
    selectedList: appJson.selectedList,
    searchedWord: ""
  }

  render() {
    return (
      <Fragment>
        <Container id="app-container">
          <Router>
            <Row>
    
              <Col sm={2} className="list-panel-container">
                <ListPanelView setSelectedList={this.setSelectedList} setSearchedWord={this.setSearchedWord} 
                updateSearchField={this.isSearchFieldWritten()} />
              </Col>
              
              <Col sm={10} className="todo-panel-container">
                <ToDoPanelView selectedList={this.state.selectedList} searchedWord={this.state.searchedWord} 
                updateSelectedList={this.setSelectedList}/>
              </Col>

            </Row>
          </Router>
        </Container>
      </Fragment>
    );
  }

  setSelectedList = (newSelectedList) => {
    if (this.isSearchFieldWritten) this.setState({ searchedWord: "" });
    this.setState({ selectedList: newSelectedList });
  }

  isSearchFieldWritten = () => (this.state.searchedWord.length !== 0) ? true : false;

  setSearchedWord = (searchedWord) => { this.setState({ searchedWord: searchedWord })}

}