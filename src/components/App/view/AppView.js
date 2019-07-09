import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ListPanelView from '../container/ListPanel/view/ListPanelView';
import ToDoPanelView from '../container/ToDoPanel/view/ToDoPanelView';
import './AppView.css';
import appJson from '../../../app';

export default class AppView extends Component {
  state = {
    selectedList: {},
    searchedWord: ""
  }

  componentDidMount () {
    Promise.resolve(appJson.listItems[0]).then(inboxListItem => {
      this.setState({
        selectedList: inboxListItem
      });
    })
  }

  render() {
    return (
      <div>
        <Container id="app-container">
          <Row>

            <Col sm={2} className="list-panel-container">
              <ListPanelView setSelectedList= {this.setSelectedList} setSearchedWord= {this.setSearchedWord}/>
            </Col>

            <Col sm={10} className="todo-panel-container">
              <ToDoPanelView renderThisSelectedList= {this.state.selectedList} 
              updateThisSelectedList={this.setSelectedList} searchedWord= {this.state.searchedWord}/>
            </Col>

          </Row>
        </Container>
      </div>
    );
  }

  setSearchedWord = (searchedWord) => {
    this.setState({
      searchedWord: searchedWord
    });
  }

  setSelectedList = (newSelectedList) => {
    this.setState({
      selectedList: newSelectedList
    });
  }
}