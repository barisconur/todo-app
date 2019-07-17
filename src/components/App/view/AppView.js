import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ListPanelView from '../container/ListPanel/view/ListPanelView';
import ToDoPanelView from '../container/ToDoPanel/view/ToDoPanelView';
import appJson from '../../../app';
import './AppView.css';

export default class AppView extends React.Component {
  state = {
    selectedList: appJson.selectedList,
    searchedWord: ""
  }

  render() {
    return (
      <div>
        <Container id="app-container">
          <Router>
            <Row>

              <Col sm={2} className="list-panel-container">
                <ListPanelView setSelectedList= {this.setSelectedList} setSearchedWord= {this.setSearchedWord} 
                updateSearchField= {this.isSearchFieldWritten()} />
              </Col>

              <Col sm={10} className="todo-panel-container">
                <ToDoPanelView renderThisSelectedList= {this.state.selectedList} searchedWord= {this.state.searchedWord}
                updateThisSelectedList= {this.setSelectedList}/>
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

  isSearchFieldWritten = () => (this.state.searchedWord.length !== 0) ? true : false;

}