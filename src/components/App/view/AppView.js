import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './AppView.css';
import ListPanelView from '../Container/ListPanel/view/ListPanelView';
import ToDoPanelView from '../Container/ToDoPanel/view/ToDoPanelView';
// import MenuPanel from '../Container/MenuPanel/view/MenuPanel';

export default class AppView extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <Container id="app-container">
          <Row>
            <Col sm={3} className="panel-container">
              <ListPanelView/>
            </Col>

            <Col sm={9} className="todo-panel-container">
              <ToDoPanelView/>
            </Col>
            
            {/* <Col sm={3} className="panel-container">
              <MenuPanel/>
            </Col> */}
          </Row>
        </Container>
      </div>
    );
  };
}