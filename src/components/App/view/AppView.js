import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import appJson from '../../../app';
import ListPanelView from '../container/ListPanel/view/ListPanelView';
import ToDoPanelView from '../container/ToDoPanel/view/ToDoPanelView';
import './AppView.css';

export default class AppView extends React.Component {
  state = {
    selectedList: {}
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
              <ListPanelView setSelectedList= {this.setSelectedList}/>
            </Col>

            <Col sm={10} className="todo-panel-container">
              <ToDoPanelView renderThisSelectedList= {this.state.selectedList} 
              updateThisSelectedList={this.setSelectedList}/>
            </Col>

          </Row>
        </Container>
      </div>
    );
  }

  setSelectedList = (newSelectedList) => {
    this.setState({
      selectedList: newSelectedList
    });
  }

}