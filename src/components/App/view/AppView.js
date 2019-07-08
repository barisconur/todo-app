import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './AppView.css';
import ListPanelView from '../container/ListPanel/view/ListPanelView';
import ToDoPanelView from '../container/ToDoPanel/view/ToDoPanelView';
import listIcon from '../../../assets/icons/list-icon.svg';
import inboxIcon from '../../../assets/icons/inbox-icon.svg';
import { INBOX_LIST, INBOX_LIST_NAME, STARRED_LIST_NAME, TODAY_LIST_NAME, THIS_WEEK_NAME } from '../../constants';
import appJson from '../../../app';

export default class AppView extends Component {
  constructor() {
    super();

    this.state = {
      selectedList: INBOX_LIST,
      listNames: [INBOX_LIST_NAME, STARRED_LIST_NAME, TODAY_LIST_NAME, THIS_WEEK_NAME],
      folderNames: []
    };
  }

  render() {
    return (
      <div>
        <Container id="app-container">
          <Row>
            <Col sm={2} className="list-panel-container">
              <ListPanelView/>
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