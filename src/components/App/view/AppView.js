import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './AppView.css';
import ListPanelView from '../container/ListPanel/view/ListPanelView';
import ToDoPanelView from '../container/ToDoPanel/view/ToDoPanelView';
import appJson from '../../../app';

export default class AppView extends Component {

  render() {
    console.log("AppView updates", appJson.selectedList);
    console.log("ListItems", appJson.listItems);
    return (
      <div>
        <Container id="app-container">
          <Row>
            <Col sm={2} className="list-panel-container">
              <ListPanelView />
            </Col>

            <Col sm={10} className="todo-panel-container">
              <ToDoPanelView/>
            </Col>
            
            {/* <Col sm={3} className="panel-container">
              <MenuPanel/>
            </Col> */}
          </Row>
        </Container>
      </div>
    );
  }
}